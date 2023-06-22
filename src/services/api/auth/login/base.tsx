/* eslint-disable no-alert */
import {loginType} from '../../../../constants/types/auth/auth';
import {showAlert} from '../../../../hooks/toastMesasage';
import apiClient from '../../base';

export const LoginUser = async ({username, password}: loginType) => {
  try {
    const response = await apiClient.post('/login', {
      username,
      password,
    });
    console.log(response);
    showAlert({title: 'Login', message: 'Login successful'});
    return response.data;
  } catch (error) {
    // alert(JSON.stringify(error));

    showAlert({title: 'Login', message: 'Invalid credentials'});
    throw new Error('Invalid credentials');

    // console.log(error);
  }
};
