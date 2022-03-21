import React, {useState, useEffect, useRef} from 'react';
import {shallowEqual, useSelector, useDispatch} from 'react-redux';

import {Form, Input, Select, Spin, Checkbox} from 'antd';
import {Modal, Button} from 'react-bootstrap';
import {toast} from 'react-toastify';

import * as actionsModal from 'src/setup/redux/modal/Actions';
import {requestPOST, requestGET, requestPUT, API_URL, FILE_URL} from 'src/utils/baseAPI';

const {Option} = Select;

const DATA_TYPE = [
  {
    id: 1,
    name: 'Varchar',
  },
  {
    id: 2,
    name: 'Text',
  },
  {
    id: 3,
    name: 'Decimal',
  },
  {
    id: 4,
    name: 'Int',
  },
  {
    id: 5,
    name: 'Boolean',
  },
  {
    id: 6,
    name: 'Datetime',
  },
];
const INPUT_TYPE = [
  {
    id: 1,
    name: 'Text',
  },
  {
    id: 2,
    name: 'Textarea',
  },
  {
    id: 3,
    name: 'Select',
  },
  {
    id: 4,
    name: 'Price',
  },
  {
    id: 5,
    name: 'Boolean',
  },
  {
    id: 6,
    name: 'Multiselect',
  },
  {
    id: 7,
    name: 'Date',
  },
  {
    id: 8,
    name: 'MediaImage',
  },
];

const FormItem = Form.Item;

const {TextArea} = Input;

const ModalItem = (props) => {
  const dispatch = useDispatch();
  const token = useSelector((state) => state.auth.accessToken);

  const dataModal = useSelector((state) => state.modal.dataModal);
  const modalVisible = useSelector((state) => state.modal.modalVisible);
  const id = dataModal?.id ?? null;

  const [form] = Form.useForm();
  const [image, setImage] = useState([]);

  const [loadding, setLoadding] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setLoadding(true);
      const res = await requestGET(`api/v1/attributes/${id}`);

      if (res && res.data) {
        form.setFieldsValue(res.data);
      }
      setLoadding(false);
    };
    if (id) {
      fetchData();
    }
    return () => {};
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  const handleCancel = () => {
    form.resetFields();
    /*  props.setDataModal(null);
    props.setModalVisible(false); */
    dispatch(actionsModal.setModalVisible(false));
  };

  const onFinish = async () => {
    const values = await form.validateFields();

    try {
      const formData = form.getFieldsValue(true);
      if (id) {
        formData.id = id;
      }

      const res = id ? await requestPUT(`api/v1/attributes/${id}`, formData) : await requestPOST(`api/v1/attributes`, formData);
      if (res) {
        toast.success('Cập nhật thành công!');
        dispatch(actionsModal.setRandom());
        handleCancel();
      } else {
        toast.error('Thất bại, vui lòng thử lại!');
      }
    } catch (errorInfo) {
      console.log('Failed:', errorInfo);
    }
  };

  return (
    <Modal
      show={modalVisible}
      fullscreen={'lg-down'}
      size='xl'
      onExited={handleCancel}
      keyboard={true}
      scrollable={true}
      onEscapeKeyDown={handleCancel}
    >
      <Modal.Header className='bg-primary px-4 py-3'>
        <Modal.Title className='text-white'>Chi tiết</Modal.Title>
        <button type='button' className='btn-close btn-close-white' aria-label='Close' onClick={handleCancel}></button>
      </Modal.Header>
      <Modal.Body>
        <Spin spinning={loadding}>
          {!loadding && (
            <Form form={form} layout='vertical' /* initialValues={initData} */ autoComplete='off'>
              <div className='row'>
                <div className='col-xl-6 col-lg-6'>
                  <FormItem label='Tên' name='displayName' rules={[{required: true, message: 'Không được để trống!'}]}>
                    <Input placeholder='' />
                  </FormItem>
                </div>
                <div className='col-xl-6 col-lg-6'>
                  <FormItem label='Mã' name='code' rules={[{required: true, message: 'Không được để trống!'}]}>
                    <Input placeholder='' />
                  </FormItem>
                </div>
                <div className='col-xl-6 col-lg-6'>
                  <FormItem label='Giá trị mặc định' name='defaultValue'>
                    <Input placeholder='' />
                  </FormItem>
                </div>
                <div className='col-xl-6 col-lg-6'>
                  <Form.Item label='Kiểu dữ liệu' name='dataType' initialValue='' rules={[{required: true, message: 'Không được để trống!'}]}>
                    <Select
                      showSearch
                      filterOption={(input, option) => option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                      style={{width: '100%'}}
                    >
                      {DATA_TYPE.map((item, index) => {
                        return (
                          <Option key={item.id} value={item.name}>
                            {item.name}
                          </Option>
                        );
                      })}
                    </Select>
                  </Form.Item>
                </div>
                <div className='col-xl-6 col-lg-6'>
                  <Form.Item label='Kiểu dữ liệu nhập' name='inputType' initialValue='' rules={[{required: true, message: 'Không được để trống!'}]}>
                    <Select
                      showSearch
                      filterOption={(input, option) => option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                      style={{width: '100%'}}
                    >
                      {INPUT_TYPE.map((item, index) => {
                        return (
                          <Option key={item.id} value={item.name}>
                            {item.name}
                          </Option>
                        );
                      })}
                    </Select>
                  </Form.Item>
                </div>
                <div className='col-xl-12 col-lg-12'>
                  <div className='row'>
                    <div className='col-xl-4 col-lg-4'>
                      <Form.Item label='Hiển thị' name='isVisibleOnFront' valuePropName='checked'>
                        <Checkbox />
                      </Form.Item>
                    </div>
                    <div className='col-xl-4 col-lg-4'>
                      <Form.Item label='Bắt buộc' name='isRequired' valuePropName='checked'>
                        <Checkbox />
                      </Form.Item>
                    </div>
                    <div className='col-xl-4 col-lg-4'>
                      <Form.Item label='Có thể chỉnh sửa' name='isEditable' valuePropName='checked'>
                        <Checkbox />
                      </Form.Item>
                    </div>
                  </div>
                </div>
                <div className='col-xl-12 col-lg-12'>
                  <div className='row'>
                    <div className='col-xl-4 col-lg-4'>
                      <Form.Item label='Thuộc tính tìm kiếm' name='isSearchable' valuePropName='checked'>
                        <Checkbox />
                      </Form.Item>
                    </div>
                    <div className='col-xl-4 col-lg-4'>
                      <Form.Item label='Thuộc tính lọc' name='isFilterable' valuePropName='checked'>
                        <Checkbox />
                      </Form.Item>
                    </div>
                  </div>
                </div>
                <div className='col-xl-12 col-lg-12'>
                  <FormItem label='Mô tả' name='description'>
                    <TextArea rows={4} placeholder='' />
                  </FormItem>
                </div>
              </div>
            </Form>
          )}
        </Spin>
      </Modal.Body>
      <Modal.Footer className='bg-light px-4 py-2 align-items-center'>
        <div className='d-flex justify-content-center  align-items-center'>
          <Button className='btn-sm btn-primary rounded-1 p-2  ms-2' onClick={onFinish}>
            <i className='fa fa-save'></i>
            {id ? 'Lưu' : 'Tạo mới'}
          </Button>
        </div>
        <div className='d-flex justify-content-center  align-items-center'>
          <Button className='btn-sm btn-secondary rounded-1 p-2  ms-2' onClick={handleCancel}>
            <i className='fa fa-times'></i>Đóng
          </Button>
        </div>
      </Modal.Footer>
    </Modal>
  );
};

export default ModalItem;
