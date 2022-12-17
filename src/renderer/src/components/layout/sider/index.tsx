import { Menu } from 'antd'
import {
  FireOutlined,
  HistoryOutlined,
  HeartOutlined,
  AppstoreOutlined,
  SearchOutlined,
  StarOutlined,
  PlayCircleOutlined,
  SettingOutlined
} from '@ant-design/icons'
import { Link, Navigate, useLocation, useNavigate } from 'react-router-dom'
import './index.less'
import store from '../../../store'

export default function TomatoxSider(): JSX.Element {
  const navigate = useNavigate()
  const location = useLocation()
  const { theme } = store

  return (
    <>
      <Menu
        defaultSelectedKeys={['/recommend']}
        theme={theme}
        mode={'vertical'}
        style={{ height: '100%' }}
        onSelect={({ key }): void => navigate(key)}
      >
        <Menu.Item key={'/recommend'} icon={<FireOutlined />}>
          <Link to={'/recommend'}>
            <span>推荐</span>
          </Link>
        </Menu.Item>
        <Menu.Item key={'/classify'} icon={<AppstoreOutlined />}>
          <Link to={'/classify'}>
            <span>分类</span>
          </Link>
        </Menu.Item>
        <Menu.Item key={'/iptv'} icon={<PlayCircleOutlined />}>
          <Link to={'/iptv'}>
            <span>直播</span>
          </Link>
        </Menu.Item>
        <Menu.Item key={'/search'} icon={<SearchOutlined />}>
          <Link to={'/search'}>
            <span>搜索</span>
          </Link>
        </Menu.Item>
        <Menu.Item key={'/history'} icon={<HistoryOutlined />}>
          <Link to={'/history'}>
            <span>历史</span>
          </Link>
        </Menu.Item>
        <Menu.Item key={'/collect'} icon={<HeartOutlined />}>
          <Link to={'/collect'}>
            <span>收藏</span>
          </Link>
        </Menu.Item>
        <Menu.Item key={'/setting'} icon={<SettingOutlined />}>
          <Link to={'/setting'}>
            <span>设置</span>
          </Link>
        </Menu.Item>
        <Menu.Item key={'/about'} icon={<StarOutlined />}>
          <Link to={'/about'}>
            <span>关于</span>
          </Link>
        </Menu.Item>
      </Menu>
      {location.pathname === '/' ? <Navigate to={'/recommend'} /> : null}
    </>
  )
}
