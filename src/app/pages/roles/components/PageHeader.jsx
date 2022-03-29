import React, {useState, useEffect, useRef} from 'react';
import {shallowEqual, useSelector, useDispatch} from 'react-redux';
import {Form, Input} from 'antd';

import * as actionsModal from 'src/setup/redux/modal/Actions';

const PageHeader = (props) => {
  const dispatch = useDispatch();
  const [form] = Form.useForm();

  useEffect(() => {
    form.resetFields();
    dispatch(actionsModal.setDataSearch(null));
    return () => {};
  }, []);

  return (
    <>
      <div className='px-3 py-3 border-bottom border-secondary border-bottom-solid d-flex align-items-center justify-content-between'>
        <h3 className='card-title fw-bold text-header-td fs-4 mb-0'>{props?.title ?? ''}</h3>
        <div className='d-flex align-items-center'>
          <button
            className='btn btn-primary btn-sm m-btn m-btn--icon py-2 me-2'
            onClick={() => {
              dispatch(actionsModal.setDataModal(null));
              dispatch(actionsModal.setModalVisible(true));
            }}
          >
            <span>
              <i className='fas fa-plus'></i>
              <span className=''>Thêm mới</span>
            </span>
          </button>
        </div>
      </div>
    </>
  );
};

export default PageHeader;
