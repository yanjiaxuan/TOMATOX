export function convertResources(resources: IPlayResOri[]): IPlayResource[] {
  return resources.map((res) => convertResource(res))
}

export function convertResource(resource: IPlayResOri): IPlayResource {
  const playList: { type: string; list: { name: string; url: string }[] }[] = []
  if (resource.dl && resource.dl.dd) {
    if (resource.dl.dd instanceof Array) {
      const videoList = resource.dl.dd
      videoList.forEach((item) => {
        playList.push({ type: item.flag, list: convertPlayList(item.text) })
      })
    } else {
      playList.push({ type: resource.dl.dd.flag, list: convertPlayList(resource.dl.dd.text) })
    }
  }
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
    playList: playList
  }
}

function convertPlayList(listStr: string): { name: string; url: string }[] {
  const list: { name: string; url: string }[] = []
  try {
    const splitLists = listStr.split('$$$')
    if (splitLists.length > 1) {
      debugger
    }
    if (splitLists.length) {
      splitLists[0].split('#').forEach((item) => {
        const [key, val] = item.split('$')
        key && val && list.push({ name: key, url: val })
      })
    }
  } catch (e) {
    // noop
  }
  return list
}

/**
export function cleanResourceData(dataType: string, data: IPlayResource): IPlayResource {
  const optData: IPlayResource = {
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
  }
  if (dataType === TABLES.TABLE_HISTORY) {
    optData.historyOption = data.historyOption
  } else if (dataType === TABLES.TABLE_COLLECT) {
    optData.collectOption = data.collectOption
  }
  return optData
}
*/
