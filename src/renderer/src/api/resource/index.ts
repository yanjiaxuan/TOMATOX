import request from '@renderer/utils/request'
import parseXML from '@renderer/utils/xml-util'
import { convertResources } from '@renderer/utils/resource-converter'
import { message } from 'antd'
import { RESOURCE_ORIGIN_URL } from '../../utils/constant'

export async function queryResources(params: IResQueryParams): Promise<IResPageInfo> {
  const result: IResPageInfo = {
    limit: 10,
    list: [],
    page: 1,
    pageCount: 0,
    total: 0
  }
  const responseXML = await request<string, string>({
    method: 'get',
    url: RESOURCE_ORIGIN_URL,
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
      message.error((e as Error).message)
    }
  }
  return result
}

export async function queryTypes(): Promise<string[]> {
  const responseXML = await request<string, string>({ method: 'get', url: RESOURCE_ORIGIN_URL })
  if (responseXML) {
    try {
      const parseJson = parseXML(responseXML) as IXMLResParseResultWrapper | IXMLResParseResult
      const jsonData = 'rss' in parseJson ? parseJson.rss : parseJson
      return jsonData.class.ty || []
    } catch (e) {
      message.error((e as Error).message)
    }
  }
  return []
}
