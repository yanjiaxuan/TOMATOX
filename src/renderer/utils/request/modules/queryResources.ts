import store from '@/utils/store';
import Req from '../index';

/** ac=videolist 默认，查询结果带播放列表
 *  t 分类
 *  pg 页码
 *  ids 资源id
 *  wd 关键字
 */

export function queryResources(curPage: number, type?: string, keyWord?: string): any {
    return Req({
        method: 'get',
        url: store.getState('SITE_ADDRESS').api,
        params: {
            ac: 'videolist',
            pg: curPage,
            t: type,
            wd: keyWord
        }
    });
}
