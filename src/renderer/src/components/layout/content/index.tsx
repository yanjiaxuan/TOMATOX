import { ReactNode, useState } from 'react'
import { Spin } from 'antd'
import { Routes, Route, Navigate, useLocation, Location } from 'react-router-dom'
import './index.less'
import KeepAlive from 'react-activation'
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

const keepAlive = (location: Location, children: ReactNode): ReactNode => {
  return <KeepAlive id={location.pathname}>{children}</KeepAlive>
}

export default function TomatoxContent(): JSX.Element {
  const [loading] = useState(false)
  const location = useLocation()

  return (
    <Spin size={'large'} spinning={loading} tip={'Loading...'} style={{ maxHeight: 'unset' }}>
      <div className={'content-wrapper'}>
        <Routes>
          <Route path={'/'} element={<Navigate to={'/recommend'} />} />
          <Route path={'/recommend'} element={keepAlive(location, <Recommend />)} />
          <Route path={'/classify'} element={keepAlive(location, <Classify />)} />
          <Route path={'/iptv'} element={keepAlive(location, <Iptv />)} />
          <Route path={'/iptvPlayer'} element={keepAlive(location, <IptvPlayer />)} />
          <Route path={'/history'} element={keepAlive(location, <History />)} />
          <Route path={'/collect'} element={keepAlive(location, <Collect />)} />
          <Route path={'/play'} element={keepAlive(location, <Player />)} />
          <Route path={'/search'} element={keepAlive(location, <Search />)} />
          <Route path={'/setting'} element={keepAlive(location, <Setting />)} />
          <Route path={'/about'} element={keepAlive(location, <About />)} />
        </Routes>
      </div>
    </Spin>
  )
}
