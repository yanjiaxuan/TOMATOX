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

const lazyLoad = (children: ReactNode): ReactNode => {
  return <Suspense>{children}</Suspense>
}

export const routers: RouteObject[] = [
  {
    path: '/',
    element: <TomatoxLayout />,
    children: [
      { index: true, path: '/recommend', element: lazyLoad(<Recommend />) },
      { path: '/classify', element: lazyLoad(<Classify />) },
      { path: '/iptv', element: lazyLoad(<Iptv />) },
      { path: '/iptvPlayer', element: lazyLoad(<IptvPlayer />) },
      { path: '/history', element: lazyLoad(<History />) },
      { path: '/collect', element: lazyLoad(<Collect />) },
      { path: '/play', element: lazyLoad(<Player />) },
      { path: '/search', element: lazyLoad(<Search />) },
      { path: '/setting', element: lazyLoad(<Setting />) },
      { path: '/about', element: lazyLoad(<About />) }
    ]
  }
]
