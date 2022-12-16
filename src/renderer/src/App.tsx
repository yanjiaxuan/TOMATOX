import { ConfigProvider } from 'antd'
import { ThemeConfig } from 'antd/es/config-provider/context'
import { useState } from 'react'
import { useRoutes } from 'react-router-dom'
import { routers } from './routers'

const themes: Record<'dark' | 'light', ThemeConfig> = {
  dark: {
    token: {
      colorPrimary: '#ff5c49',
      colorBgContainer: '#403f3f',
      controlItemBgActive: '#ff5c49'
    }
  },
  light: {
    token: {
      colorPrimary: '#ff5c49',
      colorBgContainer: '#FFF',
      controlItemBgActive: '#ff5c49'
    }
  }
}

function App(): JSX.Element {
  const [curTheme] = useState<'light' | 'dark'>('light')

  return <ConfigProvider theme={themes[curTheme]}>{useRoutes(routers)}</ConfigProvider>
}

export default App
