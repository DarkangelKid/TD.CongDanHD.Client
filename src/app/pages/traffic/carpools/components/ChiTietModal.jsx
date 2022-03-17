import React, {useState, useEffect, useRef} from 'react';
import {shallowEqual, useSelector, useDispatch} from 'react-redux';

import {Form, Input, Select, Spin, InputNumber, TimePicker, DatePicker, Divider} from 'antd';
import {Modal, Button} from 'react-bootstrap';
import {toast} from 'react-toastify';
import moment from 'moment';

import * as actionsModal from 'src/setup/redux/modal/Actions';
import {requestPOST, requestGET, requestPUT, API_URL, FILE_URL} from 'src/utils/baseAPI';

const FormItem = Form.Item;

const {TextArea} = Input;
const {Option} = Select;

const DATA_ROLE = [
  {
    id: 1,
    name: 'Hành khách',
  },
  {
    id: 2,
    name: 'Chủ xe',
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
  const [lstVehicleType, setLstVehicleType] = useState([]);

  const [departureDistrictId, setDepartureDistrictId] = useState(null);
  const [departureProvinceId, setDepartureProvinceId] = useState(null);
  const [arrivalDistrictId, setArrivalDistrictId] = useState(null);
  const [arrivalProvinceId, setArrivalProvinceId] = useState(null);

  const [departureProvinces, setDepartureProvinces] = useState([]);
  const [departureDistricts, setDepartureDistricts] = useState([]);
  const [departureCommunes, setDepartureCommunes] = useState([]);

  const [arrivalProvinces, setArrivalProvinces] = useState([]);
  const [arrivalDistricts, setArrivalDistricts] = useState([]);
  const [arrivalCommunes, setArrivalCommunes] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      setLoadding(true);
      const res = await requestGET(`api/v1/carpools/${id}`);

      if (res && res.data) {
        form.setFieldsValue(res.data);

        setDepartureProvinceId(res.data?.departureProvinceId ?? null);
        setDepartureDistrictId(res.data?.departureDistrictId ?? null);
        setArrivalProvinceId(res.data?.arrivalProvinceId ?? null);
        setArrivalDistrictId(res.data?.arrivalDistrictId ?? null);

        try {
          if (res.data.departureDate) {
            form.setFieldsValue({departureDate: moment(res.data.departureDate)});
          }
        } catch (error) {}
        try {
          if (res.data.departureTimeText) {
            form.setFieldsValue({departureTimeText: moment(res.data.departureTimeText, 'HH:mm')});
          }
        } catch (error) {}

        console.log(form.getFieldsValue(true));
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
      const res = await requestPOST(`api/v1/areas/search`, {
        pageNumber: 1,
        pageSize: 1000,
        orderBy: ['name'],
        level: 1,
      });
      if (res && res.data) {
        setDepartureProvinces(res.data);
        setArrivalProvinces(res.data);
      }
    };
    fetchData();
    return () => {};
  }, []);

  useEffect(() => {
    if (departureProvinceId) {
      const fetchData = async () => {
        const res = await requestPOST(`api/v1/areas/search`, {
          pageNumber: 1,
          pageSize: 1000,
          orderBy: ['name'],
          level: 2,
          parentId: departureProvinceId,
        });
        if (res && res.data) setDepartureDistricts(res.data);
      };
      fetchData();
    } else {
      setDepartureDistricts([]);
    }
    return () => {
      setDepartureDistricts([]);
    };
  }, [departureProvinceId]);

  useEffect(() => {
    if (departureDistrictId) {
      const fetchData = async () => {
        const res = await requestPOST(`api/v1/areas/search`, {
          pageNumber: 1,
          pageSize: 1000,
          orderBy: ['name'],
          level: 3,
          parentId: departureDistrictId,
        });
        if (res && res.data) setDepartureCommunes(res.data);
      };
      fetchData();
    } else {
      setDepartureCommunes([]);
    }
    return () => {
      setDepartureCommunes([]);
    };
  }, [departureDistrictId]);

  useEffect(() => {
    if (arrivalProvinceId) {
      const fetchData = async () => {
        const res = await requestPOST(`api/v1/areas/search`, {
          pageNumber: 1,
          pageSize: 1000,
          orderBy: ['name'],
          level: 2,
          parentId: arrivalProvinceId,
        });
        if (res && res.data) setArrivalDistricts(res.data);
      };
      fetchData();
    } else {
      setArrivalDistricts([]);
    }
    return () => {
      setArrivalDistricts([]);
    };
  }, [arrivalProvinceId]);

  useEffect(() => {
    if (arrivalDistrictId) {
      const fetchData = async () => {
        const res = await requestPOST(`api/v1/areas/search`, {
          pageNumber: 1,
          pageSize: 1000,
          orderBy: ['name'],
          level: 3,
          parentId: arrivalDistrictId,
        });
        if (res && res.data) setArrivalCommunes(res.data);
      };
      fetchData();
    } else {
      setArrivalCommunes([]);
    }
    return () => {
      setArrivalCommunes([]);
    };
  }, [arrivalDistrictId]);

  const handleCancel = () => {
    form.resetFields();
    dispatch(actionsModal.setModalVisible(false));
  };

  const handleChange = () => {};

  const onFinish = async () => {
    const values = await form.validateFields();

    try {
      const formData = form.getFieldsValue(true);
      if (id) {
        formData.id = id;
      }

      const res = id ? await requestPUT(`api/v1/carpools/${id}`, formData) : await requestPOST(`api/v1/carpools`, formData);
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
                  <FormItem label='Tên' name='name' rules={[{required: true, message: 'Không được để trống!'}]}>
                    <Input placeholder='' />
                  </FormItem>
                </div>

                <div className='col-xl-4 col-lg-6'>
                  <FormItem label='Vai trò' name='role' rules={[{required: true, message: 'Không được để trống!'}]}>
                    <Select
                      allowClear
                      showSearch
                      placeholder='Vai trò'
                      filterOption={(input, option) => option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                    >
                      {DATA_ROLE.map((item) => {
                        return (
                          <Option key={item.name} value={item.name}>
                            {item.name}
                          </Option>
                        );
                      })}
                    </Select>
                  </FormItem>
                </div>

                <div className='col-xl-4 col-lg-6'>
                  <FormItem label='Số điện thoại' name='phoneNumber' rules={[{required: true, message: 'Không được để trống!'}]}>
                    <Input placeholder='' />
                  </FormItem>
                </div>

                <div className='col-xl-4 col-lg-6'>
                  <Form.Item label='Mục đích' name='description'>
                    <TextArea placeholder='' rows={1} />
                  </Form.Item>
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
                  <FormItem label='Số chỗ ngồi' name='seatCount' rules={[{required: true, message: 'Không được để trống!'}]}>
                    <InputNumber placeholder='' style={{width: '100%'}} />
                  </FormItem>
                </div>
                <div className='col-xl-4 col-lg-6'>
                  <FormItem label='Giá vé' name='price' rules={[{required: true, message: 'Không được để trống!'}]}>
                    <InputNumber placeholder='' style={{width: '100%'}} />
                  </FormItem>
                </div>

                <div className='col-xl-4 col-lg-6'>
                  <FormItem label='Ngày xuất phát' name='departureDate' rules={[{required: true, message: 'Không được để trống!'}]}>
                    <DatePicker format='DD/MM/YYYY' style={{width: '100%'}} />
                  </FormItem>
                </div>

                <div className='col-xl-4 col-lg-6'>
                  <FormItem label='Giờ xuất phát' name='departureTimeText'>
                    <TimePicker format='HH:mm' style={{width: '100%'}} />
                  </FormItem>
                </div>
                <Divider orientation='left' className='first'>
                  Nơi đi
                </Divider>
                <div className='col-xl-4 col-lg-6'>
                  <FormItem label='Tỉnh/Thành phố' name='departureProvinceId' rules={[{required: true, message: 'Không được để trống!'}]}>
                    <Select
                      allowClear
                      showSearch
                      placeholder='Tỉnh/Thành phố'
                      filterOption={(input, option) => option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                      onChange={(val) => setDepartureProvinceId(val) + form.resetFields(['departureDistrictId', 'departureCommuneId'])}
                    >
                      {departureProvinces.map((item) => {
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
                  <FormItem label='Quận/Huyện' name='departureDistrictId' rules={[{required: true, message: 'Không được để trống!'}]}>
                    <Select
                      allowClear
                      showSearch
                      placeholder='Quận/Huyện'
                      filterOption={(input, option) => option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                      onChange={(val) => setDepartureDistrictId(val) + form.resetFields(['departureCommuneId'])}
                    >
                      {departureDistricts.map((item) => {
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
                  <FormItem label='Phường/Xã' name='departureCommuneId' rules={[{required: true, message: 'Không được để trống!'}]}>
                    <Select
                      allowClear
                      showSearch
                      placeholder='Phường/Xã'
                      filterOption={(input, option) => option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                    >
                      {departureCommunes.map((item) => {
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
                  <FormItem label='Địa điểm' name='departurePlaceName'>
                    <Input placeholder='' />
                  </FormItem>
                </div>
                <div className='col-xl-4 col-lg-6'>
                  <FormItem label='Kinh độ' name='departureLatitude'>
                    <InputNumber placeholder='' style={{width: '100%'}} />
                  </FormItem>
                </div>
                <div className='col-xl-4 col-lg-6'>
                  <FormItem label='Vĩ độ' name='departureLongitude'>
                    <InputNumber placeholder='' style={{width: '100%'}} />
                  </FormItem>
                </div>
                <Divider orientation='left' className='second'>
                  Nơi đến
                </Divider>
                <div className='col-xl-4 col-lg-6'>
                  <FormItem label='Tỉnh/Thành phố' name='arrivalProvinceId' rules={[{required: true, message: 'Không được để trống!'}]}>
                    <Select
                      allowClear
                      showSearch
                      placeholder='Tỉnh/Thành phố'
                      filterOption={(input, option) => option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                      onChange={(val) => setArrivalProvinceId(val) + form.resetFields(['arrivalDistrictId', 'arrivalCommuneId'])}
                    >
                      {arrivalProvinces.map((item) => {
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
                  <FormItem label='Quận/Huyện' name='arrivalDistrictId' rules={[{required: true, message: 'Không được để trống!'}]}>
                    <Select
                      allowClear
                      showSearch
                      placeholder='Quận/Huyện'
                      filterOption={(input, option) => option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                      onChange={(val) => setArrivalDistrictId(val) + form.resetFields(['arrivalCommuneId'])}
                    >
                      {arrivalDistricts.map((item) => {
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
                  <FormItem label='Phường/Xã' name='arrivalCommuneId' rules={[{required: true, message: 'Không được để trống!'}]}>
                    <Select
                      allowClear
                      showSearch
                      placeholder='Phường/Xã'
                      filterOption={(input, option) => option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                    >
                      {arrivalCommunes.map((item) => {
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
                  <FormItem label='Địa điểm' name='arrivalPlaceName'>
                    <Input placeholder='' />
                  </FormItem>
                </div>
                <div className='col-xl-4 col-lg-6'>
                  <FormItem label='Kinh độ' name='arrivalLatitude'>
                    <InputNumber placeholder='' style={{width: '100%'}} />
                  </FormItem>
                </div>
                <div className='col-xl-4 col-lg-6'>
                  <FormItem label='Vĩ độ' name='arrivalLongitude'>
                    <InputNumber placeholder='' style={{width: '100%'}} />
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
