import React, {useState, useEffect} from 'react';
import {Upload, Modal} from 'antd';

const {Dragger} = Upload;

const ImageUpload = (props) => {
  const {URL, fileList, onChange, headers, multiple, disabled} = props;

  const handlePreview = async (file) => {
    if (file.url) {
      window.open(file.url, '_blank');
    }
  };

  return (
    <>
      <Dragger
        multiple={multiple}
        name='files'
        action={`${URL}`}
        listType='text'
        fileList={fileList}
        onPreview={handlePreview}
        onChange={onChange}
        headers={headers}
      >
        {(!!multiple || (fileList && fileList.length < 1)) && !disabled && (
          <div>
            <p className='ant-upload-text'>Thả tệp tin hoặc nhấp chuột để tải lên</p>
            <p className='ant-upload-hint'>Đính kèm</p>
          </div>
        )}
      </Dragger>
    </>
  );
};

export default ImageUpload;
