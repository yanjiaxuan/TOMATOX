import { theme } from 'antd'
import { ThemeConfig } from 'antd/es/config-provider/context'

const themes: Record<'dark' | 'light', ThemeConfig> = {
  dark: {
    token: {
      colorPrimary: '#ff5c49',
      borderRadius: 4
    },
    algorithm: theme.darkAlgorithm
  },
  light: {
    token: {
      colorPrimary: '#ff5c49',
      borderRadius: 4
    },
    algorithm: theme.defaultAlgorithm
  }
}

export default themes
