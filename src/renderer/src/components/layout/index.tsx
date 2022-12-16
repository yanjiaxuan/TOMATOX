import { Layout, theme } from 'antd'
const { Header, Sider, Content } = Layout
import './index.less'
import TomatoxHeader from './header'
import TomatoxSider from './sider'
import TomatoxContent from './content'

export default function TomatoxLayout(props: { theme: 'dark' | 'light' }): JSX.Element {
  const {
    token: { colorBgContainer }
  } = theme.useToken()

  return (
    <Layout className={'tomatox-layout'}>
      <Header
        className={'tomatox-header'}
        style={{ padding: '0 10px 0 20px', background: colorBgContainer }}
      >
        <TomatoxHeader />
      </Header>
      <Layout className={'tomatox-sicon'}>
        <Sider className={'tomatox-sider'} theme={props.theme}>
          <TomatoxSider theme={props.theme} />
        </Sider>
        <Content className={'tomatox-content'}>
          <TomatoxContent />
        </Content>
      </Layout>
    </Layout>
  )
}
