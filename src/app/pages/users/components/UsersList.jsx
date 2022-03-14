import React, {useState, useEffect} from 'react';
import {
  Row,
  Col,
  Layout,
  Table,
  Button,
  Input,
  Typography,
  Select,
  Popconfirm,
  notification,
  Card,
} from 'antd';
import TableList from '../../../components/TableList';

const UsersList = () => {
  return (
    <>
      <div className='card-body card-dashboard px-3 py-3'>
        <div className='card-dashboard-body table-responsive'></div>
      </div>
    </>
  );
};

export default UsersList;
