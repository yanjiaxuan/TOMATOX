import request from '@renderer/utils/request'
import { IPTV_ORIGIN_URL } from '@renderer/utils/constant'

export function queryIptvResource(): any {
  return request({
    method: 'get',
    url: IPTV_ORIGIN_URL
  })
}
