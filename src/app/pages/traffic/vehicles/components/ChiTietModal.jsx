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

const ModalItem = (props) => {
  const dispatch = useDispatch();
  const token = useSelector((state) => state.auth.accessToken);
  const dataModal = useSelector((state) => state.modal.dataModal);
  const modalVisible = useSelector((state) => state.modal.modalVisible);
  const id = dataModal?.id ?? null;

  const [form] = Form.useForm();

  const [loadding, setLoadding] = useState(false);
  const [lstIndustries, setLstIndustries] = useState([]);
  const [provinces, setProvinces] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [communes, setCommunes] = useState([]);

  const [provinceId, setProvinceId] = useState(null);
  const [districtId, setDistrictId] = useState(null);
  const [image, setImage] = useState([]);
  const [logo, setLogo] = useState([]);
  const [images, setImages] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      setLoadding(true);
      const res = await requestGET(`api/v1/companies/${id}`);

      if (res && res.data) {
        form.setFieldsValue(res.data);
        setProvinceId(res.data?.provinceId ?? null);
        setDistrictId(res.data?.districtId ?? null);
        setImage(handleImage(res.data?.image ?? '', FILE_URL));
        setLogo(handleImage(res.data?.logo ?? '', FILE_URL));
        setImages(handleImage(res.data?.images ?? '', FILE_URL));

        if (res.data.dateOfIssue) {
          form.setFieldsValue({dateOfIssue: moment(res.data.dateOfIssue)});
        }
        if (res.data.companyIndustries && res.data.companyIndustries.length > 0) {
          form.setFieldsValue({industries: res.data.companyIndustries.map((i) => i.industryId)});
        }

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
      const res = await requestPOST(`api/v1/industries/search`, {
        pageNumber: 1,
        pageSize: 1000,
        orderBy: ['name'],
      });
      if (res && res.data) setLstIndustries(res.data);
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
      if (res && res.data) setProvinces(res.data);
    };
    fetchData();
    return () => {};
  }, []);

  useEffect(() => {
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

      let arrLogo = [];
      logo.forEach((i) => {
        if (i.response) {
          arrLogo.push(i.response.data[0].url);
        } else {
          arrLogo.push(i.path);
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
      form.setFieldsValue({logo: arrLogo.join('##')});
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

      const res = id ? await requestPUT(`api/v1/companies/${id}`, formData) : await requestPOST(`api/v1/companies`, formData);
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
                  <FormItem label='Tên công ty' name='name' rules={[{required: true, message: 'Không được để trống!'}]}>
                    <Input placeholder='' />
                  </FormItem>
                </div>
                <div className='col-xl-4 col-lg-6'>
                  <FormItem label='Tên quốc tế' name='internationalName'>
                    <Input placeholder='' />
                  </FormItem>
                </div>
                <div className='col-xl-4 col-lg-6'>
                  <FormItem label='Tên viết tắt' name='shortName'>
                    <Input placeholder='' />
                  </FormItem>
                </div>
                <div className='col-xl-4 col-lg-6'>
                  <FormItem label='Mã số thuế' name='taxCode'>
                    <Input placeholder='' />
                  </FormItem>
                </div>
                <div className='col-xl-4 col-lg-6'>
                  <FormItem label='Số điện thoại' name='phoneNumber'>
                    <Input placeholder='' />
                  </FormItem>
                </div>
                <div className='col-xl-4 col-lg-6'>
                  <FormItem label='Email' name='email'>
                    <Input placeholder='' />
                  </FormItem>
                </div>

                <div className='col-xl-4 col-lg-6'>
                  <FormItem label='Website' name='website'>
                    <Input placeholder='' />
                  </FormItem>
                </div>
                <div className='col-xl-4 col-lg-6'>
                  <FormItem label='Video giới thiệu' name='profileVideo'>
                    <Input placeholder='' />
                  </FormItem>
                </div>

                <div className='col-xl-4 col-lg-6'>
                  <FormItem label='Fax' name='fax'>
                    <Input placeholder='' />
                  </FormItem>
                </div>

                <div className='col-xl-4 col-lg-6'>
                  <FormItem label='Ngày cấp' name='dateOfIssue'>
                    <DatePicker format='DD/MM/YYYY' style={{width: '100%'}} />
                  </FormItem>
                </div>

                <div className='col-xl-4 col-lg-6'>
                  <FormItem label='Người đại diện' name='representative'>
                    <Input placeholder='' />
                  </FormItem>
                </div>

                <div className='col-xl-4 col-lg-6'>
                  <FormItem label='Quy mô' name='companySize'>
                    <Input placeholder='' />
                  </FormItem>
                </div>
                <Divider orientation='left' className='first'>
                  Địa chỉ
                </Divider>

                <div className='col-xl-4 col-lg-6'>
                  <FormItem label='Tỉnh/Thành phố' name='provinceId'>
                    <Select
                      allowClear
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
                      allowClear
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
                      allowClear
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
                    <Input placeholder='' />
                  </FormItem>
                </div>
                <div className='col-xl-4 col-lg-6'>
                  <FormItem label='Kinh độ' name='latitude'>
                    <InputNumber placeholder='' style={{width: '100%'}} />
                  </FormItem>
                </div>
                <div className='col-xl-4 col-lg-6'>
                  <FormItem label='Vĩ độ' name='longitude'>
                    <InputNumber placeholder='' style={{width: '100%'}} />
                  </FormItem>
                </div>
                <Divider orientation='left' className='first'></Divider>
                <div className='col-xl-12 col-lg-12'>
                  <FormItem label='Ngành nghề kinh doanh' name='industries'>
                    <Select
                      mode='multiple'
                      allowClear
                      showSearch
                      placeholder='Ngành nghề kinh doanh'
                      filterOption={(input, option) => option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                    >
                      {lstIndustries.map((item) => {
                        return (
                          <Option key={item.id} value={item.id}>
                            {item.name}
                          </Option>
                        );
                      })}
                    </Select>
                  </FormItem>
                </div>
                <div className='col-xl-12 col-lg-12'>
                  <FormItem label='Mô tả' name='description'>
                    <Input.TextArea rows={4} placeholder='Mô tả' />
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
                  <FormItem label='Logo'>
                    <ImageUpload
                      URL={`${API_URL}/api/v1/attachments`}
                      fileList={logo}
                      onChange={(e) => setLogo(e.fileList)}
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
