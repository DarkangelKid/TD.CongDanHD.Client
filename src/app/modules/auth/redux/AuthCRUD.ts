import axios from 'axios';
import {UserModel} from '../models/UserModel';
import {PermissionsModel} from '../models/PermissionsModel';

const API_URL = process.env.REACT_APP_API_URL;
const GATEWAY_URL = process.env.REACT_APP_GATEWAY_URL;
const GATEWAY_TOKEN = process.env.REACT_APP_GATEWAY_TOKEN;

export const GET_USER_BY_URL = `${API_URL}/api/personal/profile`;
export const GET_PERMISSIONS_BY_URL = `${API_URL}/api/personal/permissions`;
export const LOGIN_URL = `${API_URL}/api/tokens`;
export const REGISTER_URL = `${API_URL}/register`;
export const REQUEST_PASSWORD_URL = `${API_URL}/api/users/forgot-password`;

// Server should return AuthModel
export function login(userName: string, password: string) {
  return axios.post(
    LOGIN_URL,
    {
      userName,
      password,
    },
    {headers: {tenant: 'root', 'Content-Type': 'application/json', Accept: 'application/json'}}
  );
}

// Server should return AuthModel
export function register(
  email: string,
  firstname: string,
  lastname: string,
  password: string,
  password_confirmation: string
) {
  return axios.post(REGISTER_URL, {
    email,
    first_name: firstname,
    last_name: lastname,
    password,
    password_confirmation,
  });
}

// Server should return object => { result: boolean } (Is Email in DB)
export function requestPassword(email: string) {
  return axios.post<{result: string}>(
    REQUEST_PASSWORD_URL,
    {
      email,
    },
    {headers: {tenant: 'root', 'Content-Type': 'application/json', Accept: 'application/json'}}
  );
}

export function getUserByToken() {
  return axios.get<UserModel>(GET_USER_BY_URL);
}

export function getCurrentPermissions() {
  return axios.get<PermissionsModel>(GET_PERMISSIONS_BY_URL);
}
