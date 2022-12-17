import { Layout, theme as _theme } from 'antd'
const { Header, Sider, Content } = Layout
import TomatoxHeader from './header'
import './index.less'
import TomatoxSider from './sider'
import TomatoxContent from './content'
import store from '../../store'

export default function TomatoxLayout(): JSX.Element {
  const {
    token: { colorBgContainer, colorText }
  } = _theme.useToken()
  const { theme } = store

  return (
    <Layout className={'tomatox-layout'}>
      <Header
        className={'tomatox-header'}
        style={{ padding: '0 10px 0 20px', background: colorBgContainer }}
      >
        <TomatoxHeader />
      </Header>
      <Layout>
        <Sider theme={theme}>
          <TomatoxSider />
        </Sider>
        <Content style={{ color: colorText }}>
          <TomatoxContent />
        </Content>
      </Layout>
    </Layout>
  )
}
