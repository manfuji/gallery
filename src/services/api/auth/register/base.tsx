import {registerType} from '../../../../constants/types/auth/auth';
import {showAlert} from '../../../../hooks/toastMesasage';
import apiClient from '../../base';

export const RegisterUser = async ({
  username,
  email,
  password,
}: registerType) => {
  try {
    const response = await apiClient.post('/register', {
      username,
      email,
      password,
    });
    // console.log(response);
    showAlert({title: 'Register', message: 'Registration successful'});
    return response.data;
  } catch (error: any) {
    showAlert({
      title: 'Register',
      message: 'Registration failed try again in a minute',
    });

    console.log(JSON.stringify(error));
  }
};
