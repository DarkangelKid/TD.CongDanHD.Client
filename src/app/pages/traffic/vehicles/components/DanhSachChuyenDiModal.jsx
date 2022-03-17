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
  const modalVisible = useSelector((state) => state.modal.modalDanhSachChuyenDiVisible);

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

  const handleCancel = () => {
    form.resetFields();
    /*  props.setDataModal(null);
    props.setModalVisible(false); */
    dispatch(actionsModal.setModalDanhSachChuyenDiVisible(false));
  };

  return (
    <Modal show={modalVisible} fullscreen onExited={handleCancel} keyboard={true} scrollable={true} onEscapeKeyDown={handleCancel}>
      <Modal.Header className='bg-primary px-4 py-3'>
        <Modal.Title className='text-white'>Danh sách chuyến xe</Modal.Title>
        <button type='button' className='btn-close btn-close-white' aria-label='Close' onClick={handleCancel}></button>
      </Modal.Header>
      <Modal.Body></Modal.Body>
      <Modal.Footer className='bg-light px-4 py-2 align-items-center'>
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
