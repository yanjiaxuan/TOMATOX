import { RouteObject } from 'react-router-dom'
import { Suspense } from 'react'

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

const keepAlive = (children: ReactNode): ReactNode => {
  return <KeepAlive>{children}</KeepAlive>
}
const lazyLoad = (children: ReactNode): ReactNode => {
  return <Suspense>{children}</Suspense>
}
const ka_lazy = (children: ReactNode): ReactNode => {
  return keepAlive(lazyLoad(children))
}

export const routers: RouteObject[] = [
  {
    path: '/',
    element: <TomatoxLayout />,
    children: [
      { index: true, path: '/recommend', element: ka_lazy(<Recommend />) },
      { path: '/classify', element: ka_lazy(<Classify />) },
      { path: '/iptv', element: ka_lazy(<Iptv />) },
      { path: '/iptvPlayer', element: ka_lazy(<IptvPlayer />) },
      { path: '/history', element: ka_lazy(<History />) },
      { path: '/collect', element: ka_lazy(<Collect />) },
      { path: '/play', element: ka_lazy(<Player />) },
      { path: '/search', element: ka_lazy(<Search />) },
      { path: '/setting', element: ka_lazy(<Setting />) },
      { path: '/about', element: ka_lazy(<About />) }
    ]
  }
]
