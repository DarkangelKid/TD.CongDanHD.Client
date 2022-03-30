import React, {useState, useEffect, useRef} from 'react';
import {shallowEqual, useSelector, useDispatch} from 'react-redux';

import {Form, Input, Select, Spin, DatePicker, InputNumber, Divider, Cascader, Checkbox} from 'antd';
import {Modal, Button} from 'react-bootstrap';
import {toast} from 'react-toastify';
import SunEditor, {buttonList} from 'suneditor-react';
import moment from 'moment';

import 'src/_metronic/assets/sass/suneditor.min.css';

import * as actionsModal from 'src/setup/redux/modal/Actions';
import {requestPOST, requestGET, requestPUT, API_URL, FILE_URL} from 'src/utils/baseAPI';
import ImageUpload from 'src/app/components/ImageUpload';
import {handleImage} from 'src/utils/utils';

const FormItem = Form.Item;

const {TextArea} = Input;
const {Option} = Select;

const optionsEditor = {
  mode: 'classic',
  rtl: false,
  katex: 'window.katex',
  height: '250px',
  imageWidth: '50%',
  imageHeight: '50%',
  tabDisable: false,
  buttonList: [['undo', 'redo', 'font', 'fontSize', 'bold', 'underline', 'italic', 'fontColor', 'outdent', 'indent', 'list', 'link', 'image']],
};

const ModalItem = (props) => {
  const dispatch = useDispatch();
  const token = useSelector((state) => state.auth.accessToken);

  const dataModal = useSelector((state) => state.modal.dataModal);
  const modalVisible = useSelector((state) => state.modal.modalVisible);
  const id = dataModal?.id ?? null;

  const [form] = Form.useForm();
  const [image, setImage] = useState([]);
  const [images, setImages] = useState([]);
  const [lstCompanies, setLstCompanies] = useState([]);
  const [lstBrands, setLstBrands] = useState([]);

  const [provinces, setProvinces] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [communes, setCommunes] = useState([]);
  const [provinceId, setProvinceId] = useState(null);
  const [districtId, setDistrictId] = useState(null);
  const [lstEcommercecategories, setLstEcommercecategories] = useState([]);

  const [categories, setCategories] = useState([]);
  const [attributes, setAttributes] = useState([]);

  const [loadding, setLoadding] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      if (categories && categories.length > 0) {
        const res = await requestPOST(`api/v1/ecommercecategories/${categories[categories.length - 1]}/Attributes/search`, {
          pageNumber: 1,
          pageSize: 1000,
          orderBy: ['position'],
        });

        if (res && res.data) setAttributes(res.data);
      } else {
        setAttributes([]);
      }
    };
    fetchData();
    return () => {};
  }, [categories, id]);

  useEffect(() => {
    const fetchData = async () => {
      const res = await requestGET(`api/v1/ecommercecategories/allChild`);
      if (res && res.data) setLstEcommercecategories(res.data);
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
      const res = await requestPOST(`api/v1/brands/search`, {
        pageNumber: 1,
        pageSize: 10000,
        orderBy: ['name'],
      });
      if (res && res.data) setLstBrands(res.data);
    };
    fetchData();
    return () => {};
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      setLoadding(true);
      const res = await requestGET(`api/v1/products/${id}`);

      if (res && res.data) {
        /* form.setFieldsValue(res.data);
        setImage(handleImage(res.data?.image ?? '', FILE_URL));
        setImages(handleImage(res.data?.images ?? '', FILE_URL));
        setProvinceId(res.data?.provinceId ?? null);
        setDistrictId(res.data?.districtId ?? null);
        if (res.data.fromDate) {
          form.setFieldsValue({fromDate: moment(res.data.fromDate)});
        }
        if (res.data.toDate) {
          form.setFieldsValue({toDate: moment(res.data.toDate)});
        } */
        let _data = res?.data ?? [];

        if (_data.fromDate) {
          _data.fromDate = moment(_data.fromDate);
        }
        if (_data.toDate) {
          _data.toDate = moment(_data.toDate);
        }
        setImage(handleImage(res.data?.image ?? '', FILE_URL));
        setImages(handleImage(res.data?.images ?? '', FILE_URL));
        setProvinceId(res.data?.provinceId ?? null);
        setDistrictId(res.data?.districtId ?? null);

        if (_data.attributes && _data.attributes.length > 0) {
          _data.attributes.map((item) => {
            var type = item?.attribute?.inputType ?? null;
            if (type) {
              if (type === 'Multiselect') {
                var temp = item.value ? JSON.parse(item.value) : [];
                _data[item.code] = temp && temp.length > 0 ? temp.map((i) => i.id) : [];
              } else if (type === 'Select') {
                var temp_ = item.value ? JSON.parse(item.value) : null;
                _data[item.code] = temp_?.id ?? null;
              } else {
                _data[item.code] = item.value;
              }
            }
          });
        }
        if (_data.categories && _data.categories.length > 0) {
          setCategories(_data.categories);
        }
        form.setFieldsValue(_data);
        if (res.data.fromDate) {
          form.setFieldsValue({fromDate: moment(res.data.fromDate)});
        }
        if (res.data.toDate) {
          form.setFieldsValue({toDate: moment(res.data.toDate)});
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

      /* if (formData.ecommerceCategoryIds && formData.ecommerceCategoryIds.length > 0) {
        formData.primaryEcommerceCategoryId = formData.primaryEcommerceCategoryId[formData.parentsId.length - 1];
      } else {
        formData.primaryEcommerceCategoryId = null;
      } */
      var attributesArr = [];
      attributes.map((it, ind) => {
        attributesArr.push({
          code: it.attribute.code,
          value: formData[it.attribute.code],
        });
      });
      formData.attributes = attributesArr;

      const res = id ? await requestPUT(`api/v1/products/${id}`, formData) : await requestPOST(`api/v1/products`, formData);
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
                  <FormItem label='Tên sản phẩm' name='name' rules={[{required: true, message: 'Không được để trống!'}]}>
                    <Input placeholder='' />
                  </FormItem>
                </div>
                <div className='col-xl-4 col-lg-6'>
                  <FormItem label='Mã' name='code'>
                    <Input placeholder='' />
                  </FormItem>
                </div>
                <div className='col-xl-4 col-lg-6'>
                  <FormItem label='Mã SKU' name='sku'>
                    <Input placeholder='' />
                  </FormItem>
                </div>
                <div className='col-xl-4 col-lg-6'>
                  <FormItem label='Mã vạch' name='barcode'>
                    <Input placeholder='' />
                  </FormItem>
                </div>

                <div className='col-xl-4 col-lg-6'>
                  <FormItem label='Thương hiệu' name='brandId' rules={[{required: true, message: 'Không được để trống!'}]}>
                    <Select
                      allowClear
                      showSearch
                      placeholder='Thương hiệu'
                      filterOption={(input, option) => option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                    >
                      {lstBrands.map((item) => {
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
                  <FormItem label='Giá nhập' name='listPrice'>
                    <InputNumber placeholder='' min={0} style={{width: '100%'}} />
                  </FormItem>
                </div>
                <div className='col-xl-4 col-lg-6'>
                  <FormItem label='Giá bán' name='price' rules={[{required: true, message: 'Không được để trống!'}]}>
                    <InputNumber placeholder='' min={0} style={{width: '100%'}} />
                  </FormItem>
                </div>

                <div className='col-xl-4 col-lg-6'>
                  <FormItem label='Số lượng' name='quantity' rules={[{required: true, message: 'Không được để trống!'}]}>
                    <InputNumber placeholder='' min={0} style={{width: '100%'}} />
                  </FormItem>
                </div>
                <div className='col-xl-4 col-lg-6'>
                  <FormItem label='Số điện thoại liên hệ' name='phoneNumber'>
                    <Input placeholder='' />
                  </FormItem>
                </div>
                <div className='col-xl-4 col-lg-6'>
                  <FormItem label='Link video' name='videoURL'>
                    <Input placeholder='' />
                  </FormItem>
                </div>

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
                  <FormItem label='Địa chỉ' name='address'>
                    <Input placeholder='' />
                  </FormItem>
                </div>

                <div className='col-xl-4 col-lg-6'>
                  <FormItem label='Thời gian đăng từ ngày' name='fromDate'>
                    <DatePicker format={'DD/MM/YYYY'} placeholder='Ngày đăng' style={{width: '100%'}} />
                  </FormItem>
                </div>
                <div className='col-xl-4 col-lg-6'>
                  <FormItem label='Thời gian đăng đến ngày' name='toDate'>
                    <DatePicker format={'DD/MM/YYYY'} placeholder='Ngày đăng' style={{width: '100%'}} />
                  </FormItem>
                </div>

                <div className='col-xl-12 col-lg-12'>
                  <FormItem label='Mô tả' name='description'>
                    <SunEditor setContents={form.getFieldValue('description') ? form.getFieldValue('description') : ''} setOptions={optionsEditor} />
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
                  <FormItem label='Ảnh sản phẩm'>
                    <ImageUpload
                      multiple={true}
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
              <Divider orientation='left' className='first'>
                Mô tả sản phẩm
              </Divider>
              <div className='row '>
                <div className='col-xl-6 col-lg-6'>
                  <Form.Item label='Danh mục' name='categories'>
                    <Cascader
                      fieldNames={{
                        label: 'name',
                        value: 'id',
                        children: 'categories',
                      }}
                      placeholder='Chọn danh mục sản phẩm'
                      expandTrigger='hover'
                      options={lstEcommercecategories}
                      changeOnSelect
                      onChange={(val) => setCategories(val)}
                    />
                  </Form.Item>
                </div>
                {attributes.map((item) => {
                  console.log(item.attribute.displayName);
                  return (
                    <div className='col-xl-6 col-lg-6' key={Math.random().toString(32)}>
                      <FormItem
                        label={item.attribute.displayName}
                        name={item.attribute.code}
                        valuePropName={item.attribute.inputType == 'Boolean' ? 'checked' : 'value'}
                      >
                        {item.attribute.inputType == 'Boolean' ? (
                          <Checkbox />
                        ) : item.attribute.inputType == 'Date' ? (
                          <DatePicker format={'DD/MM/YYYY'} style={{width: '100%'}} />
                        ) : item.attribute.inputType == 'Textarea' ? (
                          <TextArea rows={2} style={{width: '100%', height: 'auto', borderRadius: 5}} />
                        ) : item.attribute.inputType == 'Select' || item.attribute.inputType == 'Multiselect' ? (
                          <>
                            {/*  <RenderItem
                            item={item}
                            initValue={form.getFieldValue(`${item.code}`) ? form.getFieldValue(`${item.code}`) : ''}
                            handleChangeValue={handleChangeValue}
                          /> */}
                          </>
                        ) : (
                          <Input style={{width: '100%', height: 32, borderRadius: 5}} />
                        )}
                      </FormItem>
                    </div>
                  );
                })}
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
