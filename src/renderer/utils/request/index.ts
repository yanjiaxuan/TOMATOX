import axios from 'axios';
import { message } from 'antd';

const instance = axios.create({
    baseURL: '/',
    timeout: 10000
});

instance.interceptors.request.use(
    config => {
        return config;
    },
    err => {
        message.error(err);
        return Promise.reject(err);
    }
);

// 添加响应拦截器
instance.interceptors.response.use(
    ({ data }) => {
        return data;
    },
    err => {
        message.error(err.message);
        return null;
    }
);

export default instance;
