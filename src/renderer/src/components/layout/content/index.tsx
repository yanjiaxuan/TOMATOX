import { useState } from 'react'
import { Button, Drawer, Spin } from 'antd'
import { Outlet, useLocation } from 'react-router-dom'
import KeepAlive from 'react-activation'
import './index.less'
import store from '../../../store'

export default function TomatoxContent(): JSX.Element {
  const [loading] = useState(false)
  const location = useLocation()
  const { playDrawerOpen } = store
  function closePlayDrawer(): void {
    store.playDrawerOpen = false
  }

  return (
    <Spin size={'large'} spinning={loading} tip={'Loading...'} style={{ maxHeight: 'unset' }}>
      <div className={'content-wrapper'}>
        <KeepAlive id={location.pathname}>
          <Outlet />
        </KeepAlive>
        <Drawer
          open={playDrawerOpen}
          width={'100%'}
          title={null}
          closable={false}
          className={'play-drawer'}
        >
          <Button onClick={closePlayDrawer}>1234</Button>
        </Drawer>
      </div>
    </Spin>
  )
}
