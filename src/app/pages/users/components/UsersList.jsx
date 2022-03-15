/* eslint-disable jsx-a11y/anchor-is-valid */
import React, {useState, useEffect} from 'react';
import {Menu, Dropdown, Input, Typography} from 'antd';
import TableList from '../../../components/TableList';
import {toAbsoluteUrl} from 'src/_metronic/helpers';

import {requestPOST} from 'src/utils/baseAPI';

const {Text} = Typography;
const {Search} = Input;

const UsersList = () => {
  const [dataTable, setDataTable] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [update, setUpdate] = useState(false);
  const [loading, setLoading] = useState(false);
  const [size, setSize] = useState(10);
  const [count, setCount] = useState('');
  const [offset, setOffset] = useState(1);
  const [typeModal, setTypeModal] = useState('');

  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const res = await requestPOST(`api/users/search`, {
          keyword: inputValue,
          pageNumber: offset,
          pageSize: size,
          orderBy: ['fullName'],
        });
        setDataTable(res?.data ?? []);
        setCount(res?.totalCount ?? 0);
        setLoading(false);
        setUpdate(false);
      } catch (error) {
        setLoading(false);
      }
    };
    if (update) {
      fetchData();
    }
    return () => {};
  }, [update]);

  useEffect(() => {
    setUpdate(true);
    return () => {};
  }, [offset, size, inputValue]);

  const handleButton = async (type, item) => {
    console.log(type);
    console.log(item);
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
                      <img src={toAbsoluteUrl(`/media/${user.avatar}`)} alt={user.name} className='w-100' />
                    </div>
                  ) : (
                    <div className={clsx('symbol-label fs-3', `bg-light-${user.initials?.state}`, `text-${user.initials?.state}`)}>{user.initials?.label}</div>
                  )}
                </a>
              </div>
              <div className='d-flex flex-column'>
                <a href='#' className='text-gray-800 text-hover-primary mb-1'>
                  {user.name}
                </a>
                <span>{user.email}</span>
              </div>
            </div>
          </>
        );
      },
    },
    {
      title: 'Tên',
      render: (text, record, index) => {
        return <Text style={{}}>{`${record.fullName}`}</Text>;
      },
      key: 'fullName',
    },
    {
      title: 'Số điện thoại',
      dataIndex: 'phoneNumber',
      key: 'phoneNumber',
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
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
                // handleButton(`chi-tiet`, record);
              }}
            >
              <i className='fa fa-eye'></i>
            </a>

            <Dropdown
              trigger={'click'}
              overlay={
                <Menu className='rounded'>
                  <Menu.Item>
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
                  <Menu.Item>
                    <a
                      className='e-1 p-2 text-dark'
                      onClick={() => {
                        handleButton(`cap-lai-mat-khau`, record);
                      }}
                    >
                      <i className={`fa fa-lock me-2`}></i>
                      {`Khoá tài khoản`}
                    </a>
                  </Menu.Item>
                  <Menu.Item>
                    <a
                      className='e-1 p-2 text-dark'
                      onClick={() => {
                        handleButton(`cap-lai-mat-khau`, record);
                      }}
                    >
                      <i className={`fa fa-lock-open me-2`}></i>
                      {`Mở khoá tài khoản`}
                    </a>
                  </Menu.Item>
                  <Menu.Item>
                    <a
                      className='e-1 p-2 text-dark'
                      onClick={() => {
                        handleButton(`cap-lai-mat-khau`, record);
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
          <TableList dataTable={dataTable} columns={columns} isPagination={true} size={size} count={count} setOffset={setOffset} setSize={setSize} loading={loading} />
        </div>
      </div>
    </>
  );
};

export default UsersList;
