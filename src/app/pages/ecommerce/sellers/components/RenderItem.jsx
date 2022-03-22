import React, {useState, useEffect} from 'react';
import {Input, Select} from 'antd';

const {Option} = Select;

const RenderItem = (props) => {
  const {item, initValue, handleChangeValue} = props;
  const [data, setData] = useState([]);
  /*  useEffect(() => {
    const fetchData = async () => {
      var res = await requestGET(`${HOST_API}/Attribute/${item?.id}/Values`);
      if (res && res.succeeded && res.data) {
        setData(res.data);
      }
    };
    if (item?.id) {
      fetchData();
    }
    return () => {};
  }, [item]); */
  const onChangeValue = (val) => {
    var value = '';
    if (item?.inputType == 'Multiselect' && val.length > 0) {
      var temp = [];
      val.map((i) => {
        temp.push(data.find((_i) => _i.id == i));
      });
      value = JSON.stringify(temp);
    }
    if (item?.inputType == 'Select') {
      value = JSON.stringify(data.find((_i) => _i.id == val));
    }
    handleChangeValue(item.code, value);
  };
  console.log(initValue);
  return (
    <Select
      showSearch
      defaultValue={initValue}
      mode={item?.inputType == 'Multiselect' ? 'multiple' : null}
      placeholder={item?.name}
      filterOption={(input, option) => option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
      onChange={(val) => onChangeValue(val)}
    >
      {data.length > 0 &&
        data.map((_item) => {
          return (
            <Option key={_item.id} value={_item.id}>
              {_item.value}
            </Option>
          );
        })}
    </Select>
  );
};
export default RenderItem;
