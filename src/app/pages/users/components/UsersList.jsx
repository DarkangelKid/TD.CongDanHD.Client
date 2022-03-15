/* eslint-disable jsx-a11y/anchor-is-valid */
import React, {useState, useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import _ from 'lodash';

import {Menu, Dropdown, Input, Typography} from 'antd';
import clsx from 'clsx';

import * as actionsModal from 'src/setup/redux/modal/Actions';
import {toAbsoluteUrl} from 'src/utils/AssetHelpers';
import {requestPOST} from 'src/utils/baseAPI';

import TableList from '../../../components/TableList';
import ModalItem from './ChiTietModal';

const UsersList = () => {
  const dispatch = useDispatch();
  const modalVisible = useSelector((state) => state.modal.modalVisible);
  const dataSearch = useSelector((state) => state.modal.dataSearch);

  const [dataTable, setDataTable] = useState([]);
  const [update, setUpdate] = useState(false);
  const [loading, setLoading] = useState(false);
  const [size, setSize] = useState(10);
  const [count, setCount] = useState('');
  const [offset, setOffset] = useState(1);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const res = await requestPOST(
          `api/users/search`,
          _.assign(
            {
              advancedSearch: {
                fields: ['fullName', 'userName', 'phoneNumber', 'email'],
                keyword: dataSearch?.keywordSearch ?? null,
              },
              pageNumber: offset,
              pageSize: size,
              orderBy: ['fullName'],
            },
            dataSearch
          )
        );
        setDataTable(res?.data ?? []);
        setCount(res?.totalCount ?? 0);
        setLoading(false);
        setUpdate(false);
      } catch (error) {
        setLoading(false);
      }
    };

    fetchData();

    return () => {};
  }, [offset, size, dataSearch]);

  /* useEffect(() => {
    setUpdate(true);
    return () => {};
  }, [offset, size, inputValue]); */

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
      title: 'Tài khoản',
      dataIndex: 'userName',
      key: 'userName',
      render: (text, record, index) => {
        return (
          <>
            <div className='d-flex align-items-center'>
              {/* begin:: Avatar */}
              <div className='symbol symbol-circle symbol-50px overflow-hidden me-3'>
                <a href='#'>
                  {record.imageUrl ? (
                    <div className='symbol-label'>
                      <img src={toAbsoluteUrl(`/${record.imageUrl}`)} alt={record.fullName} className='w-100' />
                    </div>
                  ) : (
                    <div
                      className={clsx(
                        'symbol-label fs-3',
                        `bg-light-${record.isVerified ? 'danger' : ''}`,
                        `text-${record.isVerified ? 'danger' : ''}`
                      )}
                    ></div>
                  )}
                </a>
              </div>
              <div className='d-flex flex-column'>
                <a href='#' className='text-gray-800 text-hover-primary mb-1 fw-bolder'>
                  {record.fullName}
                </a>
                <span>{record.email}</span>
              </div>
            </div>
          </>
        );
      },
    },

    {
      width: '15%',
      title: 'Số điện thoại',
      dataIndex: 'phoneNumber',
      key: 'phoneNumber',
    },

    {
      width: '10%',
      title: 'Trạng thái',
      render: (text, record, index) => {
        return (
          <>
            <div className={clsx('badge fw-bolder', `badge-light-${record.isActive ? 'success' : 'danger'}`)}>
              {record.isActive ? 'Đang hoạt động' : 'Bị khoá'}
            </div>
          </>
        );
      },
      key: 'isActive',
    },
    {
      width: '10%',
      title: 'Xác thực tài khoản',
      render: (text, record, index) => {
        return (
          <>
            <div className={clsx('badge fw-bolder', `badge-light-${record.isVerified ? 'success' : 'info'}`)}>
              {record.isVerified ? 'Đã xác thực' : 'Chưa xác thực'}
            </div>
          </>
        );
      },
      key: 'isVerified',
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

            <Dropdown
              trigger={'click'}
              overlay={
                <Menu className='rounded'>
                  <Menu.Item key={Math.random().toString(32)}>
                    <a
                      className='e-1 p-2 text-dark'
                      onClick={() => {
                        handleButton(`cap-lai-mat-khau`, record);
                      }}
                    >
                      <i className={`fa fa-key me-2`}></i>
                      {`Cấp lại mật khẩu`}
                    </a>
                  </Menu.Item>
                  {!record.isVerified ? (
                    <Menu.Item key={Math.random().toString(32)}>
                      <a
                        className='e-1 p-2 text-dark'
                        onClick={() => {
                          handleButton(`verifi-user`, record);
                        }}
                      >
                        <i className={`fa fa-check me-2`}></i>
                        {'Xác thực tài khoản'}
                      </a>
                    </Menu.Item>
                  ) : (
                    <></>
                  )}
                  <Menu.Item key={Math.random().toString(32)}>
                    <a
                      className='e-1 p-2 text-dark'
                      onClick={() => {
                        handleButton(`toggle-status`, record);
                      }}
                    >
                      <i className={`fa fa-${record.isActive ? 'lock' : `lock-open`} me-2`}></i>
                      {record.isActive ? `Khoá tài khoản` : `Mở khoá tài khoản`}
                    </a>
                  </Menu.Item>
                  <Menu.Item key={Math.random().toString(32)}>
                    <a
                      className='e-1 p-2 text-dark'
                      onClick={() => {
                        handleButton(`cap-quyen`, record);
                      }}
                    >
                      <i className={`fa fa-certificate me-2`}></i>
                      {`Cấp quyền`}
                    </a>
                  </Menu.Item>
                </Menu>
              }
            >
              <a className='btn btn-icon btn-bg-light btn-active-color-primary btn-sm me-1 mb-1' title='Thao tác nhanh'>
                <i className='fa fa-ellipsis-h'></i>
              </a>
            </Dropdown>
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
      {modalVisible ? <ModalItem setUpdate={setUpdate} update={update} /> : <></>}
    </>
  );
};

export default UsersList;
