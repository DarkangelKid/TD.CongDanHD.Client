/* eslint-disable jsx-a11y/anchor-is-valid */
import React, {useState, useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import _ from 'lodash';

import {Popconfirm} from 'antd';
import {toast} from 'react-toastify';

import * as actionsModal from 'src/setup/redux/modal/Actions';
import {requestPOST, requestDELETE} from 'src/utils/baseAPI';

import TableList from 'src/app/components/TableList';
import ModalItem from './ChiTietModal';

const UsersList = () => {
  const dispatch = useDispatch();
  const modalVisible = useSelector((state) => state.modal.modalVisible);
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
          `api/v1/recruitments/search`,
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

      case 'delete':
        var res = await requestDELETE(`api/v1/recruitments/${item.id}`);
        if (res) {
          toast.success('Thao t??c th??nh c??ng!');
          dispatch(actionsModal.setRandom());
        } else {
          toast.error('Th???t b???i, vui l??ng th??? l???i!');
        }
        break;

      default:
        break;
    }
  };

  const columns = [
    {
      title: 'T??n c??ng vi???c',
      dataIndex: 'name',
      key: 'name',
    },
    {
      width: '20%',
      title: 'C??ng ty',
      render: (text, record, index) => {
        return <>{record?.company?.name ?? ''}</>;
      },
      key: 'companySize',
    },

    {
      width: '10%',
      title: 'Ngh??? nghi???p',
      render: (text, record, index) => {
        return <>{record?.jobName?.name ?? ''}</>;
      },
      key: 'companySize',
    },
    {
      width: '10%',
      title: 'V??? tr??',
      render: (text, record, index) => {
        return <>{record?.jobPosition?.name ?? ''}</>;
      },
      key: 'companySize',
    },
    {
      width: '10%',
      title: 'M???c l????ng',
      render: (text, record, index) => {
        return <>{record?.salary?.name ?? ''}</>;
      },
      key: 'companySize',
    },
    {
      title: 'Thao t??c',
      dataIndex: '',
      key: '',
      width: '10%',
      render: (text, record) => {
        return (
          <div>
            <a
              className='btn btn-icon btn-bg-light btn-active-color-primary btn-sm me-1 mb-1'
              data-toggle='m-tooltip'
              title='Xem chi ti???t'
              onClick={() => {
                handleButton(`chi-tiet`, record);
              }}
            >
              <i className='fa fa-eye'></i>
            </a>

            <Popconfirm
              title='Xo???'
              onConfirm={() => {
                handleButton(`delete`, record);
              }}
              okText='Xo??'
              cancelText='Hu???'
            >
              <a className='btn btn-icon btn-bg-light btn-active-color-danger btn-sm me-1 mb-1' data-toggle='m-tooltip' title='Xo??'>
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
    </>
  );
};

export default UsersList;
