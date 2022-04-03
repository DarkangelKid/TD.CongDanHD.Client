import _ from 'lodash';
/* eslint no-useless-escape:0 import/prefer-default-export:0 */

const reg =
  /(((^https?:(?:\/\/)?)(?:[-;:&=\+\$,\w]+@)?[A-Za-z0-9.-]+(?::\d+)?|(?:www.|[-;:&=\+\$,\w]+@)[A-Za-z0-9.-]+)((?:\/[\+~%\/.\w-_]*)?\??(?:[-\+=&;%@.\w_]*)#?(?:[\w]*))?)$/;
export const isUrl = (path) => reg.test(path);

export const getPageQuery = () => URLSearchParams(window.location.href.split('?')[1]);

export const handleImage = (values, URL) => {
  const arr = _.without(_.split(values, '##'), '');
  let res = [];
  arr.forEach((i) => {
    res.push({
      url: !(i.includes('https://') || i.includes('http://')) ? URL + i : i,
      path: i,
      name: i.substring(i.lastIndexOf('/') + 1),
    });
  });
  return res;
};

export const convertImage = (array) => {
  var temp = [];
  array.forEach((element) => {
    temp = _.concat(temp, element?.response?.data[0]?.url ?? element.path);
  });
  var res = _.uniq(temp).join('##');
  return res;
};

export const getBase64 = (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });
};
