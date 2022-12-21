import request from '@renderer/utils/request'
import parseXML from '@renderer/utils/xml-util'
import { convertResources } from '@renderer/utils/resource-converter'
import { message } from 'antd'
import { RESOURCE_ORIGIN_URL } from '../../utils/constant'
import store from '../../store'

export function queryResourceSites(): Promise<IResConfig[]> {
  return request({ method: 'get', url: RESOURCE_ORIGIN_URL })
}

export async function queryResources(params: IResQueryParams): Promise<IResPageInfo> {
  const { curResourceSite } = store
  const result: IResPageInfo = {
    limit: 10,
    list: [],
    page: 1,
    pageCount: 0,
    total: 0
  }
  const responseXML = await request<string, string>({
    method: 'get',
    url: curResourceSite,
    params
  })
  if (responseXML) {
    try {
      const resources: IPlayResource[] = []
      const parseJson = parseXML(responseXML) as IXMLResParseResultWrapper | IXMLResParseResult
      const jsonData: IXMLResParseResult = 'rss' in parseJson ? parseJson.rss : parseJson
      if (jsonData.list && jsonData.list.video) {
        const videoList =
          jsonData.list.video instanceof Array ? jsonData.list.video : [jsonData.list.video]
        resources.push(...convertResources(videoList))
      }
      result.limit = jsonData.list?.pagesize || result.limit
      result.list = resources
      result.page = jsonData.list?.page || result.page
      result.pageCount = jsonData.list?.pagecount || result.pageCount
      result.total = jsonData.list?.recordcount || result.total
    } catch (e) {
      message.error('资源加载失败')
    }
  }
  return result
}

export async function queryResTypes(resUrl: string): Promise<{ id: string; text: string }[]> {
  const { curResourceSite } = store
  const responseXML = await request<string, string>({
    method: 'get',
    url: resUrl || curResourceSite
  })
  if (responseXML) {
    try {
      const parseJson = parseXML(responseXML) as IXMLResParseResultWrapper | IXMLResParseResult
      const jsonData = 'rss' in parseJson ? parseJson.rss : parseJson
      return jsonData.class.ty || []
    } catch (e) {
      message.error('资源类型加载失败')
    }
  }
  return []
}
