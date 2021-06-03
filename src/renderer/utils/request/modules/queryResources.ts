import store from '@/utils/store';
import Req from '../index';

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
    return Req({
        method: 'get',
        url: store.getState('SITE_ADDRESS').api,
        params: {
            ac: 'videolist',
            pg: curPage,
            t: type,
            wd: keyWord,
            h: lastUpdate
        }
    });
}

export function queryTypes() {
    return Req({
        method: 'get',
        url: store.getState('SITE_ADDRESS').api
    });
}
