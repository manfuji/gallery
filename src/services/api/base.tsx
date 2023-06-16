import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

const baseUrl = 'https://trustfaith.pythonanywhere.com/api';

const getToken = async () => {
  try {
    const user = await AsyncStorage.getItem('user');
    const serializedUser = JSON.parse(user ?? '');
    const token = serializedUser.token;
    return token;
  } catch (error) {
    throw error;
  }
};

const apiClient = axios.create({
  timeout: 5000,
  baseURL: baseUrl,
  headers: {
    'Content-Type': 'application/json',
  },
});

const apiClientForm = axios.create({
  timeout: 5000,
  baseURL: baseUrl,
  headers: {
    'Content-Type': 'multipart/form-data',
  },
});

export default apiClient;

// Add an interceptor to set the Authorization header dynamically before each request
apiClientForm.interceptors.request.use(async (config) => {
  try {
    const token = await getToken();
    console.log(token);
    if (token) {
      config.headers.Authorization = `token ${token}`;
    }
    return config;
  } catch (error) {
    throw error;
  }
});

export {apiClientForm};
