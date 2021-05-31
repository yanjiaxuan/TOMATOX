import { TABLES } from '@/utils/constants';

export function filterResources(resources: any[]) {
    return resources.map(res => filterResource(res));
}

export function filterResource(resource: any): IplayResource {
    return {
        id: resource.vod_id,
        type: resource.type_name,
        picture: resource.vod_pic,
        lang: resource.vod_lang,
        name: resource.vod_name,
        director: resource.vod_director,
        describe: resource.vod_blurb,
        area: resource.vod_area,
        actor: resource.vod_actor,
        class: resource.vod_class,
        doubanId: resource.vod_douban_id,
        doubanScore: resource.vod_douban_score,
        origin: resource.vod_play_from,
        remark: resource.vod_remarks,
        tag: resource.vod_tag,
        year: resource.vod_year,
        updateTime: resource.vod_time,
        playList: filterPlayList(resource.vod_play_url)
    };
}

function filterPlayList(listStr: string) {
    const list = new Map<string, string>();
    const splitLists = listStr.split('$$$').filter(val => val.includes('.m3u'));
    if (splitLists.length) {
        splitLists[0].split('#').forEach(item => {
            const [key, val] = item.split('$');
            key && val && list.set(key, val);
        });
    }
    return list;
}

export function cleanResourceData(dataType: string, data: IplayResource): IplayResource {
    const optData: IplayResource = {
        id: data.id,
        type: data.type,
        picture: data.picture,
        lang: data.lang,
        name: data.name,
        director: data.director,
        describe: data.describe,
        area: data.area,
        actor: data.actor,
        class: data.class,
        doubanId: data.doubanId,
        doubanScore: data.doubanScore,
        origin: data.origin,
        remark: data.remark,
        tag: data.tag,
        year: data.year,
        updateTime: data.updateTime,
        playList: data.playList
    };
    if (dataType === TABLES.TABLE_HISTORY) {
        optData.historyOption = data.historyOption;
    } else if (dataType === TABLES.TABLE_COLLECT) {
        optData.collectOption = data.collectOption;
    }
    return optData;
}
