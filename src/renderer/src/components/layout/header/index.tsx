import './index.less'
import { useState } from 'react'
import { Input, message } from 'antd'
import {
  BugOutlined,
  ReloadOutlined,
  SearchOutlined,
  MinusOutlined,
  ExpandOutlined,
  CompressOutlined,
  CloseOutlined,
  UserOutlined,
  SkinOutlined,
  ShareAltOutlined
} from '@ant-design/icons'
import Icon from '@renderer/assets/images/svg/icon.svg'
import store from '../../../store'

function developingMsg(): void {
  message.info({
    content: '功能正在开发中...',
    className: '',
    icon: <></>,
    duration: 1
  })
}

export default function TomatoxHeader(): JSX.Element {
  const [searchLoading, setSearchLoading] = useState(false)
  const [windowMax, setWindowMax] = useState(false)

  function changeScreenState(): void {
    setWindowMax(!windowMax)
    window.electron.ipcRenderer.send('WINDOW_MAX')
  }

  function onSearch(): void {
    setSearchLoading(true)
    setTimeout(() => {
      setSearchLoading(false)
    }, 1000)
  }
  function changeTheme(): void {
    store.theme = store.theme === 'dark' ? 'light' : 'dark'
  }
  return (
    <div className={'header-wrapper'}>
      <div className={'prod-title'}>
        <img src={Icon} className={'prod-icon'} alt={'logo'} />
        <span>TOMATOX</span>
      </div>
      <Input.Search
        loading={searchLoading}
        placeholder="电影、电视剧、综艺..."
        onSearch={onSearch}
        enterButton={
          <span>
            <SearchOutlined /> 搜索
          </span>
        }
        className={'header-input'}
      />
      <span className={'app-btn'}>
        <BugOutlined
          onClick={(): void => {
            window.electron.ipcRenderer.send('WINDOW_DEBUG')
          }}
        />
        <ReloadOutlined
          onClick={(): void => {
            window.location.href = '/'
          }}
          style={{ fontSize: 18 }}
        />
        <SkinOutlined onClick={changeTheme} />
        <UserOutlined onClick={developingMsg} />
        <ShareAltOutlined onClick={developingMsg} />
      </span>
      <span className={'operation-btn'}>
        <MinusOutlined
          onClick={(): void => {
            window.electron.ipcRenderer.send('WINDOW_MIN')
          }}
        />
        {windowMax ? (
          <CompressOutlined onClick={changeScreenState} />
        ) : (
          <ExpandOutlined onClick={changeScreenState} />
        )}
        <CloseOutlined
          onClick={(): void => {
            window.electron.ipcRenderer.send('WINDOW_CLOSE')
          }}
        />
      </span>
    </div>
  )
}
