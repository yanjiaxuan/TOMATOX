import { RouteObject, Navigate } from 'react-router-dom'

import Recommend from '@renderer/views/recommend/index'
import History from '@renderer/views/history/index'
import Collect from '@renderer/views/collect/index'
import Player from '@renderer/views/player/index'
import About from '@renderer/views/about/index'
import Iptv from '@renderer/views/iptv/index'
import IptvPlayer from '@renderer/views/iptv/iptv-player/index'
import Search from '@renderer/views/search/index'
import Setting from '@renderer/views/setting/index'
import TomatoxLayout from '../components/layout'

export const routers: RouteObject[] = [
  {
    element: <TomatoxLayout />,
    children: [
      { path: '/', element: <Navigate to={'/recommend'} /> },
      { path: '/recommend', element: <Recommend /> },
      { path: '/iptv', element: <Iptv /> },
      { path: '/iptvPlayer', element: <IptvPlayer /> },
      { path: '/history', element: <History /> },
      { path: '/collect', element: <Collect /> },
      { path: '/play', element: <Player /> },
      { path: '/search', element: <Search /> },
      { path: '/setting', element: <Setting /> },
      { path: '/about', element: <About /> }
    ]
  }
]
