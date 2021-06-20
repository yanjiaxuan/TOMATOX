import { TABLES } from '@/utils/constants';

export function filterResources(resources: any[]) {
    return resources.map(res => filterResource(res));
}

export function filterResource(resource: any): IplayResource {
    return {
        id: resource.id,
        type: resource.type,
        picture: resource.pic,
        lang: resource.lang,
        name: resource.name,
        director: resource.director,
        describe: resource.des,
        area: resource.area,
        actor: resource.actor,
        class: '',
        doubanId: '',
        doubanScore: '',
        origin: '',
        remark: resource.note,
        tag: '',
        year: resource.year,
        updateTime: resource.last,
        playList: filterPlayList(resource.dl.dd.text)
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
