import { ThemeConfig } from 'antd/es/config-provider/context'

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

export default themes
