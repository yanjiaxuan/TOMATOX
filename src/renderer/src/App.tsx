import { ConfigProvider, message } from 'antd'
import store from './store'
import themeConfig from './config/theme-config'
import { useRoutes } from 'react-router-dom'
import { routers } from './router'

message.config({
  top: 50
})

function App(): JSX.Element {
  const { theme } = store
  return <ConfigProvider theme={themeConfig[theme]}>{useRoutes(routers)}</ConfigProvider>
}

export default App
