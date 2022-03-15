import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL;
const GATEWAY_URL = process.env.REACT_APP_GATEWAY_URL;
const GATEWAY_TOKEN = process.env.REACT_APP_GATEWAY_TOKEN;

export const requestGET = async (URL) => {
  try {
    const res = await axios({
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      url: `${API_URL}/${URL}`,
    });
    return res.data;
  } catch (error) {
    return null;
  }
};

export const requestPOST = async (URL, data) => {
  try {
    const res = await axios({
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      url: `${API_URL}/${URL}`,
      data,
    });

    return res.data;
  } catch (error) {
    return null;
  }
};
export const requestPUT = async (URL, data) => {
  try {
    const res = await axios({
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      url: `${API_URL}/${URL}`,
      data,
    });

    return res.data;
  } catch (error) {
    return null;
  }
};

export const requestDELETE = async (URL) => {
  try {
    const res = await axios({
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
      url: `${API_URL}/${URL}`,
    });

    return res.data;
  } catch (error) {
    return null;
  }
};
