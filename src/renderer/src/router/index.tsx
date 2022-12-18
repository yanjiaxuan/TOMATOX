import { Location, RouteObject, Navigate } from 'react-router-dom'
import { ReactNode } from 'react'
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
import TomatoxLayout from '../components/layout'

const keepAlive = (location: Location, children: ReactNode): ReactNode => {
  return <KeepAlive id={location.pathname}>{children}</KeepAlive>
}

export function getRouters(location: Location): RouteObject[] {
  return [
    {
      element: <TomatoxLayout />,
      children: [
        { path: '/', element: <Navigate to={'/recommend'} /> },
        { path: '/recommend', element: keepAlive(location, <Recommend />) },
        { path: '/classify', element: keepAlive(location, <Classify />) },
        { path: '/iptv', element: keepAlive(location, <Iptv />) },
        { path: '/iptvPlayer', element: keepAlive(location, <IptvPlayer />) },
        { path: '/history', element: keepAlive(location, <History />) },
        { path: '/collect', element: keepAlive(location, <Collect />) },
        { path: '/play', element: keepAlive(location, <Player />) },
        { path: '/search', element: keepAlive(location, <Search />) },
        { path: '/setting', element: keepAlive(location, <Setting />) },
        { path: '/about', element: keepAlive(location, <About />) }
      ]
    }
  ]
}
