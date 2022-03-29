import React, {useState, useEffect, useRef} from 'react';
import {shallowEqual, useSelector, useDispatch} from 'react-redux';

import {Form, Input, Select, Spin, Checkbox} from 'antd';
import {Modal, Button} from 'react-bootstrap';
import {toast} from 'react-toastify';

import * as actionsModal from 'src/setup/redux/modal/Actions';
import {requestPOST, requestGET, requestPUT} from 'src/utils/baseAPI';

const FormItem = Form.Item;

const {TextArea} = Input;

const ModalItem = (props) => {
  const dispatch = useDispatch();
  const dataModal = useSelector((state) => state.modal.dataModal);
  const modalVisible = useSelector((state) => state.modal.modalVisible);
  const id = dataModal?.id ?? null;

  const [form] = Form.useForm();

  const [loadding, setLoadding] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setLoadding(true);
      const res = await requestGET(`api/roles/${id}/permissions`);

      if (res) {
        form.setFieldsValue(res);
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

      const resRole = await requestPOST(`api/roles`, formData);

      if (resRole && resRole) {
        formData.roleId = resRole;
        const resPermissions = await requestPUT(`api/roles/${resRole}/permissions`, formData);
        if (resPermissions) {
          toast.success('Cập nhật thành công!');
          dispatch(actionsModal.setRandom());
          handleCancel();
        } else {
          toast.error('Thất bại, vui lòng thử lại!');
        }
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
                  <FormItem label='Tên' name='name' rules={[{required: true, message: 'Không được để trống!'}]}>
                    <Input placeholder='' />
                  </FormItem>
                </div>
                <div className='col-xl-12 col-lg-12'>
                  <FormItem label='Mô tả' name='description'>
                    <TextArea rows={4} placeholder='' />
                  </FormItem>
                </div>
              </div>
              <div className='row'>
                <Form.Item name='permissions' className='mb-0'>
                  <Checkbox.Group style={{width: '100%'}}>
                    <table className='table align-middle table-row-dashed fs-6 gy-5'>
                      <tbody className='text-gray-600 fw-bold'>
                        <tr>
                          <td className='text-gray-800'>Quản trị người dùng</td>

                          <td>
                            <div className='d-flex'>
                              <Checkbox value='Permissions.Users.Search'>Tìm kiếm</Checkbox>

                              <Checkbox value='Permissions.Users.View'>Xem</Checkbox>

                              <Checkbox value='Permissions.Users.Create'>Thêm</Checkbox>

                              <Checkbox value='Permissions.Users.Update'>Sửa</Checkbox>

                              <Checkbox value='Permissions.Users.Delete'>Xoá</Checkbox>
                            </div>
                          </td>
                        </tr>
                        <tr>
                          <td className='text-gray-800'>Quản trị danh mục chung</td>
                          <td>
                            <div className='d-flex'>
                              <Checkbox value='Permissions.Others.Search'>Tìm kiếm</Checkbox>

                              <Checkbox value='Permissions.Others.View'>Xem</Checkbox>

                              <Checkbox value='Permissions.Others.Create'>Thêm</Checkbox>

                              <Checkbox value='Permissions.Others.Update'>Sửa</Checkbox>

                              <Checkbox value='Permissions.Others.Delete'>Xoá</Checkbox>
                            </div>
                          </td>
                        </tr>
                        <tr>
                          <td className='text-gray-800'>Quản trị tuyển dụng</td>
                          <td>
                            <div className='d-flex'>
                              <Checkbox value='Permissions.Companies.Search'>Tìm kiếm</Checkbox>

                              <Checkbox value='Permissions.Companies.View'>Xem</Checkbox>

                              <Checkbox value='Permissions.Companies.Create'>Thêm</Checkbox>

                              <Checkbox value='Permissions.Companies.Update'>Sửa</Checkbox>

                              <Checkbox value='Permissions.Companies.Delete'>Xoá</Checkbox>
                            </div>
                          </td>
                        </tr>

                        <tr>
                          <td className='text-gray-800'>Quản trị địa điểm</td>
                          <td>
                            <div className='d-flex'>
                              <Checkbox value='Permissions.Places.Search'>Tìm kiếm</Checkbox>

                              <Checkbox value='Permissions.Places.View'>Xem</Checkbox>

                              <Checkbox value='Permissions.Places.Create'>Thêm</Checkbox>

                              <Checkbox value='Permissions.Places.Update'>Sửa</Checkbox>

                              <Checkbox value='Permissions.Places.Delete'>Xoá</Checkbox>
                            </div>
                          </td>
                        </tr>

                        <tr>
                          <td className='text-gray-800'>Quản trị giao thông</td>
                          <td>
                            <div className='d-flex'>
                              <Checkbox value='Permissions.Traffics.Search'>Tìm kiếm</Checkbox>

                              <Checkbox value='Permissions.Traffics.View'>Xem</Checkbox>

                              <Checkbox value='Permissions.Traffics.Create'>Thêm</Checkbox>

                              <Checkbox value='Permissions.Traffics.Update'>Sửa</Checkbox>

                              <Checkbox value='Permissions.Traffics.Delete'>Xoá</Checkbox>
                            </div>
                          </td>
                        </tr>
                        <tr>
                          <td className='text-gray-800'>Quản trị cung cầu</td>
                          <td>
                            <div className='d-flex'>
                              <Checkbox value='Permissions.Ecommerces.Search'>Tìm kiếm</Checkbox>

                              <Checkbox value='Permissions.Ecommerces.View'>Xem</Checkbox>

                              <Checkbox value='Permissions.Ecommerces.Create'>Thêm</Checkbox>

                              <Checkbox value='Permissions.Ecommerces.Update'>Sửa</Checkbox>

                              <Checkbox value='Permissions.Ecommerces.Delete'>Xoá</Checkbox>
                            </div>
                          </td>
                        </tr>
                        <tr>
                          <td className='text-gray-800'>Quản trị thị trường hàng hoá</td>
                          <td>
                            <div className='d-flex'>
                              <Checkbox value='Permissions.Markets.Search'>Tìm kiếm</Checkbox>

                              <Checkbox value='Permissions.Markets.View'>Xem</Checkbox>

                              <Checkbox value='Permissions.Markets.Create'>Thêm</Checkbox>

                              <Checkbox value='Permissions.Markets.Update'>Sửa</Checkbox>

                              <Checkbox value='Permissions.Markets.Delete'>Xoá</Checkbox>
                            </div>
                          </td>
                        </tr>
                        <tr>
                          <td className='text-gray-800'>Quản trị tổng đài thông minh</td>
                          <td>
                            <div className='d-flex'>
                              <Checkbox value='Permissions.Hotlines.Search'>Tìm kiếm</Checkbox>

                              <Checkbox value='Permissions.Hotlines.View'>Xem</Checkbox>

                              <Checkbox value='Permissions.Hotlines.Create'>Thêm</Checkbox>

                              <Checkbox value='Permissions.Hotlines.Update'>Sửa</Checkbox>

                              <Checkbox value='Permissions.Hotlines.Delete'>Xoá</Checkbox>
                            </div>
                          </td>
                        </tr>
                      </tbody>
                      {/*end::Table body*/}
                    </table>
                  </Checkbox.Group>
                </Form.Item>
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
