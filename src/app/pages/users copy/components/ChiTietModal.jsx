import React, {useState, useEffect, useRef} from 'react';
import {shallowEqual, useSelector, useDispatch} from 'react-redux';

import {Form, Input, Select, Spin, notification, DatePicker} from 'antd';
import {Modal, Button} from 'react-bootstrap';
import moment from 'moment';

import * as actions from 'src/setup/redux/modal/Actions';

import {requestPOST, requestGET, requestPUT, API_URL, FILE_URL} from 'src/utils/baseAPI';
import {handleImage} from 'src/utils/utils';
import ImageUpload from 'src/app/components/ImageUpload';

const FormItem = Form.Item;

const initData = {
  userName: '',
  fullName: '',

  phoneNumber: null,
  email: '',
  gender: null,
  dateOfBirth: null,
  isActive: true,
  isVerified: false,
  emailConfirmed: true,
  phoneNumberConfirmed: true,
  imageUrl: null,
  identityNumber: null,
  identityPlace: null,
  identityDate: null,
  placeOfOrigin: null,
  placeOfDestination: null,
  nationality: null,
  provinceId: null,
  districtId: null,
  communeId: null,
  address: null,
  province: null,
  district: null,
  commune: null,
};

const {Option} = Select;

const ModalItem = (props) => {
  const dispatch = useDispatch();
  const token = useSelector((state) => state.auth.accessToken);
  const dataModal = useSelector((state) => state.modal.dataModal);

  const id = props?.dataModal?.userName ?? null;
  const [form] = Form.useForm();

  const genders = [
    {id: 'Nam', name: 'Nam'},
    {id: 'Nữ', name: 'Nữ'},
    {id: 'Khác', name: 'Khác'},
  ];

  const [loadding, setLoadding] = useState(false);
  const [provinces, setProvinces] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [communes, setCommunes] = useState([]);

  const [provinceId, setProvinceId] = useState(null);
  const [districtId, setDistrictId] = useState(null);
  const [image, setImage] = useState([]);
  console.log(image);

  useEffect(() => {
    const fetchData = async () => {
      setLoadding(true);
      const res = await requestGET(`api/users/${id}`);

      if (res) {
        form.setFieldsValue(res);
        setProvinceId(res?.provinceId ?? null);
        setDistrictId(res?.districtId ?? null);
        setImage(handleImage(res?.imageUrl ?? '', FILE_URL));
        if (res.dateOfBirth) {
          form.setFieldsValue({dateOfBirth: moment(res.dateOfBirth)});
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
      const res = await requestPOST(`api/v1/areas/search`, {
        pageNumber: 1,
        pageSize: 1000,
        orderBy: ['name'],
        level: 1,
      });
      if (res && res.data) setProvinces(res.data);
    };
    fetchData();
    return () => {};
  }, []);

  useEffect(() => {
    console.log(provinceId);
    if (provinceId) {
      const fetchData = async () => {
        const res = await requestPOST(`api/v1/areas/search`, {
          pageNumber: 1,
          pageSize: 1000,
          orderBy: ['name'],
          level: 2,
          parentId: provinceId,
        });
        if (res && res.data) setDistricts(res.data);
      };
      fetchData();
    }
    return () => {};
  }, [provinceId]);

  useEffect(() => {
    if (districtId) {
      const fetchData = async () => {
        const res = await requestPOST(`api/v1/areas/search`, {
          pageNumber: 1,
          pageSize: 1000,
          orderBy: ['name'],
          level: 3,
          parentId: districtId,
        });
        if (res && res.data) setCommunes(res.data);
      };
      fetchData();
    }
    return () => {};
  }, [districtId]);

  const handleCancel = () => {
    form.resetFields();
    props.setDataModal(null);
    props.setModalVisible(false);
  };

  const onFinish = async () => {
    try {
      const formData = form.getFieldsValue(true);
      if (id) {
        formData.id = id;
      }

      if (image.length > 0) {
        formData.imageUrl = image[0]?.response?.data[0]?.url ?? image[0].path;
      } else {
        formData.imageUrl = null;
      }

      const res = id ? await requestPUT(`api/users/${id}`, formData) : await requestPOST(`api/users`, formData);
      if (res) {
        notification.success({
          message: 'Cập nhật thành công!',
          duration: 1,
          placement: 'bottomRight',
        });
        // form.resetFields();
        props.setUpdate(!props.update);
        handleCancel();
      } else {
        notification.error({
          message: `Lỗi ${res}`,
        });
      }
    } catch (errorInfo) {
      console.log('Failed:', errorInfo);
    }
  };

  return (
    <Modal
      show={props.modalVisible}
      fullscreen
      onExited={() => {
        props.setModalVisible(false);
        props.setUpdate(!props.update);
        form.resetFields();
      }}
    >
      <Modal.Header className='bg-primary px-4 py-3'>
        <Modal.Title className='text-white'>Chi tiết người dùng</Modal.Title>
        <button type='button' className='btn-close btn-close-white' aria-label='Close' onClick={handleCancel}></button>
      </Modal.Header>
      <Modal.Body>
        <Spin spinning={loadding}>
          {!loadding && (
            <Form form={form} layout='vertical' hideRequiredMark initialValues={initData}>
              <div className='row '>
                <div className='col col-xl-6'>
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
                <div className='col col-xl-6'>
                  <div className='row'>
                    <div className='col-xl-12'>
                      <FormItem label='Tên đăng nhập' name='userName' rules={[{required: true, message: 'Không được để trống!'}]}>
                        <Input placeholder='Tên đăng nhập' disabled={id ? true : false} />
                      </FormItem>
                    </div>
                    <div className='col-xl-12'>
                      <FormItem label='Họ và tên' name='fullName'>
                        <Input placeholder='Họ và tên' />
                      </FormItem>
                    </div>
                  </div>
                </div>
              </div>
              <div className='row'>
                <div className='col-xl-4 col-lg-6'>
                  <FormItem label='Số điện thoại' name='phoneNumber'>
                    <Input placeholder='' disabled={id ? true : false} />
                  </FormItem>
                </div>
                <div className='col-xl-4 col-lg-6'>
                  <FormItem label='Email' name='email'>
                    <Input placeholder='' disabled={id ? true : false} />
                  </FormItem>
                </div>

                <div className='col-xl-4 col-lg-6'>
                  <FormItem label='Giới tính' name='gender'>
                    <Select
                      showSearch
                      placeholder='Giới tính'
                      filterOption={(input, option) => option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                    >
                      {genders.map((item) => {
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
                  <FormItem label='Ngày sinh' name='dateOfBirth'>
                    <DatePicker format='DD/MM/YYYY' style={{width: '100%'}} />
                  </FormItem>
                </div>

                <div className='col-xl-4 col-lg-6'>
                  <FormItem label='Số giấy tờ' name='identityNumber'>
                    <Input placeholder='' />
                  </FormItem>
                </div>
                <div className='col-xl-4 col-lg-6'>
                  <FormItem label='Ngày cấp' name='identityDateOfIssue'>
                    <DatePicker format='DD/MM/YYYY' style={{width: '100%'}} />
                  </FormItem>
                </div>
                <div className='col-xl-4 col-lg-6'>
                  <FormItem label='Nơi cấp' name='identityPlace'>
                    <Input placeholder='' />
                  </FormItem>
                </div>

                <div className='col-xl-4 col-lg-6'>
                  <FormItem label='Tỉnh/Thành phố' name='provinceId'>
                    <Select
                      showSearch
                      placeholder='Tỉnh/Thành phố'
                      filterOption={(input, option) => option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                      onChange={(val) => setProvinceId(val) + form.resetFields(['districtId', 'communeId'])}
                    >
                      {provinces.map((item) => {
                        return (
                          <Option key={item.id} value={item.id}>
                            {item.nameWithType}
                          </Option>
                        );
                      })}
                    </Select>
                  </FormItem>
                </div>
                <div className='col-xl-4 col-lg-6'>
                  <FormItem label='Quận/Huyện' name='districtId'>
                    <Select
                      showSearch
                      placeholder='Quận/Huyện'
                      filterOption={(input, option) => option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                      onChange={(val) => setDistrictId(val) + form.resetFields(['communeId'])}
                    >
                      {districts.map((item) => {
                        return (
                          <Option key={item.id} value={item.id}>
                            {item.nameWithType}
                          </Option>
                        );
                      })}
                    </Select>
                  </FormItem>
                </div>
                <div className='col-xl-4 col-lg-6'>
                  <FormItem label='Phường/Xã' name='communeId'>
                    <Select
                      showSearch
                      placeholder='Phường/Xã'
                      filterOption={(input, option) => option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                    >
                      {communes.map((item) => {
                        return (
                          <Option key={item.id} value={item.id}>
                            {item.nameWithType}
                          </Option>
                        );
                      })}
                    </Select>
                  </FormItem>
                </div>
                <div className='col-xl-4 col-lg-6'>
                  <FormItem label='Thôn/Xóm/Số nhà' name='address'>
                    <Input placeholder='Địa chỉ' />
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
