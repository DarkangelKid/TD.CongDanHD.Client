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

const genders = [
  {id: 'Nam', name: 'Nam'},
  {id: 'Nữ', name: 'Nữ'},
  {id: 'Khác', name: 'Khác'},
];

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
  const [lstCompanies, setLstCompanies] = useState([]);
  const [lstJobNames, setLstJobNames] = useState([]);
  const [lstJobPositions, setLstJobPositions] = useState([]);
  const [lstJobTypes, setLstJobTypes] = useState([]);
  const [lstSalaries, setLstSalaries] = useState([]);
  const [lstExperiences, setLstExperiences] = useState([]);
  const [lstJobAges, setLstJobAges] = useState([]);
  const [lstDegrees, setLstDegrees] = useState([]);
  const [lstBenefits, setLstBenefits] = useState([]);
  const [provinces, setProvinces] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [communes, setCommunes] = useState([]);

  const [provinceId, setProvinceId] = useState(null);
  const [districtId, setDistrictId] = useState(null);
  const [image, setImage] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      setLoadding(true);
      const res = await requestGET(`api/v1/recruitments/${id}`);

      if (res && res.data) {
        form.setFieldsValue(res.data);
        setProvinceId(res.data?.provinceId ?? null);
        setDistrictId(res.data?.districtId ?? null);
        setImage(handleImage(res.data?.image ?? '', FILE_URL));

        if (res.data.resumeApplyExpired) {
          form.setFieldsValue({resumeApplyExpired: moment(res.data.resumeApplyExpired)});
        }
        if (res.data.recruitmentBenefits && res.data.recruitmentBenefits.length > 0) {
          form.setFieldsValue({benefits: res.data.recruitmentBenefits.map((i) => i.benefitId)});
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
      const res = await requestPOST(`api/v1/jobnames/search`, {
        pageNumber: 1,
        pageSize: 10000,
        orderBy: ['name'],
      });
      if (res && res.data) setLstJobNames(res.data);
    };
    fetchData();
    return () => {};
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      const res = await requestPOST(`api/v1/jobtypes/search`, {
        pageNumber: 1,
        pageSize: 10000,
        orderBy: ['name'],
      });
      if (res && res.data) setLstJobTypes(res.data);
    };
    fetchData();
    return () => {};
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      const res = await requestPOST(`api/v1/jobpositions/search`, {
        pageNumber: 1,
        pageSize: 10000,
        orderBy: ['name'],
      });
      if (res && res.data) setLstJobPositions(res.data);
    };
    fetchData();
    return () => {};
  }, []);
  useEffect(() => {
    const fetchData = async () => {
      const res = await requestPOST(`api/v1/salaries/search`, {
        pageNumber: 1,
        pageSize: 10000,
        orderBy: ['name'],
      });
      if (res && res.data) setLstSalaries(res.data);
    };
    fetchData();
    return () => {};
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      const res = await requestPOST(`api/v1/benefits/search`, {
        pageNumber: 1,
        pageSize: 10000,
        orderBy: ['name'],
      });
      if (res && res.data) setLstBenefits(res.data);
    };
    fetchData();
    return () => {};
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      const res = await requestPOST(`api/v1/experiences/search`, {
        pageNumber: 1,
        pageSize: 10000,
        orderBy: ['name'],
      });
      if (res && res.data) setLstExperiences(res.data);
    };
    fetchData();
    return () => {};
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      const res = await requestPOST(`api/v1/jobages/search`, {
        pageNumber: 1,
        pageSize: 10000,
        orderBy: ['name'],
      });
      if (res && res.data) setLstJobAges(res.data);
    };
    fetchData();
    return () => {};
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      const res = await requestPOST(`api/v1/degrees/search`, {
        pageNumber: 1,
        pageSize: 10000,
        orderBy: ['name'],
      });
      if (res && res.data) setLstDegrees(res.data);
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

      form.setFieldsValue({image: arrImage.join('##')});

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

      const res = id ? await requestPUT(`api/v1/recruitments/${id}`, formData) : await requestPOST(`api/v1/recruitments`, formData);
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
                  <FormItem label='Tiêu đề' name='name' rules={[{required: true, message: 'Không được để trống!'}]}>
                    <Input placeholder='' />
                  </FormItem>
                </div>
                <div className='col-xl-4 col-lg-6'>
                  <FormItem label='Nghề nghiệp' name='jobNameId' rules={[{required: true, message: 'Không được để trống!'}]}>
                    <Select
                      allowClear
                      showSearch
                      placeholder='Nghề nghiệp'
                      filterOption={(input, option) => option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                    >
                      {lstJobNames.map((item) => {
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
                  <FormItem label='Vị trí' name='jobPositionId'>
                    <Select
                      allowClear
                      showSearch
                      placeholder='Vị trí'
                      filterOption={(input, option) => option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                    >
                      {lstJobPositions.map((item) => {
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
                  <FormItem label='Số lượng cần tuyển' name='numberOfJob' rules={[{required: true, message: 'Không được để trống!'}]}>
                    <InputNumber placeholder='' style={{width: '100%'}} />
                  </FormItem>
                </div>
                <div className='col-xl-4 col-lg-6'>
                  <FormItem label='Loại hình công việc' name='jobTypeId'>
                    <Select
                      allowClear
                      showSearch
                      placeholder='Loại hình công việc'
                      filterOption={(input, option) => option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                    >
                      {lstJobTypes.map((item) => {
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
                  <FormItem label='Mức lương' name='salaryId'>
                    <Select
                      allowClear
                      showSearch
                      placeholder='Mức lương'
                      filterOption={(input, option) => option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                    >
                      {lstSalaries.map((item) => {
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
                  <FormItem label='Quyền lợi' name='benefits'>
                    <Select
                      mode='multiple'
                      allowClear
                      showSearch
                      placeholder='Quyền lợi'
                      filterOption={(input, option) => option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                    >
                      {lstBenefits.map((item) => {
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
                  <FormItem label='Mô tả công việc' name='description'>
                    <TextArea placeholder='' />
                  </FormItem>
                </div>
                <div className='row '>
                  <div className='col col-xl-12'>
                    <FormItem label='Hình ảnh'>
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
                <Divider orientation='left' className='first'>
                  Yêu cầu
                </Divider>

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
                  <FormItem label='Độ tuổi' name='jobAgeId'>
                    <Select
                      allowClear
                      showSearch
                      placeholder='Độ tuổi'
                      filterOption={(input, option) => option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                    >
                      {lstJobAges.map((item) => {
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
                  <FormItem label='Bằng cấp' name='degreeId'>
                    <Select
                      allowClear
                      showSearch
                      placeholder='Bằng cấp'
                      filterOption={(input, option) => option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                    >
                      {lstDegrees.map((item) => {
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
                  <FormItem label='Kinh nghiệm làm việc' name='experienceId'>
                    <Select
                      allowClear
                      showSearch
                      placeholder='Kinh nghiệm làm việc'
                      filterOption={(input, option) => option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                    >
                      {lstExperiences.map((item) => {
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
                  <FormItem label='Hạn nộp hồ sơ' name='resumeApplyExpired'>
                    <DatePicker format='DD/MM/YYYY' style={{width: '100%'}} />
                  </FormItem>
                </div>
                <div className='col-xl-12 col-lg-12'>
                  <FormItem label='Hồ sơ bao gồm' name='resumeRequirement'>
                    <TextArea placeholder='' />
                  </FormItem>
                </div>
                <div className='col-xl-12 col-lg-12'>
                  <FormItem label='Yêu cầu khác' name='otherRequirement'>
                    <TextArea placeholder='' />
                  </FormItem>
                </div>

                <Divider orientation='left' className='second'>
                  Địa chỉ làm việc
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
                <Divider orientation='left' className='third'>
                  Liên hệ
                </Divider>
                <div className='col-xl-4 col-lg-6'>
                  <FormItem label='Tên người liên hệ' name='contactName'>
                    <Input placeholder='' />
                  </FormItem>
                </div>
                <div className='col-xl-4 col-lg-6'>
                  <FormItem label='Email liên hệ' name='contactEmail'>
                    <Input placeholder='' />
                  </FormItem>
                </div>
                <div className='col-xl-4 col-lg-6'>
                  <FormItem label='SĐT liên hệ' name='contactPhone'>
                    <Input placeholder='' />
                  </FormItem>
                </div>
                <div className='col-xl-4 col-lg-6'>
                  <FormItem label='Địa chỉ liên hệ' name='contactAdress'>
                    <Input placeholder='' />
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
