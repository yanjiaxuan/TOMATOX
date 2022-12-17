declare module '*.json'

declare interface IOrigin {
  id: string
  api: string
  addTime: number
}

declare interface IPlayResOri {
  id: string
  type: string
  pic: string
  lang: string
  name: string
  des: string
  area: string
  actor: string
  note: string
  year: string
  last: string
  director: string
  dl?: {
    dd?: { flag: string; text: string }[] | { flag: string; text: string }
  }
}

declare interface IPlayResource {
  id: string
  type: string
  picture: string
  lang: string
  name: string
  director: string
  describe: string
  area: string
  actor: string
  class: string
  doubanId: string
  doubanScore: string
  origin: string
  remark: string
  tag: string
  year: string
  updateTime: string
  playList: Map<string, string>
  historyOption?: {
    lastPlaySrc?: string
    lastPlayTime?: number
    lastPlayDate?: number
    lastPlayDrama?: string
    lastPlayDesc?: string
  }
  collectOption?: {
    collectDate?: number
  }
}

declare interface IResPageInfo {
  limit: number
  list: IPlayResource[]
  page: number
  pageCount: number
  total: number
}

declare interface IResQueryParams {
  // ac：模式（videolist或detail详细模式），为空＝列表标准模式
  ac?: 'videolist' | 'detail'
  // ids: 影片id，多个使用,隔开
  ids?: string[]
  // t: 类型
  t?: string
  // h：最近多少小时内
  h?: number
  // pg: 页数
  pg?: number
  // wd：搜索like
  wd?: string
  // at：输出格式，可选xml
  at?: string
}

declare interface IXMLResParseResultWrapper {
  rss: IXMLResParseResult
}
declare interface IXMLResParseResult {
  list?: {
    video?: IPlayResOri | IPlayResOri[]
    pagesize: number
    page: number
    pagecount: number
    recordcount: number
  }
  class: {
    ty?: string[]
  }
}

declare interface IPlayConfig {
  voice?: number
  speed?: number
}
