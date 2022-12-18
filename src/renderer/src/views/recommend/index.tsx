import './index.less'
import { queryResources } from '../../api/resource'
import InfiniteScroll from 'react-infinite-scroller'
import { FloatButton, Skeleton, Spin } from 'antd'
import { useEffect, useRef, useState } from 'react'
import Waterfall from '@renderer/components/waterfall'

export default function Recommend(): JSX.Element {
  const [page, setPage] = useState(0)
  const [pageCount, setPageCount] = useState(10)
  const [resourceList, setResourceList] = useState<IPlayResource[]>([])
  const [dataLoading, setDataLoading] = useState(false)
  const [initial, setInitial] = useState(true)
  const recommendRef = useRef<any>()

  async function getRecommendLst(pageNo: number): Promise<void> {
    setDataLoading(true)
    setPage(pageNo)
    if (pageNo <= pageCount) {
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
    }
    setDataLoading(false)
    initial && setInitial(!initial)
  }

  useEffect(() => {
    getRecommendLst(page + 1)
  }, [])

  return (
    <>
      <div className={'recommend-wrapper'} ref={recommendRef}>
        {initial &&
          Array.from({ length: 10 }, (_, index) => (
            <Skeleton key={index} avatar active style={{ padding: 20 }} />
          ))}
        <InfiniteScroll
          initialLoad={false}
          pageStart={1}
          loadMore={getRecommendLst}
          hasMore={page < pageCount && !dataLoading}
          useWindow={false}
        >
          <Waterfall data={resourceList} />
          {page < pageCount && (
            <Spin size={'large'} tip={'Loading...'} style={{ width: '100%', height: 100 }} />
          )}
        </InfiniteScroll>
      </div>
      <FloatButton.BackTop target={(): HTMLElement => recommendRef.current || document.body} />
    </>
  )
}
