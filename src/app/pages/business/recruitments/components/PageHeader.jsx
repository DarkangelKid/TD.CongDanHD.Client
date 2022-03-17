import React, {useState, useEffect, useRef} from 'react';
import {shallowEqual, useSelector, useDispatch} from 'react-redux';
import {Form, Input, Select, Spin, notification, DatePicker} from 'antd';

import {requestPOST} from 'src/utils/baseAPI';
import * as actionsModal from 'src/setup/redux/modal/Actions';

const FormItem = Form.Item;
const {Option} = Select;

const PageHeader = (props) => {
  const dispatch = useDispatch();
  const [form] = Form.useForm();
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

  useEffect(() => {
    form.resetFields();
    dispatch(actionsModal.setDataSearch(null));
    return () => {};
  }, []);

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
                  <FormItem label='Công ty' name='companyId'>
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
                  <FormItem label='Nghề nghiệp' name='jobNameId'>
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
                  <FormItem label='Tỉnh/Thành phố' name='provinceId'>
                    <Select
                      showSearch
                      allowClear
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
                      allowClear
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
                      allowClear
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
