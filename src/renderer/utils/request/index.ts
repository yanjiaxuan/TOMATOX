import axios from 'axios';
import { message } from 'antd';

const instance = axios.create({
    baseURL: '/',
    timeout: 5000
});

// 添加拦截
instance.interceptors.request.use(
    config => {
        return config;
    },
    error => {
        message.error(error);
    }
);

instance.interceptors.response.use(
    res => {
        return res.data;
    },
    error => {
        return error;
    }
);

export default instance;
