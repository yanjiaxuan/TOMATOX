import { useState } from 'react'
import Recommend from '@renderer/views/recommend/index'
import Classify from '@renderer/views/classify/index'
import History from '@renderer/views/history/index'
import Collect from '@renderer/views/collect/index'
import Player from '@renderer/views/player/index'
import About from '@renderer/views/about/index'
import Iptv from '@renderer/views/iptv/index'
import IptvPlayer from '@renderer/views/iptv/iptv-player/index'
import Search from '@renderer/views/search/index'

import Setting from '@renderer/views/setting/index'
import { Spin } from 'antd'
import { Routes, Route, Navigate } from 'react-router-dom'
import './index.less'

export default function TomatoxContent(): JSX.Element {
  const [loading] = useState(true)
  return (
    <Spin size={'large'} spinning={loading} tip={'Loading...'} style={{ maxHeight: 'unset' }}>
      <div className={'content-wrapper'}>
        <Routes>
          <Route path={'/'} element={<Navigate to={'/recommend'} />} />
          <Route path={'/recommend'} element={<Recommend />} />
          <Route path={'/classify'} element={<Classify />} />
          <Route path={'/iptv'} element={<Iptv />} />
          <Route path={'/iptvPlayer'} element={<IptvPlayer />} />
          <Route path={'/history'} element={<History />} />
          <Route path={'/collect'} element={<Collect />} />
          <Route path={'/play'} element={<Player />} />
          <Route path={'/search'} element={<Search />} />
          <Route path={'/setting'} element={<Setting />} />
          <Route path={'/about'} element={<About />} />
        </Routes>
      </div>
    </Spin>
  )
}
