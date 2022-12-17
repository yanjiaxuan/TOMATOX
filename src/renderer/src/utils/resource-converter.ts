export function convertResources(resources: IPlayResOri[]): IPlayResource[] {
  return resources.map((res) => convertResource(res))
}

export function convertResource(resource: IPlayResOri): IPlayResource {
  let listStr = ''
  if (resource.dl && resource.dl.dd) {
    if (resource.dl.dd instanceof Array) {
      const videoList = resource.dl.dd.filter((item) => item.flag && item.flag.includes('m3u8'))
      if (videoList.length) {
        listStr = videoList[0].text
      }
    } else {
      listStr = resource.dl.dd.text
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
    playList: convertPlayList(listStr)
  }
}

function convertPlayList(listStr: string): Map<string, string> {
  const list = new Map<string, string>()
  const splitLists = listStr.split('$$$').filter((val) => val.includes('.m3u8'))
  if (splitLists.length) {
    splitLists[0].split('#').forEach((item) => {
      const [key, val] = item.split('$')
      key && val && list.set(key, val)
    })
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
