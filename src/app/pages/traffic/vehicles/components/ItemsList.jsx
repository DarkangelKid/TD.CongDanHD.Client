/* eslint-disable jsx-a11y/anchor-is-valid */
import React, {useState, useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import _ from 'lodash';
import clsx from 'clsx';

import {Popconfirm} from 'antd';
import {toast} from 'react-toastify';

import * as actionsModal from 'src/setup/redux/modal/Actions';
import {requestPOST, requestDELETE} from 'src/utils/baseAPI';
import {toAbsoluteUrl} from 'src/utils/AssetHelpers';

import TableList from 'src/app/components/TableList';
import ModalItem from './ChiTietModal';
import DanhSachChuyenDiModal from './DanhSachChuyenDiModal';

const UsersList = () => {
  const dispatch = useDispatch();
  const modalVisible = useSelector((state) => state.modal.modalVisible);
  const modalDanhSachChuyenDiVisible = useSelector((state) => state.modal.modalDanhSachChuyenDiVisible);

  const dataSearch = useSelector((state) => state.modal.dataSearch);
  const random = useSelector((state) => state.modal.random);

  const [dataTable, setDataTable] = useState([]);
  const [loading, setLoading] = useState(false);
  const [size, setSize] = useState(10);
  const [count, setCount] = useState('');
  const [offset, setOffset] = useState(1);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const res = await requestPOST(
          `api/v1/vehicles/search`,
          _.assign(
            {
              advancedSearch: {
                fields: ['name'],
                keyword: dataSearch?.keywordSearch ?? null,
              },
              pageNumber: offset,
              pageSize: size,
              orderBy: ['createdOn'],
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

  const handleButton = async (type, item) => {
    switch (type) {
      case 'chi-tiet':
        dispatch(actionsModal.setDataModal(item));
        dispatch(actionsModal.setModalVisible(true));

        break;

      case 'chuyen-xe':
        dispatch(actionsModal.setDataModal(item));
        dispatch(actionsModal.setModalDanhSachChuyenDiVisible(true));
        break;

      case 'delete':
        var res = await requestDELETE(`api/v1/companies/${item.id}`);
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
      title: 'Ảnh',
      width: '10%',
      dataIndex: 'image',
      key: 'image',
      render: (text, record, index) => {
        return (
          <>
            <div className='d-flex align-items-center'>
              {/* begin:: Avatar */}
              <div className='symbol overflow-hidden me-3'>
                <div>
                  {record.image ? (
                    <img
                      src={record.image.includes('https://') || record.image.includes('http://') ? record.image : toAbsoluteUrl(`/${record.image}`)}
                      alt={record.name}
                      className='w-100 symbol-label'
                    />
                  ) : (
                    <div
                      className={clsx(
                        'symbol-label fs-3',
                        `bg-light-${record.isVerified ? 'danger' : ''}`,
                        `text-${record.isVerified ? 'danger' : ''}`
                      )}
                    ></div>
                  )}
                </div>
              </div>
            </div>
          </>
        );
      },
    },
    {
      title: 'Tên xe',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Công ty',
      render: (text, record, index) => {
        return <>{record?.company?.name ?? ''}</>;
      },
      key: 'company',
    },

    {
      title: 'Mô tả',
      dataIndex: 'description',
      key: 'description',
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
            <a
              className='btn btn-icon btn-bg-light btn-active-color-primary btn-sm me-1 mb-1'
              data-toggle='m-tooltip'
              title='Danh sách chuyến xe'
              onClick={() => {
                handleButton(`chuyen-xe`, record);
              }}
            >
              <i className='fa fa-car'></i>
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
      {modalVisible ? <ModalItem /> : <></>}
      {modalDanhSachChuyenDiVisible ? <DanhSachChuyenDiModal /> : <></>}
    </>
  );
};

export default UsersList;
