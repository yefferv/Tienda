import { Experimental_CssVarsProvider } from "@mui/material";
import axios from "axios";


const AxiosClient = axios.create({
    baseURL: import.meta.env.VITE_API_URL ,
    headers: {'X-Custom-Header': 'foobar'}
  });


  AxiosClient.interceptors.request.use(function (config) {
    return config;
  }, function (error) {
    return Promise.reject(error);
  });

AxiosClient.interceptors.response.use(function (response) {
    return response;
  }, function (error) {
    return Promise.reject(error);
  });

  export default AxiosClient;