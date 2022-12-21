import './index.less'
import { useEffect, useState } from 'react'
import { Input, Select } from 'antd'
import {
  BugOutlined,
  SearchOutlined,
  MinusOutlined,
  ExpandOutlined,
  CompressOutlined,
  CloseOutlined
} from '@ant-design/icons'
import Icon from '@renderer/assets/images/svg/icon.svg'
import store from '../../../store'
import { queryResTypes } from '../../../api/resource'

export default function TomatoxHeader(): JSX.Element {
  const [searchLoading, setSearchLoading] = useState(false)
  const [windowMax, setWindowMax] = useState(false)
  const { resourceSites, resourceTypes, curResourceSite, curResourceType } = store

  useEffect(() => {
    const types = [{ label: '全部', value: '' }]
    store.curResourceType = types[0].value
    queryResTypes(curResourceSite).then((res) => {
      types.push(
        ...res.map((item): { label: string; value: string } => ({
          label: item.text,
          value: item.id
        }))
      )
      store.resourceTypes = types
    })
  }, [curResourceSite])

  function changeResourceSite(value: string): void {
    store.curResourceSite = value
  }

  function changeResourceType(value: string): void {
    store.curResourceType = value
  }

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
  return (
    <div className={'header-wrapper'}>
      <div className={'prod-title'}>
        <img src={Icon} className={'prod-icon'} alt={'logo'} />
        <span>TOMATOX</span>
      </div>
      <div className={'select-input'}>
        <Select
          placeholder={'请选择视频源'}
          value={curResourceSite}
          options={resourceSites.map((item) => ({ label: item.id, value: item.url }))}
          style={{ width: 150 }}
          onChange={changeResourceSite}
        />
        <Select
          value={curResourceType}
          placeholder={'请选择类型'}
          style={{ width: 150, margin: '0 20px' }}
          options={resourceTypes}
          onChange={changeResourceType}
        />
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
      </div>
      <span className={'operation-btn'}>
        <BugOutlined
          onClick={(): void => {
            window.electron.ipcRenderer.send('WINDOW_DEBUG')
          }}
        />
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
