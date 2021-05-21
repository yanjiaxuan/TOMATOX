import store from '@/utils/store';
import request from './request/index'
import {ORIGIN_URL} from "./constants";

declare interface Iorigin {
    id: string,
    key: string,
    name: string,
    api: string,
    download: string,
    group: string,
    isActive: boolean,
    jiexiUrl: string,
    status: string
}

const origins: Iorigin[] = []
request({
    method: 'get',
    url: ORIGIN_URL
}).then(res => {
    const result = res as unknown as Iorigin[]
    origins.push(...result.filter(item => item.isActive))
    store.setState('ORIGIN_LIST', origins)
})