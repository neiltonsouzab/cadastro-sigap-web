import { useHistory } from 'react-router-dom';
import { AxiosInstance } from 'axios';

import { useToast } from './toast';

import axios from 'axios';
import { useEffect } from 'react';

const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
});

const useAPI = (): AxiosInstance => {
  const history = useHistory();
  const { addToast } = useToast();

  useEffect(() => {
    api.interceptors.response.use(
      (response) => response,
      (error) => {
        const errorResponse = error.response;

        if (errorResponse.status === 404) {
          history.push('/404');
        } else if (errorResponse.status === 403) {
          history.push('/403');
        } else if (errorResponse.status === 400) {
          addToast({
            type: 'error',
            title: 'Algo de errado aconteceu!',
            description: errorResponse.data.message as string,
          });
        } else {
          addToast({
            type: 'error',
            title: 'Algo de errado aconteceu!',
            description:
              'Não conseguimos processar sua requisição, tente novamente.',
          });
        }

        return Promise.reject(error);
      },
    );
  }, [addToast, history]);

  return api;
};

export default useAPI;
