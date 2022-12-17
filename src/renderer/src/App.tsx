import { ConfigProvider } from 'antd'
import store from './store'
import themeConfig from './config/theme-config'
import TomatoxLayout from './components/layout'

function App(): JSX.Element {
  const { theme } = store

  return (
    <ConfigProvider theme={themeConfig[theme]}>
      <TomatoxLayout />
    </ConfigProvider>
  )
}

export default App
