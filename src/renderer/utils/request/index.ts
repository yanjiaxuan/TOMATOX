import axios from 'axios';

const instance = axios.create({
    baseURL: '/',
    timeout: 5000
})

//添加拦截
instance.interceptors.request.use(config => {
    return config
},error => {

})

instance.interceptors.response.use(res => {
    return res.data
},error => {
    return error;
})




export default instance;