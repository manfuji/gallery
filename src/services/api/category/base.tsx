import apiClient from '../base';

export const category = async () => {
  try {
    const response = await apiClient.get('/categories');
    return response.data;
  } catch (error) {
    console.log(error);
  }
};
