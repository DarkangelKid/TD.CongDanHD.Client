/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable no-undef */
import React, {useState, useEffect, useRef} from 'react';
import {shallowEqual, useSelector, useDispatch} from 'react-redux';

import {Form, Input, Select, Spin, InputNumber, DatePicker, Popconfirm, Typography} from 'antd';
import {Modal, Button} from 'react-bootstrap';
import {toast} from 'react-toastify';
import moment from 'moment';

import * as actionsModal from 'src/setup/redux/modal/Actions';
import {requestPOST, requestGET, requestPUT, API_URL, FILE_URL} from 'src/utils/baseAPI';
import TableList from 'src/app/components/TableList';
import ModalItem from './TripModal';

const FormItem = Form.Item;
const {Text} = Typography;

const {TextArea} = Input;
const {Option} = Select;
const {Search} = Input;

const DanhSachChuyenDiModal = (props) => {
  const dispatch = useDispatch();
  const token = useSelector((state) => state.auth.accessToken);
  const dataModal = useSelector((state) => state.modal.dataModal);
  const modalVisible = useSelector((state) => state.modal.modalDanhSachChuyenDiVisible);
  const modalTripVisible = useSelector((state) => state.modal.modalTripVisible);

  const dataSearch = useSelector((state) => state.modal.dataDanhSachChuyenDiSearch);
  const random = useSelector((state) => state.modal.random);

  const id = dataModal?.id ?? null;
  const [form] = Form.useForm();

  const [dataTable, setDataTable] = useState([]);
  const [loading, setLoading] = useState(false);
  const [size, setSize] = useState(10);
  const [count, setCount] = useState('');
  const [offset, setOffset] = useState(1);

  const handleCancel = () => {
    dispatch(actionsModal.setModalDanhSachChuyenDiVisible(false));
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const res = await requestPOST(
          `api/v1/trips/search`,
          _.assign(
            {
              advancedSearch: {
                fields: ['name'],
                keyword: dataSearch?.keywordSearch ?? null,
              },
              pageNumber: offset,
              pageSize: size,
              orderBy: ['createdOn'],
              vehicleId: id,
            },
            dataSearch
          )
        );
        setDataTable(res?.data ?? []);
        setCount(res?.totalCount ?? 0);
        setLoading(false);
      } catch (error) {
        setLoading(false);
      }
    };

    fetchData();

    return () => {};
  }, [offset, size, dataSearch, random]);

  const TimKiem = () => {
    const formData = form.getFieldsValue(true);
    dispatch(actionsModal.setDataDanhSachChuyenDiSearch(formData));
  };

  const handleButton = async (type, item) => {
    switch (type) {
      case 'chi-tiet':
        dispatch(actionsModal.setDataTripModal(item));
        dispatch(actionsModal.setModalTripVisible(true));

        break;

      case 'delete':
        var res = await requestDELETE(`api/v1/trips/${item.id}`);
        if (res) {
          toast.success('Thao tác thành công!');
          dispatch(actionsModal.setRandom());
        } else {
          toast.error('Thất bại, vui lòng thử lại!');
        }
        break;

      default:
        break;
    }
  };

  const columns = [
    {
      title: 'Tên chuyến đi',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Giá',
      render: (text, record, index) => {
        return <>{record?.price ?? ''}</>;
      },
      key: 'price',
    },
    {
      title: 'Điểm khởi hành',
      dataIndex: 'departurePlaceName',
      key: 'departurePlaceName',
    },
    {
      title: 'Điểm đến',
      dataIndex: 'arrivalPlaceName',
      key: 'arrivalPlaceName',
    },
    {
      title: 'Thời gian khởi hành',
      dataIndex: 'timeStart',
      key: 'timeStart',
    },
    {
      title: 'Thời gian di chuyển (phút)',
      dataIndex: 'duration',
      key: 'duration',
    },
    {
      title: 'Trạng thái',
      key: 'Status',
      render: (text, record, index) => {
        return <>{record?.status ? 'Đang hoạt động' : 'Ngừng hoạt động'}</>;
      },
    },
    {
      title: 'Thao tác',
      dataIndex: '',
      key: '',
      width: '15%',
      render: (text, record) => {
        return (
          <div>
            <a
              className='btn btn-icon btn-bg-light btn-active-color-primary btn-sm me-1 mb-1'
              data-toggle='m-tooltip'
              title='Xem chi tiết'
              onClick={() => {
                handleButton(`chi-tiet`, record);
              }}
            >
              <i className='fa fa-eye'></i>
            </a>

            <Popconfirm
              title='Xoá?'
              onConfirm={() => {
                handleButton(`delete`, record);
              }}
              okText='Xoá'
              cancelText='Huỷ'
            >
              <a className='btn btn-icon btn-bg-light btn-active-color-danger btn-sm me-1 mb-1' data-toggle='m-tooltip' title='Xoá'>
                <i className='fa fa-trash'></i>
              </a>
            </Popconfirm>
          </div>
        );
      },
    },
  ];

  return (
    <>
      <Modal show={modalVisible} fullscreen onExited={handleCancel} keyboard={true} scrollable={true} onEscapeKeyDown={handleCancel}>
        <Modal.Header className='bg-primary px-4 py-3'>
          <Modal.Title className='text-white'>Danh sách chuyến xe</Modal.Title>
          <button type='button' className='btn-close btn-close-white' aria-label='Close' onClick={handleCancel}></button>
        </Modal.Header>
        <Modal.Body>
          <div className='card card-body'>
            <Form form={form} hideRequiredMark autoComplete='off'>
              <div className='d-flex align-items-center'>
                <div className='col-6 d-flex align-items-center'>
                  <FormItem label='Từ khoá' name='keywordSearch' className='flex-grow-1 mb-0'>
                    <Input placeholder='' />
                  </FormItem>
                </div>

                <div className='col-6 d-flex align-items-center justify-content-end'>
                  <button className='btn btn-secondary btn-sm m-btn m-btn--icon py-2 me-2' onClick={TimKiem}>
                    <span>
                      <i className='fas fa-search'></i>
                      <span className=''>Tìm kiếm</span>
                    </span>
                  </button>
                  <button
                    className='btn btn-primary btn-sm m-btn m-btn--icon py-2 me-2'
                    onClick={() => {
                      dispatch(actionsModal.setDataTripModal(null));
                      dispatch(actionsModal.setModalTripVisible(true));
                    }}
                  >
                    <span>
                      <i className='fas fa-plus'></i>
                      <span className=''>Thêm mới</span>
                    </span>
                  </button>
                </div>
              </div>
              <div className='row'></div>
            </Form>
          </div>
          <div className='card-body card-dashboard px-3 py-3'>
            <div className='card-dashboard-body table-responsive'>
              <TableList
                dataTable={dataTable}
                columns={columns}
                isPagination={true}
                size={size}
                count={count}
                setOffset={setOffset}
                setSize={setSize}
                loading={loading}
              />
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer className='bg-light px-4 py-2 align-items-center'>
          <div className='d-flex justify-content-center  align-items-center'>
            <Button className='btn-sm btn-secondary rounded-1 p-2  ms-2' onClick={handleCancel}>
              <i className='fa fa-times'></i>Đóng
            </Button>
          </div>
        </Modal.Footer>
      </Modal>
      {modalTripVisible ? <ModalItem vehicleId={id} /> : <></>}
    </>
  );
};

export default DanhSachChuyenDiModal;
