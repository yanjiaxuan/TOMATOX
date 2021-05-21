import request from './request/index'
import {ORIGIN_URL} from "./constants";

declare interface IORIGIN {
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

const origins: IORIGIN[] = []

request({
    method: 'get',
    url: ORIGIN_URL
}).then(res => {
    // @ts-ignore
    origins.push(...res)
})

export default origins