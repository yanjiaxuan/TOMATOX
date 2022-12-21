import request from '@renderer/utils/request'
import { IPTV_ORIGIN_URL } from '../../utils/constant'

export function queryIptvResource(): Promise<IIptvGroup[]> {
  return request({
    method: 'get',
    url: IPTV_ORIGIN_URL
  })
}
