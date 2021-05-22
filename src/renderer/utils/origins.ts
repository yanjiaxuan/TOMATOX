import store from '@/utils/store';
import request from './request/index'
import {ORIGIN_URL} from "./constants";

const origins: Iorigin[] = []
request({
    method: 'get',
    url: ORIGIN_URL
}).then(res => {
    const result = res as unknown as Iorigin[]
    origins.push(...result.filter(item => item.isActive))
    store.setState('ORIGIN_LIST', origins)
    store.setState('SITE_ADDRESS', origins[0])
})