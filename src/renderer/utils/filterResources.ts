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
        playList: filterPlayList(resource.vod_play_url)
    };
}

function filterPlayList(listStr: string) {
    const list = new Map<string, string>();
    listStr.split('#').forEach(item => {
        const [key, val] = item.split('$');
        key && val && list.set(key, val);
    });
    return list;
}
