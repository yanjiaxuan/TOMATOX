import { ConfigProvider } from 'antd'
import { useRoutes } from 'react-router-dom'
import { routers } from './routers'
import store from './store'
import themeConfig from './utils/themeConfig'

function App(): JSX.Element {
  const { theme } = store

  return <ConfigProvider theme={themeConfig[theme]}>{useRoutes(routers)}</ConfigProvider>
}

export default App
