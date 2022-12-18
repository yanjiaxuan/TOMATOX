import { useState } from 'react'
import { Spin } from 'antd'
import { Outlet, useLocation } from 'react-router-dom'
import KeepAlive from 'react-activation'
import './index.less'

export default function TomatoxContent(): JSX.Element {
  const [loading] = useState(false)
  const location = useLocation()

  return (
    <Spin size={'large'} spinning={loading} tip={'Loading...'} style={{ maxHeight: 'unset' }}>
      <div className={'content-wrapper'}>
        <KeepAlive id={location.pathname}>
          <Outlet />
        </KeepAlive>
      </div>
    </Spin>
  )
}
