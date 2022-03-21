/* eslint-disable jsx-a11y/anchor-is-valid */
import React, {useState, useEffect, useRef} from 'react';
import {shallowEqual, useSelector, useDispatch} from 'react-redux';

import {Form, Input, Select, Spin, Table, Popconfirm, Typography, InputNumber} from 'antd';
import {Modal, Button} from 'react-bootstrap';
import {toast} from 'react-toastify';

import * as actionsModal from 'src/setup/redux/modal/Actions';
import {requestPOST, requestGET, requestPUT, requestDELETE} from 'src/utils/baseAPI';

const {Option} = Select;
const {Text} = Typography;

const EditableCell = ({dataAttributes, editing, dataAtt, dataIndex, title, inputType, record, index, children, ...restProps}) => {
  const inputNode =
    inputType === 'select' ? (
      <Select showSearch filterOption={(input, option) => option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0} style={{width: '100%'}}>
        {(dataAttributes || []).map((item, index) => {
          return (
            <Option key={item.id} value={item.id}>
              {item.displayName}
            </Option>
          );
        })}
      </Select>
    ) : inputType === 'number' ? (
      <InputNumber style={{width: '100%'}} />
    ) : (
      <Input />
    );
  return (
    <td {...restProps}>
      {editing ? (
        <Form.Item
          name={dataIndex}
          style={{
            margin: 0,
          }}
          rules={[
            {
              required: true,
              message: `Nhập ${title}!`,
            },
          ]}
        >
          {inputNode}
        </Form.Item>
      ) : (
        children
      )}
    </td>
  );
};

const ModalItem = (props) => {
  const dispatch = useDispatch();

  const dataModal = useSelector((state) => state.modal.dataModal);
  const modalVisible = useSelector((state) => state.modal.modalCategoryAttributeVisible);
  const id = dataModal?.id ?? null;

  const [form] = Form.useForm();

  const [loadding, setLoadding] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [editingKey, setEditingKey] = useState(undefined);
  const [data, setData] = useState([]);
  const [random, setRandom] = useState(0);

  const isEditing = (record) => record.id === editingKey;

  const [dataAttributes, setDataAttributes] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const res = await requestPOST(`api/v1/attributes/search`, {
        pageNumber: 1,
        pageSize: 1000,
        orderBy: ['displayName'],
      });
      if (res && res.data) setDataAttributes(res.data);
    };
    fetchData();
    return () => {};
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      setLoadding(true);
      const res = await requestPOST(`api/v1/ecommercecategories/${id}/Attributes/search`, {
        pageNumber: 1,
        pageSize: 1000,
        orderBy: ['position'],
        vehicleId: id,
      });
      setData(res?.data ?? []);

      setLoadding(false);
    };
    if (id) {
      fetchData();
    }
    return () => {};
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id, random]);

  const handleCancel = () => {
    form.resetFields();
    /*  props.setDataModal(null);
    props.setModalVisible(false); */
    dispatch(actionsModal.setModalCategoryAttributeVisible(false));
  };
  const handleDelete = async (item) => {
    var res = await requestDELETE(`api/v1/ecommercecategories/${id}/Attributes/${item.id}`);
    if (res) {
      toast.success('Thao tác thành công!');
      setRandom(Math.random());
      setEditingKey(undefined)
    } else {
      toast.error('Thất bại, vui lòng thử lại!');
    }
  };
  const handleCheck = async () => {
    form.validateFields();

    var formData = form.getFieldsValue();

    console.log(formData);

    const res = editingKey
      ? await requestPUT(`api/v1/ecommercecategories/${id}/Attributes/${editingKey}`, formData)
      : await requestPOST(`api/v1/ecommercecategories/${id}/Attributes`, formData);
    if (res) {
      toast.success('Cập nhật thành công!');
      setRandom(Math.random());
      setEditingKey(undefined)
    } else {
      toast.error('Thất bại, vui lòng thử lại!');
    }

    /*  if (isEdit) {
      handleSave(formData);
    } else {
      handlePost(formData);
    } */
  };

  const handleAdd = () => {
    setIsEdit(false);
    const newData = {
      id: null,
      position: 1,
      attributeId: null,
    };
    setData([...data, newData]);
    form.setFieldsValue({
      attributeId: null,
      position: 1,
    });
    setEditingKey(null);
  };
  const edit = (record) => {
    console.log(record);
    form.setFieldsValue({
      ...record,
    });
    setEditingKey(record.id);
  };

  const cancel = () => {
    if (!isEdit) {
      var newData = [...data];
      newData.pop();
      setData(newData);
    }
    setEditingKey(undefined);
    setIsEdit(false);
  };

  const columnsAtt = [
    {
      title: 'STT',
      key: 'key',
      render: (text, record, index) => {
        return <Text style={{}}>{index + 1}</Text>;
      },
      width: '2%',
    },
    {
      title: 'Tên thuộc tính',
      dataIndex: 'attributeId',
      key: 'attributeId',
      editable: true,
      render: (text, record) => {
        return <p style={{}}>{record?.attribute?.displayName ?? ''}</p>;
      },
    },
    {
      title: 'Vị trí',
      dataIndex: 'position',
      key: 'position',
      editable: true,
    },
    {
      title: 'Thao tác',
      dataIndex: '',
      key: '',
      width: '15%',
      render: (text, record) => {
        const editable = isEditing(record);
        if (editable) {
          return (
            <div style={{display: 'flex', flexDirection: 'row'}}>
              <a
                className='btn btn-icon btn-bg-light btn-active-color-primary btn-sm me-1 mb-1'
                data-toggle='m-tooltip'
                title='Lưu'
                onClick={() => {
                  handleCheck();
                }}
              >
                <i className='fa fa-save'></i>
              </a>
              <Popconfirm
                title='Huỷ thao tác?'
                onConfirm={() => {
                  cancel();
                }}
                okText='Ok'
                cancelText='Huỷ'
              >
                <a className='btn btn-icon btn-bg-light btn-active-color-danger btn-sm me-1 mb-1' data-toggle='m-tooltip' title='Xoá'>
                  <i className='fa fa-times'></i>
                </a>
              </Popconfirm>
            </div>
          );
        } else {
          return (
            <div style={{display: 'flex', flexDirection: 'row'}}>
              <a
                className='btn btn-icon btn-bg-light btn-active-color-primary btn-sm me-1 mb-1'
                data-toggle='m-tooltip'
                title='Chỉnh sửa'
                onClick={() => {
                  setIsEdit(true);
                  edit(record);
                }}
              >
                <i className='fa fa-edit'></i>
              </a>
              <Popconfirm
                title='Xoá?'
                onConfirm={() => {
                  handleDelete(record);
                }}
                okText='Xoá'
                cancelText='Huỷ'
              >
                <a className='btn btn-icon btn-bg-light btn-active-color-primary btn-sm me-1 mb-1' data-toggle='m-tooltip'>
                  <i className='fa fa-trash'></i>
                </a>
              </Popconfirm>
            </div>
          );
        }
      },
    },
  ];
  const columns = columnsAtt.map((col) => {
    if (!col.editable) {
      return col;
    }

    return {
      ...col,
      onCell: (record) => ({
        record,
        inputType: col.dataIndex === 'position' ? 'number' : 'select',
        dataIndex: col.dataIndex,
        title: col.title,
        editing: isEditing(record),
        dataAttributes: dataAttributes,
      }),
    };
  });

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
            <>
              <button className='btn btn-primary btn-sm m-btn m-btn--icon py-2 me-2 mb-2' onClick={handleAdd}>
                <span>
                  <i className='fas fa-plus'></i>
                  <span className=''>Thêm mới</span>
                </span>
              </button>
              <Form form={form} component={false}>
                <Table
                  components={{
                    body: {
                      cell: EditableCell,
                    },
                  }}
                  rowClassName={() => 'editable-row'}
                  bordered
                  dataSource={data}
                  columns={columns}
                  pagination={false}
                  rowKey={Math.random().toString(32)}
                />
              </Form>
            </>
          )}
        </Spin>
      </Modal.Body>
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
