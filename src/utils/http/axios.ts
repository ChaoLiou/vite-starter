import axios from 'axios';
import type { AxiosInstance, AxiosRequestTransformer } from 'axios';
import { v4 as uuid } from 'uuid';

export const createHttp = (baseURL: string) =>
  axios.create({
    baseURL,
    headers: {
      'Content-type': 'application/json',
      Authorization: `Bearer ${localStorage.getItem('token') ?? ''}`,
    },
    transformRequest: [
      (data, headers) => {
        if (headers) {
          // eslint-disable-next-line no-param-reassign
          headers['trace-id'] = uuid();
        }
        return data;
      },
      ...(axios.defaults.transformRequest as AxiosRequestTransformer[]),
    ],
  });

const baseURL = processEnv.VUE_APP_BACKEND_API;
const apiClient: AxiosInstance = createHttp(baseURL);
const mockApiClient: AxiosInstance = createHttp('http://localhost:3000/api/v1/');

apiClient.interceptors.response.use(
  (response) => response,
  () => {},
);

export default import.meta.env.VITE_ENABLE_MOCK_SERVER === 'yes' ? mockApiClient : apiClient;

export { apiClient, mockApiClient };
