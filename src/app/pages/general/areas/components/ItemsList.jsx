/* eslint-disable jsx-a11y/anchor-is-valid */
import React, {useState, useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import _ from 'lodash';

import * as actionsModal from 'src/setup/redux/modal/Actions';
import {requestPOST} from 'src/utils/baseAPI';

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
          `api/v1/areas/search`,
          _.assign(
            {
              advancedSearch: {
                fields: ['name', 'code'],
                keyword: dataSearch?.keywordSearch ?? null,
              },
              pageNumber: offset,
              pageSize: size,
              orderBy: ['level', 'code'],
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

      case 'SuaVanBan':
        //handleChiTietVanBan(item);
        //setEditVanBan(true);
        break;
      case 'XoaVanBan':
        //handleXoaVanBan(item);
        break;

      default:
        break;
    }
  };

  const columns = [
    {
      title: 'Tên',
      dataIndex: 'nameWithType',
      key: 'nameWithType',
    },
    {
      title: 'Mã',
      dataIndex: 'code',
      key: 'code',
    },
    {
      title: 'Loại',
      dataIndex: 'level',
      key: 'level',
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
      width: '10%',
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
              className='btn btn-icon btn-bg-light btn-active-color-danger btn-sm me-1 mb-1'
              data-toggle='m-tooltip'
              title='Xoá'
              onClick={() => {
                handleButton(`xoa`, record);
              }}
            >
              <i className='fa fa-trash'></i>
            </a>
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
