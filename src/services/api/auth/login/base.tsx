/* eslint-disable no-alert */
import {loginType} from '../../../../constants/types/auth/auth';
import apiClient from '../../base';

export const LoginUser = async ({username, password}: loginType) => {
  try {
    const response = await apiClient.post('/login', {
      username,
      password,
    });
    console.log(response);
    return response.data;
  } catch (error) {
    alert(JSON.stringify(error));
    console.log(error);
  }
};
