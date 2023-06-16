import {apiClientForm} from '../base';
interface IBody {
  body: FormData;
}
export const createProducts = async ({body}: IBody) => {
  console.log('-----------------------------------', body);
  try {
    const response = await apiClientForm.post('/product/', body);
    return response.data;
  } catch (error) {
    console.log(JSON.stringify(error));
  }
};
