import { useState } from 'react'
import { Spin } from 'antd'
import { Outlet } from 'react-router-dom'
import './index.less'

export default function TomatoxContent(): JSX.Element {
  const [loading] = useState(false)

  return (
    <Spin size={'large'} spinning={loading} tip={'Loading...'} style={{ maxHeight: 'unset' }}>
      <div className={'content-wrapper'}>
        <Outlet />
      </div>
    </Spin>
  )
}
