import resso from 'resso'
import { queryResourceSites } from '../api/resource'
import { queryAnalysisSites } from '../api/analysis'
import { queryIptvResource } from '../api/iptv'

const store = resso<{
  theme: 'dark' | 'light'
  resourceSites: IResConfig[]
  analysisSites: IResConfig[]
  iptvGroups: IIptvGroup[]
  curResourceSite: string
  curResourceType: string
  curAnalysisSite: string
}>({
  theme: 'light',
  resourceSites: [],
  analysisSites: [],
  iptvGroups: [],
  curResourceSite: '',
  curResourceType: '',
  curAnalysisSite: ''
})

// load conf from server
const resSites = await queryResourceSites()
const analysisSites = await queryAnalysisSites()
const iptvGroups = await queryIptvResource()

// save to store
store.theme = 'light'
store.resourceSites = resSites
store.analysisSites = analysisSites
store.iptvGroups = iptvGroups
store.curResourceSite = resSites[0].url
store.curAnalysisSite = analysisSites[0].url

export default store
