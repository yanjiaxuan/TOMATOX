import store from '@/utils/store';
import Req from '../index';
import xmlParser from '@/utils/xmlParser';
import { filterResources } from '@/utils/filterResources';
import { message } from 'antd';

// ac：模式（videolist或detail详细模式），为空＝列表标准模式
// ids: 影片id，多个使用,隔开
// t: 类型
// h：最近多少小时内
// pg: 页数
// wd：搜索like
// at：输出格式，可选xml
export function queryResources(
    curPage: number,
    type?: number,
    keyWord?: string,
    lastUpdate?: number
): any {
    return new Promise(resolve => {
        Req({
            method: 'get',
            url: store.getState('SITE_ADDRESS').api,
            params: {
                ac: 'videolist',
                pg: curPage,
                t: type,
                wd: keyWord,
                h: lastUpdate
            }
        }).then(xmlData => {
            if (!xmlData) {
                resolve(xmlData);
                return;
            }
            try {
                const result: IplayResource[] = [];
                const parseJson = xmlParser((xmlData as unknown) as string);
                const jsonData = parseJson.rss ? parseJson.rss : parseJson;
                if (jsonData.list && jsonData.list.video) {
                    const videoList =
                        jsonData.list.video instanceof Array
                            ? jsonData.list.video
                            : [jsonData.list.video];
                    result.push(...filterResources(videoList));
                }
                resolve({
                    limit: jsonData.list.pagesize,
                    list: result,
                    page: jsonData.list.page,
                    pagecount: jsonData.list.pagecount,
                    total: jsonData.list.recordcount
                });
            } catch (e) {
                message.error(e);
                resolve(null);
            }
        });
    });
}

export function queryTypes() {
    return new Promise(resolve => {
        Req({
            method: 'get',
            url: store.getState('SITE_ADDRESS').api
        }).then(res => {
            if (!res) {
                resolve(res);
                return;
            }
            try {
                const parseJson = xmlParser((res as unknown) as string);
                const jsonData = parseJson.rss ? parseJson.rss : parseJson;
                resolve(jsonData.class.ty || []);
            } catch (e) {
                message.error(e);
                resolve([]);
            }
        });
    });
}
