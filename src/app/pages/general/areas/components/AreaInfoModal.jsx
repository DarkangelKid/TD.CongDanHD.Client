/* eslint-disable jsx-a11y/anchor-is-valid */
import React, {useState, useEffect, useRef} from 'react';
import {shallowEqual, useSelector, useDispatch} from 'react-redux';

import {Form, Input, Select, Spin, Space, Tabs} from 'antd';
import {MinusCircleOutlined, PlusOutlined} from '@ant-design/icons';

import {Modal, Button} from 'react-bootstrap';
import {toast} from 'react-toastify';

import * as actionsModal from 'src/setup/redux/modal/Actions';
import {requestPOST, requestGET, requestPUT, API_URL, FILE_URL} from 'src/utils/baseAPI';
import ImageUpload from 'src/app/components/ImageUpload';
import {handleImage} from 'src/utils/utils';

const FormItem = Form.Item;

const {TextArea} = Input;
const {Option} = Select;
const {TabPane} = Tabs;

const TabItem = (props) => {
  return (
    <div className='col-xl-12 col-lg-12'>
      <Form.List name={props.key}>
        {(fields, {add, remove}) => (
          <>
            {fields.map(({key, name, ...restField}) => (
              <div className='col-xl-12 col-lg-12'>
                <div className='d-flex align-items-center p-3 mb-2' style={{borderWidth: '1px', borderStyle: 'dashed', borderColor: '#eff2f5'}}>
                  <div className='flex-grow-1 me-3'>
                    <Form.Item {...restField} name={[name, 'key']} className={'mb-1'}>
                      <Input placeholder='Thuộc tính' />
                    </Form.Item>
                    <Form.Item {...restField} name={[name, 'value']} className={'mb-1'}>
                      <TextArea placeholder='' />
                    </Form.Item>
                  </div>
                  <a
                    className='btn btn-icon btn-bg-light btn-active-color-primary btn-sm me-1 mb-1'
                    data-toggle='m-tooltip'
                    title='Xoá thuộc tính'
                    onClick={() => remove(name)}
                  >
                    <i className='fa fa-times'></i>
                  </a>
                </div>
              </div>
            ))}
            <Form.Item>
              <button className='btn btn-primary btn-sm m-btn m-btn--icon py-2 me-2' onClick={() => add()}>
                <span>
                  <i className='fas fa-plus'></i>
                  <span className=''>Thêm mới thông tin</span>
                </span>
              </button>
            </Form.Item>
          </>
        )}
      </Form.List>
    </div>
  );
};

const ModalItem = (props) => {
  const dispatch = useDispatch();
  const dataModal = useSelector((state) => state.modal.dataModal);
  const modalVisible = useSelector((state) => state.modal.modalAreaInfoVisible);
  const token = useSelector((state) => state.auth.accessToken);

  const id = dataModal?.code ?? null;

  const [form] = Form.useForm();

  const [loadding, setLoadding] = useState(false);

  const [image, setImage] = useState([]);
  const [images, setImages] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      setLoadding(true);
      const res = await requestGET(`api/v1/areainfors/${id}`);

      if (res && res.data) {
        form.setFieldsValue(res.data);
        setImage(handleImage(res.data?.image ?? '', FILE_URL));
        setImages(handleImage(res.data?.images ?? '', FILE_URL));
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
      let arrImage = [];
      image.forEach((i) => {
        if (i.response) {
          arrImage.push(i.response.data[0].url);
        } else {
          arrImage.push(i.path);
        }
      });

      let arrImages = [];
      images.forEach((i) => {
        if (i.response) {
          arrImages.push(i.response.data[0].url);
        } else {
          arrImages.push(i.path);
        }
      });
      form.setFieldsValue({image: arrImage.join('##')});
      form.setFieldsValue({images: arrImages.join('##')});

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
              </div>
              <div className='row '>
                <div className='col col-xl-12'>
                  <FormItem label='Ảnh đại diện'>
                    <ImageUpload
                      URL={`${API_URL}/api/v1/attachments`}
                      fileList={image}
                      onChange={(e) => setImage(e.fileList)}
                      headers={{
                        Authorization: `Bearer ${token}`,
                      }}
                    />
                  </FormItem>
                </div>
              </div>

              <div className='row '>
                <div className='col col-xl-12'>
                  <FormItem label='Bộ sưu tập'>
                    <ImageUpload
                      multiple
                      URL={`${API_URL}/api/v1/attachments`}
                      fileList={images}
                      onChange={(e) => setImages(e.fileList)}
                      headers={{
                        Authorization: `Bearer ${token}`,
                      }}
                    />
                  </FormItem>
                </div>
              </div>
              <div className='row'>
                <Tabs defaultActiveKey='administrative'>
                  <TabPane tab={'Hành chính'} key={'administrative'}>
                    <div className='col-xl-12 col-lg-12'>
                      <Form.List name={'administrative'}>
                        {(fields, {add, remove}) => (
                          <>
                            {fields.map(({key, name, ...restField}) => (
                              <div className='col-xl-12 col-lg-12' key={Math.random().toString(32)}>
                                <div
                                  className='d-flex align-items-center p-3 mb-2'
                                  style={{borderWidth: '1px', borderStyle: 'dashed', borderColor: '#eff2f5'}}
                                >
                                  <div className='flex-grow-1 me-3'>
                                    <Form.Item {...restField} name={[name, 'key']} className={'mb-1'}>
                                      <Input placeholder='Thuộc tính' />
                                    </Form.Item>
                                    <Form.Item {...restField} name={[name, 'value']} className={'mb-1'}>
                                      <TextArea placeholder='' />
                                    </Form.Item>
                                  </div>
                                  <a
                                    className='btn btn-icon btn-bg-light btn-active-color-primary btn-sm me-1 mb-1'
                                    data-toggle='m-tooltip'
                                    title='Xoá thuộc tính'
                                    onClick={() => remove(name)}
                                  >
                                    <i className='fa fa-times'></i>
                                  </a>
                                </div>
                              </div>
                            ))}
                            <Form.Item>
                              <button className='btn btn-primary btn-sm m-btn m-btn--icon py-2 me-2' onClick={() => add()}>
                                <span>
                                  <i className='fas fa-plus'></i>
                                  <span className=''>Thêm mới thông tin</span>
                                </span>
                              </button>
                            </Form.Item>
                          </>
                        )}
                      </Form.List>
                    </div>
                  </TabPane>
                  <TabPane tab={'Dân cư'} key={'populations'}>
                    <div className='col-xl-12 col-lg-12'>
                      <Form.List name={'populations'}>
                        {(fields, {add, remove}) => (
                          <>
                            {fields.map(({key, name, ...restField}) => (
                              <div className='col-xl-12 col-lg-12' key={Math.random().toString(32)}>
                                <div
                                  className='d-flex align-items-center p-3 mb-2'
                                  style={{borderWidth: '1px', borderStyle: 'dashed', borderColor: '#eff2f5'}}
                                >
                                  <div className='flex-grow-1 me-3'>
                                    <Form.Item {...restField} name={[name, 'key']} className={'mb-1'}>
                                      <Input placeholder='Thuộc tính' />
                                    </Form.Item>
                                    <Form.Item {...restField} name={[name, 'value']} className={'mb-1'}>
                                      <TextArea placeholder='' />
                                    </Form.Item>
                                  </div>
                                  <a
                                    className='btn btn-icon btn-bg-light btn-active-color-primary btn-sm me-1 mb-1'
                                    data-toggle='m-tooltip'
                                    title='Xoá thuộc tính'
                                    onClick={() => remove(name)}
                                  >
                                    <i className='fa fa-times'></i>
                                  </a>
                                </div>
                              </div>
                            ))}
                            <Form.Item>
                              <button className='btn btn-primary btn-sm m-btn m-btn--icon py-2 me-2' onClick={() => add()}>
                                <span>
                                  <i className='fas fa-plus'></i>
                                  <span className=''>Thêm mới thông tin</span>
                                </span>
                              </button>
                            </Form.Item>
                          </>
                        )}
                      </Form.List>
                    </div>
                  </TabPane>
                  <TabPane tab={'Địa hình'} key={'topographic'}>
                    <div className='col-xl-12 col-lg-12'>
                      <Form.List name={'topographic'}>
                        {(fields, {add, remove}) => (
                          <>
                            {fields.map(({key, name, ...restField}) => (
                              <div className='col-xl-12 col-lg-12' key={Math.random().toString(32)}>
                                <div
                                  className='d-flex align-items-center p-3 mb-2'
                                  style={{borderWidth: '1px', borderStyle: 'dashed', borderColor: '#eff2f5'}}
                                >
                                  <div className='flex-grow-1 me-3'>
                                    <Form.Item {...restField} name={[name, 'key']} className={'mb-1'}>
                                      <Input placeholder='Thuộc tính' />
                                    </Form.Item>
                                    <Form.Item {...restField} name={[name, 'value']} className={'mb-1'}>
                                      <TextArea placeholder='' />
                                    </Form.Item>
                                  </div>
                                  <a
                                    className='btn btn-icon btn-bg-light btn-active-color-primary btn-sm me-1 mb-1'
                                    data-toggle='m-tooltip'
                                    title='Xoá thuộc tính'
                                    onClick={() => remove(name)}
                                  >
                                    <i className='fa fa-times'></i>
                                  </a>
                                </div>
                              </div>
                            ))}
                            <Form.Item>
                              <button className='btn btn-primary btn-sm m-btn m-btn--icon py-2 me-2' onClick={() => add()}>
                                <span>
                                  <i className='fas fa-plus'></i>
                                  <span className=''>Thêm mới thông tin</span>
                                </span>
                              </button>
                            </Form.Item>
                          </>
                        )}
                      </Form.List>
                    </div>
                  </TabPane>
                  <TabPane tab={'Thời tiết'} key={'weather'}>
                    <div className='col-xl-12 col-lg-12'>
                      <Form.List name={'weather'}>
                        {(fields, {add, remove}) => (
                          <>
                            {fields.map(({key, name, ...restField}) => (
                              <div className='col-xl-12 col-lg-12' key={Math.random().toString(32)}>
                                <div
                                  className='d-flex align-items-center p-3 mb-2'
                                  style={{borderWidth: '1px', borderStyle: 'dashed', borderColor: '#eff2f5'}}
                                >
                                  <div className='flex-grow-1 me-3'>
                                    <Form.Item {...restField} name={[name, 'key']} className={'mb-1'}>
                                      <Input placeholder='Thuộc tính' />
                                    </Form.Item>
                                    <Form.Item {...restField} name={[name, 'value']} className={'mb-1'}>
                                      <TextArea placeholder='' />
                                    </Form.Item>
                                  </div>
                                  <a
                                    className='btn btn-icon btn-bg-light btn-active-color-primary btn-sm me-1 mb-1'
                                    data-toggle='m-tooltip'
                                    title='Xoá thuộc tính'
                                    onClick={() => remove(name)}
                                  >
                                    <i className='fa fa-times'></i>
                                  </a>
                                </div>
                              </div>
                            ))}
                            <Form.Item>
                              <button className='btn btn-primary btn-sm m-btn m-btn--icon py-2 me-2' onClick={() => add()}>
                                <span>
                                  <i className='fas fa-plus'></i>
                                  <span className=''>Thêm mới thông tin</span>
                                </span>
                              </button>
                            </Form.Item>
                          </>
                        )}
                      </Form.List>
                    </div>
                  </TabPane>
                  <TabPane tab={'Khoáng sản'} key={'mineral'}>
                    <div className='col-xl-12 col-lg-12'>
                      <Form.List name={'mineral'}>
                        {(fields, {add, remove}) => (
                          <>
                            {fields.map(({key, name, ...restField}) => (
                              <div className='col-xl-12 col-lg-12' key={Math.random().toString(32)}>
                                <div
                                  className='d-flex align-items-center p-3 mb-2'
                                  style={{borderWidth: '1px', borderStyle: 'dashed', borderColor: '#eff2f5'}}
                                >
                                  <div className='flex-grow-1 me-3'>
                                    <Form.Item {...restField} name={[name, 'key']} className={'mb-1'}>
                                      <Input placeholder='Thuộc tính' />
                                    </Form.Item>
                                    <Form.Item {...restField} name={[name, 'value']} className={'mb-1'}>
                                      <TextArea placeholder='' />
                                    </Form.Item>
                                  </div>
                                  <a
                                    className='btn btn-icon btn-bg-light btn-active-color-primary btn-sm me-1 mb-1'
                                    data-toggle='m-tooltip'
                                    title='Xoá thuộc tính'
                                    onClick={() => remove(name)}
                                  >
                                    <i className='fa fa-times'></i>
                                  </a>
                                </div>
                              </div>
                            ))}
                            <Form.Item>
                              <button className='btn btn-primary btn-sm m-btn m-btn--icon py-2 me-2' onClick={() => add()}>
                                <span>
                                  <i className='fas fa-plus'></i>
                                  <span className=''>Thêm mới thông tin</span>
                                </span>
                              </button>
                            </Form.Item>
                          </>
                        )}
                      </Form.List>
                    </div>
                  </TabPane>
                  <TabPane tab={'Lịch sử'} key={'history'}>
                    <div className='col-xl-12 col-lg-12'>
                      <Form.List name={'history'}>
                        {(fields, {add, remove}) => (
                          <>
                            {fields.map(({key, name, ...restField}) => (
                              <div className='col-xl-12 col-lg-12' key={Math.random().toString(32)}>
                                <div
                                  className='d-flex align-items-center p-3 mb-2'
                                  style={{borderWidth: '1px', borderStyle: 'dashed', borderColor: '#eff2f5'}}
                                >
                                  <div className='flex-grow-1 me-3'>
                                    <Form.Item {...restField} name={[name, 'key']} className={'mb-1'}>
                                      <Input placeholder='Thuộc tính' />
                                    </Form.Item>
                                    <Form.Item {...restField} name={[name, 'value']} className={'mb-1'}>
                                      <TextArea placeholder='' />
                                    </Form.Item>
                                  </div>
                                  <a
                                    className='btn btn-icon btn-bg-light btn-active-color-primary btn-sm me-1 mb-1'
                                    data-toggle='m-tooltip'
                                    title='Xoá thuộc tính'
                                    onClick={() => remove(name)}
                                  >
                                    <i className='fa fa-times'></i>
                                  </a>
                                </div>
                              </div>
                            ))}
                            <Form.Item>
                              <button className='btn btn-primary btn-sm m-btn m-btn--icon py-2 me-2' onClick={() => add()}>
                                <span>
                                  <i className='fas fa-plus'></i>
                                  <span className=''>Thêm mới thông tin</span>
                                </span>
                              </button>
                            </Form.Item>
                          </>
                        )}
                      </Form.List>
                    </div>
                  </TabPane>
                  <TabPane tab={'Kinh tế'} key={'economy'}>
                    <div className='col-xl-12 col-lg-12'>
                      <Form.List name={'economy'}>
                        {(fields, {add, remove}) => (
                          <>
                            {fields.map(({key, name, ...restField}) => (
                              <div className='col-xl-12 col-lg-12' key={Math.random().toString(32)}>
                                <div
                                  className='d-flex align-items-center p-3 mb-2'
                                  style={{borderWidth: '1px', borderStyle: 'dashed', borderColor: '#eff2f5'}}
                                >
                                  <div className='flex-grow-1 me-3'>
                                    <Form.Item {...restField} name={[name, 'key']} className={'mb-1'}>
                                      <Input placeholder='Thuộc tính' />
                                    </Form.Item>
                                    <Form.Item {...restField} name={[name, 'value']} className={'mb-1'}>
                                      <TextArea placeholder='' />
                                    </Form.Item>
                                  </div>
                                  <a
                                    className='btn btn-icon btn-bg-light btn-active-color-primary btn-sm me-1 mb-1'
                                    data-toggle='m-tooltip'
                                    title='Xoá thuộc tính'
                                    onClick={() => remove(name)}
                                  >
                                    <i className='fa fa-times'></i>
                                  </a>
                                </div>
                              </div>
                            ))}
                            <Form.Item>
                              <button className='btn btn-primary btn-sm m-btn m-btn--icon py-2 me-2' onClick={() => add()}>
                                <span>
                                  <i className='fas fa-plus'></i>
                                  <span className=''>Thêm mới thông tin</span>
                                </span>
                              </button>
                            </Form.Item>
                          </>
                        )}
                      </Form.List>
                    </div>
                  </TabPane>
                </Tabs>
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
