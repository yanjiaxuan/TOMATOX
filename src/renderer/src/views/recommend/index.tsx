import './index.less'
import { queryResources } from '../../api/resource'
import InfiniteScroll from 'react-infinite-scroller'
import { Spin } from 'antd'
import { useState } from 'react'
import Waterfall from '@renderer/components/waterfall'

export default function Recommend(): JSX.Element {
  const [page, setPage] = useState(0)
  const [pageCount, setPageCount] = useState(10)
  const [resourceList, setResourceList] = useState<IPlayResource[]>([])
  const [dataLoading, setDataLoading] = useState(false)

  async function getRecommendLst(pageNo: number): Promise<void> {
    setDataLoading(true)
    setPage(pageNo)
    if (pageNo >= pageCount) {
      return
    }
    const res = await queryResources({ ac: 'videolist', pg: pageNo, h: 24 * 30 })
    const collectRes: IPlayResource[] = []
    if (!res) {
      setPageCount(0)
    } else {
      const { list, pageCount } = res
      setPageCount(pageCount)
      collectRes.push(...list)
      setResourceList([...resourceList, ...collectRes])
    }
    setDataLoading(false)
  }

  return (
    <div className={'recommend-wrapper'}>
      <InfiniteScroll
        initialLoad={true}
        pageStart={0}
        loadMore={getRecommendLst}
        hasMore={page < pageCount && !dataLoading}
        useWindow={false}
      >
        <Waterfall data={resourceList} />
        <Spin
          size={'large'}
          tip={'Loading...'}
          style={{ width: '100%', height: 100, paddingTop: 20 }}
        />
      </InfiniteScroll>
    </div>
  )
}
