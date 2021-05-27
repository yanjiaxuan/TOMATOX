import axios from 'axios';
import { message } from 'antd';

const TIMEOUT = 20000;
const instance = axios.create({
    baseURL: '/',
    timeout: TIMEOUT
});

// 重试次数，共请求2次
// @ts-ignore
instance.defaults.retry = 1;

// 请求的间隙
// @ts-ignore
instance.defaults.retryDelay = 1000;

// 使用请求拦截器动态调整超时
instance.interceptors.request.use(
    config => {
        // @ts-ignore
        if (config.__retryCount === undefined) {
            config.timeout = TIMEOUT;
        } else {
            // @ts-ignore
            config.timeout = TIMEOUT * (config.__retryCount + 1);
        }
        return config;
    },
    err => {
        return Promise.reject(err);
    }
);

// 添加响应拦截器
instance.interceptors.response.use(
    ({ data }) => {
        return data;
    },
    err => {
        // 请求错误时做些事
        // 请求超时的之后，抛出 err.code = ECONNABORTED的错误..错误信息是 timeout of  xxx ms exceeded
        if (err.code === 'ECONNABORTED' && err.message.indexOf('timeout') !== -1) {
            const { config } = err;
            config.__retryCount = config.__retryCount || 0;

            if (config.__retryCount >= config.retry) {
                err.message = '多次请求均超时';
                return Promise.reject(err);
            }

            config.__retryCount += 1;

            const backoff = new Promise(resolve => {
                setTimeout(() => {
                    resolve(undefined);
                }, config.retryDelay || 1);
            });

            return backoff.then(() => {
                return axios(config);
            });
        }
        if (err && !err.response) {
            err.message = '连接服务器失败!';
        }
        return Promise.reject(err);
    }
);

export default instance;
