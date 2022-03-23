import React, {useState, useEffect, useRef} from 'react';
import {shallowEqual, useSelector, useDispatch} from 'react-redux';

import {Form, Input, Select, Spin, Space, Tabs} from 'antd';
import {MinusCircleOutlined, PlusOutlined} from '@ant-design/icons';

import {Modal, Button} from 'react-bootstrap';
import {toast} from 'react-toastify';

import * as actionsModal from 'src/setup/redux/modal/Actions';
import {requestPOST, requestGET, requestPUT} from 'src/utils/baseAPI';

const FormItem = Form.Item;

const {TextArea} = Input;
const {Option} = Select;
const {TabPane} = Tabs;

const levels = [
  {id: 1, name: 'Tỉnh/Thành phố trực thuộc TW'},
  {id: 2, name: 'Quận/Huyện'},
  {id: 3, name: 'Phường/Xã'},
];

const types = [
  {id: 'Thành phố Trung ương', name: 'Thành phố Trung ương'},
  {id: 'Tỉnh', name: 'Tỉnh'},
  {id: 'Thành phố', name: 'Thành phố'},
  {id: 'Quận', name: 'Quận'},
  {id: 'Huyện', name: 'Huyện'},
  {id: 'Thị xã', name: 'Thị xã'},
  {id: 'Phường', name: 'Phường'},
  {id: 'Xã', name: 'Xã'},
  {id: 'Thị trấn', name: 'Thị trấn'},
];

const ModalItem = (props) => {
  const dispatch = useDispatch();
  const dataModal = useSelector((state) => state.modal.dataModal);
  const modalVisible = useSelector((state) => state.modal.modalAreaInfoVisible);

  const id = dataModal?.code ?? null;

  const [form] = Form.useForm();

  const [loadding, setLoadding] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setLoadding(true);
      const res = await requestGET(`api/v1/areainfors/${id}`);

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
    dispatch(actionsModal.setModalAreaInfoVisible(false));
  };

  const onFinish = async () => {
    const values = await form.validateFields();

    try {
      const formData = form.getFieldsValue(true);
      if (id) {
        formData.areaCode = id;
      }

      //const res = id ? await requestPUT(`api/v1/areainfors/${id}`, formData) : await requestPOST(`api/v1/areainfors`, formData);
      const res = await requestPOST(`api/v1/areainfors`, formData);
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
                <div className='col-xl-12 col-lg-12'>
                  <FormItem label='Giới thiệu' name='introduce'>
                    <TextArea rows={4} placeholder='' />
                  </FormItem>
                </div>
                <div className='col-xl-6 col-lg-6'>
                  <FormItem label='Diện tích' name='acreage'>
                    <Input placeholder='' />
                  </FormItem>
                </div>
                <div className='col-xl-6 col-lg-6'>
                  <FormItem label='Dân số' name='population'>
                    <Input placeholder='' />
                  </FormItem>
                </div>

                <div className='row'>
                  <Tabs defaultActiveKey='administrative'>
                    <TabPane tab='Hành chính' key='administrative'>
                      <div className='col-xl-12 col-lg-12'>
                        <Form.List name='administrative'>
                          {(fields, {add, remove}) => (
                            <>
                              {fields.map(({key, name, ...restField}) => (
                                <Space key={key} style={{display: 'flex', marginBottom: 8}} align='baseline'>
                                  <Form.Item {...restField} name={[name, 'key']}>
                                    <Input placeholder='Thuộc tính' />
                                  </Form.Item>
                                  <Form.Item {...restField} name={[name, 'value']}>
                                    <Input placeholder='Giá trị' />
                                  </Form.Item>
                                  <MinusCircleOutlined onClick={() => remove(name)} />
                                </Space>
                              ))}
                              <Form.Item>
                                <Button type='dashed' onClick={() => add()} block icon={<PlusOutlined />}>
                                  Add field
                                </Button>
                              </Form.Item>
                            </>
                          )}
                        </Form.List>
                      </div>
                    </TabPane>
                    <TabPane tab='Dân cư' key='populations'>
                      <div className='col-xl-12 col-lg-12'>
                        <Form.List name='populations'>
                          {(fields, {add, remove}) => (
                            <>
                              {fields.map(({key, name, ...restField}) => (
                                <Space key={key} style={{display: 'flex', marginBottom: 8}} align='baseline'>
                                  <Form.Item {...restField} name={[name, 'key']}>
                                    <Input placeholder='Thuộc tính' />
                                  </Form.Item>
                                  <Form.Item {...restField} name={[name, 'value']}>
                                    <Input placeholder='Giá trị' />
                                  </Form.Item>
                                  <MinusCircleOutlined onClick={() => remove(name)} />
                                </Space>
                              ))}
                              <Form.Item>
                                <Button type='dashed' onClick={() => add()} block icon={<PlusOutlined />}>
                                  Add field
                                </Button>
                              </Form.Item>
                            </>
                          )}
                        </Form.List>
                      </div>
                    </TabPane>
                    <TabPane tab='Địa hình' key='topographic'>
                      <div className='col-xl-12 col-lg-12'>
                        <Form.List name='topographic'>
                          {(fields, {add, remove}) => (
                            <>
                              {fields.map(({key, name, ...restField}) => (
                                <Space key={key} style={{display: 'flex', marginBottom: 8}} align='baseline'>
                                  <Form.Item {...restField} name={[name, 'key']}>
                                    <Input placeholder='Thuộc tính' />
                                  </Form.Item>
                                  <Form.Item {...restField} name={[name, 'value']}>
                                    <Input placeholder='Giá trị' />
                                  </Form.Item>
                                  <MinusCircleOutlined onClick={() => remove(name)} />
                                </Space>
                              ))}
                              <Form.Item>
                                <Button type='dashed' onClick={() => add()} block icon={<PlusOutlined />}>
                                  Add field
                                </Button>
                              </Form.Item>
                            </>
                          )}
                        </Form.List>
                      </div>
                    </TabPane>
                    <TabPane tab='Thời tiết' key='4'>
                      Content of Tab Pane 3
                    </TabPane>
                    <TabPane tab='Khoáng sản' key='5'>
                      Content of Tab Pane 3
                    </TabPane>
                    <TabPane tab='Lịch sử' key='6'>
                      Content of Tab Pane 3
                    </TabPane>
                    <TabPane tab='Kinh tế' key='7'>
                      Content of Tab Pane 3
                    </TabPane>
                  </Tabs>
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
