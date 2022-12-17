import { RouteObject } from 'react-router-dom'

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
import { ReactNode } from 'react'
import TomatoxLayout from '../components/layout'
import KeepAlive from 'react-activation'

const keepAlive = (id: string, children: ReactNode): ReactNode => {
  return <KeepAlive id={id}>{children}</KeepAlive>
}

export const routers: RouteObject[] = [
  {
    path: '/',
    element: <TomatoxLayout />,
    children: [
      { path: 'recommend', element: keepAlive('Recommend', <Recommend />) },
      { path: 'classify', element: keepAlive('Classify', <Classify />) },
      { path: 'iptv', element: keepAlive('Iptv', <Iptv />) },
      { path: 'iptvPlayer', element: keepAlive('IptvPlayer', <IptvPlayer />) },
      { path: 'history', element: keepAlive('History', <History />) },
      { path: 'collect', element: keepAlive('Collect', <Collect />) },
      { path: 'play', element: keepAlive('Player', <Player />) },
      { path: 'search', element: keepAlive('Search', <Search />) },
      { path: 'setting', element: keepAlive('Setting', <Setting />) },
      { path: 'about', element: keepAlive('About', <About />) }
    ]
  }
]
