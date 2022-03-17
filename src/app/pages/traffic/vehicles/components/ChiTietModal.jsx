import React, {useState, useEffect, useRef} from 'react';
import {shallowEqual, useSelector, useDispatch} from 'react-redux';

import {Form, Input, Select, Spin, InputNumber, DatePicker, Divider} from 'antd';
import {Modal, Button} from 'react-bootstrap';
import {toast} from 'react-toastify';
import moment from 'moment';

import * as actionsModal from 'src/setup/redux/modal/Actions';
import {requestPOST, requestGET, requestPUT, API_URL, FILE_URL} from 'src/utils/baseAPI';
import ImageUpload from 'src/app/components/ImageUpload';
import {handleImage} from 'src/utils/utils';

const FormItem = Form.Item;

const {TextArea} = Input;
const {Option} = Select;

const dataLevel = [
  {
    id: 1,
    status: true,
    name: 'Đang hoạt động',
  },
  {
    id: 2,
    status: false,
    name: 'Ngừng hoạt động',
  },
];

const ModalItem = (props) => {
  const dispatch = useDispatch();
  const token = useSelector((state) => state.auth.accessToken);
  const dataModal = useSelector((state) => state.modal.dataModal);
  const modalVisible = useSelector((state) => state.modal.modalVisible);
  const id = dataModal?.id ?? null;

  const [form] = Form.useForm();

  const [loadding, setLoadding] = useState(false);
  const [lstCarUtilities, setLstCarUtilities] = useState([]);
  const [lstCompanies, setLstCompanies] = useState([]);
  const [lstVehicleType, setLstVehicleType] = useState([]);

  const [image, setImage] = useState([]);
  const [images, setImages] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      setLoadding(true);
      const res = await requestGET(`api/v1/vehicles/${id}`);

      if (res && res.data) {
        form.setFieldsValue(res.data);

        setImage(handleImage(res.data?.image ?? '', FILE_URL));
        setImages(handleImage(res.data?.images ?? '', FILE_URL));

        if (res.data.dateOfIssue) {
          form.setFieldsValue({dateOfIssue: moment(res.data.dateOfIssue)});
        }
        if (res.data.vehicleCarUtilities && res.data.vehicleCarUtilities.length > 0) {
          form.setFieldsValue({carUtilities: res.data.vehicleCarUtilities.map((i) => i.carUtilityId)});
        }
      }
      setLoadding(false);
    };
    if (id) {
      fetchData();
    }
    return () => {};
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  useEffect(() => {
    const fetchData = async () => {
      const res = await requestPOST(`api/v1/companies/search`, {
        pageNumber: 1,
        pageSize: 10000,
        orderBy: ['name'],
      });
      if (res && res.data) setLstCompanies(res.data);
    };
    fetchData();
    return () => {};
  }, []);
  useEffect(() => {
    const fetchData = async () => {
      const res = await requestPOST(`api/v1/vehicletypes/search`, {
        pageNumber: 1,
        pageSize: 1000,
        orderBy: ['name'],
      });
      if (res && res.data) setLstVehicleType(res.data);
    };
    fetchData();
    return () => {};
  }, []);
  useEffect(() => {
    const fetchData = async () => {
      const res = await requestPOST(`api/v1/carutilities/search`, {
        pageNumber: 1,
        pageSize: 1000,
        orderBy: ['name'],
      });
      if (res && res.data) setLstCarUtilities(res.data);
    };
    fetchData();
    return () => {};
  }, []);

  const handleCancel = () => {
    form.resetFields();
    /*  props.setDataModal(null);
    props.setModalVisible(false); */
    dispatch(actionsModal.setModalVisible(false));
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
        formData.id = id;
      }

      /*       if (image.length > 0) {
        formData.image = image[0]?.response?.data[0]?.url ?? image[0].path;
      } else {
        formData.image = null;
      }
 */

      const res = id ? await requestPUT(`api/v1/vehicles/${id}`, formData) : await requestPOST(`api/v1/vehicles`, formData);
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
                <div className='col-xl-4 col-lg-6'>
                  <FormItem label='Công ty' name='companyId' rules={[{required: true, message: 'Không được để trống!'}]}>
                    <Select
                      allowClear
                      showSearch
                      placeholder='Công ty'
                      filterOption={(input, option) => option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                    >
                      {lstCompanies.map((item) => {
                        return (
                          <Option key={item.id} value={item.id}>
                            {item.name}
                          </Option>
                        );
                      })}
                    </Select>
                  </FormItem>
                </div>
                <div className='col-xl-4 col-lg-6'>
                  <FormItem label='Loại phương tiện' name='vehicleTypeId' rules={[{required: true, message: 'Không được để trống!'}]}>
                    <Select
                      allowClear
                      showSearch
                      placeholder='Loại phương tiện'
                      filterOption={(input, option) => option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                    >
                      {lstVehicleType.map((item) => {
                        return (
                          <Option key={item.id} value={item.id}>
                            {item.name}
                          </Option>
                        );
                      })}
                    </Select>
                  </FormItem>
                </div>
                <div className='col-xl-4 col-lg-6'>
                  <FormItem label='Tên phương tiện' name='name' rules={[{required: true, message: 'Không được để trống!'}]}>
                    <Input placeholder='' />
                  </FormItem>
                </div>
                <div className='col-xl-4 col-lg-6'>
                  <FormItem label='Tên tài xế' name='driverName'>
                    <Input placeholder='' />
                  </FormItem>
                </div>
                <div className='col-xl-4 col-lg-6'>
                  <FormItem label='SĐT tài xế' name='driverPhone'>
                    <Input placeholder='' />
                  </FormItem>
                </div>
                <div className='col-xl-4 col-lg-6'>
                  <FormItem label='Loại ghế' name='seatType'>
                    <Input placeholder='' />
                  </FormItem>
                </div>
                <div className='col-xl-4 col-lg-6'>
                  <FormItem label='Số ghế' name='seatLimit'>
                    <InputNumber placeholder='' min={1} style={{width: '100%'}} />
                  </FormItem>
                </div>
                <div className='col-xl-4 col-lg-6'>
                  <FormItem label='Biến số xe' name='registrationPlate'>
                    <Input placeholder='' />
                  </FormItem>
                </div>

                <div className='col-xl-4 col-lg-6'>
                  <FormItem label='Mô tả' name='description'>
                    <TextArea rows={4} autoSize placeholder='' />
                  </FormItem>
                </div>

                <div className='col-xl-4 col-lg-6'>
                  <FormItem label='Trạng thái' name='status'>
                    <Select
                      allowClear
                      showSearch
                      placeholder='Trạng thái'
                      filterOption={(input, option) => option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                    >
                      {dataLevel.map((item) => {
                        return (
                          <Option key={item.id} value={item.status}>
                            {item.name}
                          </Option>
                        );
                      })}
                    </Select>
                  </FormItem>
                </div>
                <div className='col-xl-12 col-lg-12'>
                  <FormItem label='Tiện ích xe' name='carUtilities'>
                    <Select
                      mode='multiple'
                      allowClear
                      showSearch
                      placeholder='Tiện ích xe'
                      filterOption={(input, option) => option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                    >
                      {lstCarUtilities.map((item) => {
                        return (
                          <Option key={item.id} value={item.id}>
                            <i className={`${item.icon}`} style={{fontSize: 12, color: '#FFA726', marginRight: '5px'}}></i> {item.name}
                          </Option>
                        );
                      })}
                    </Select>
                  </FormItem>
                </div>
              </div>
              <div className='row '>
                <div className='col col-xl-12'>
                  <FormItem label='Ảnh '>
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
