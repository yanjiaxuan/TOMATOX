import { ConfigProvider } from 'antd'
import store from './store'
import themeConfig from './config/theme-config'
import { useLocation, useRoutes } from 'react-router-dom'
import { getRouters } from './router'

function App(): JSX.Element {
  const { theme } = store
  const location = useLocation()

  return (
    <ConfigProvider theme={themeConfig[theme]}>{useRoutes(getRouters(location))}</ConfigProvider>
  )
}

export default App
