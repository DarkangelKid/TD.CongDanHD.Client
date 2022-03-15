import axios from 'axios';

export const API_URL = process.env.REACT_APP_API_URL;
export const GATEWAY_URL = process.env.REACT_APP_GATEWAY_URL;
export const GATEWAY_TOKEN = process.env.REACT_APP_GATEWAY_TOKEN;

export const HOST_API = `${API_URL}/api/v1/`;
export const FILE_URL = `${process.env.REACT_APP_FILE_URL}/`;

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
