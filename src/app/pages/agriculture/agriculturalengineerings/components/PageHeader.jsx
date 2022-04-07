import React, {useState, useEffect, useRef} from 'react';
import {shallowEqual, useSelector, useDispatch} from 'react-redux';
import {Form, Input, Select} from 'antd';

import * as actionsModal from 'src/setup/redux/modal/Actions';
import {requestPOST} from 'src/utils/baseAPI';

const FormItem = Form.Item;
const {Option} = Select;

const PageHeader = (props) => {
  const dispatch = useDispatch();
  const [form] = Form.useForm();
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    form.resetFields();
    dispatch(actionsModal.setDataSearch(null));
    return () => {};
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      const res = await requestPOST(`api/v1/agriculturalengineeringcategories/search`, {
        pageNumber: 1,
        pageSize: 1000,
        orderBy: ['name'],
      });
      if (res && res.data) setCategories(res.data);
    };
    fetchData();
    return () => {};
  }, []);

  const TimKiem = () => {
    const formData = form.getFieldsValue(true);
    dispatch(actionsModal.setDataSearch(formData));
  };

  return (
    <>
      <div className='px-3 py-3 border-bottom border-secondary border-bottom-solid d-flex align-items-center justify-content-between'>
        <h3 className='card-title fw-bold text-header-td fs-4 mb-0'>{props?.title ?? ''}</h3>
        <div className='d-flex align-items-center'>
          <button
            className='btn btn-secondary btn-sm m-btn m-btn--icon py-2 me-2'
            type='button'
            data-bs-toggle='collapse'
            data-bs-target='#advancedSearch'
            aria-expanded='false'
            aria-controls='advancedSearch'
          >
            <span>
              <i className='fas fa-search'></i>
              <span className=''>Tìm kiếm</span>
            </span>
          </button>
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
      <div>
        <div className='collapse' id='advancedSearch'>
          <div className='card card-body'>
            <Form form={form} hideRequiredMark autoComplete='off'>
              <div className='row'>
                <div className='col-xl-6 col-lg-6'>
                  <FormItem label='Từ khoá' name='keywordSearch'>
                    <Input placeholder='' />
                  </FormItem>
                </div>
                <div className='col-xl-6 col-lg-6'>
                  <FormItem label='Danh mục' name='agriculturalEngineeringCategoryId'>
                    <Select allowClear placeholder='Danh mục'>
                      {categories.map((item) => {
                        return (
                          <Option key={item.id} value={item.id}>
                            {item.name}
                          </Option>
                        );
                      })}
                    </Select>
                  </FormItem>
                </div>
              </div>
              <div className='row'>
                <div className='col-xl-12 col-lg-12 d-flex justify-content-center'>
                  <button className='btn btn-primary btn-sm m-btn m-btn--icon py-2 me-2' onClick={TimKiem}>
                    <span>
                      <i className='fas fa-search'></i>
                      <span className=''>Tìm kiếm</span>
                    </span>
                  </button>
                  <button
                    className='btn btn-secondary btn-sm m-btn m-btn--icon py-2 me-2'
                    onClick={() => {
                      form.resetFields();
                      dispatch(actionsModal.setDataSearch(null));
                    }}
                  >
                    <span>
                      <i className='fas fa-sync'></i>
                      <span className=''>Tải lại</span>
                    </span>
                  </button>
                </div>
              </div>
            </Form>
          </div>
        </div>
      </div>
    </>
  );
};

export default PageHeader;
