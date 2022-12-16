import { useState } from 'react'

import { Spin } from 'antd'
import { Outlet, useLocation } from 'react-router-dom'
import { SwitchTransition, CSSTransition } from 'react-transition-group'
import './index.less'

export default function TomatoxContent(): JSX.Element {
  const [loading] = useState(true)
  const location = useLocation()

  return (
    <Spin size={'large'} spinning={loading} tip={'Loading...'} style={{ maxHeight: 'unset' }}>
      <div className={'content-wrapper'}>
        <SwitchTransition mode="out-in">
          <CSSTransition key={location.key} timeout={300} classNames="fade" nodeRef={null}>
            <Outlet />
          </CSSTransition>
        </SwitchTransition>
      </div>
    </Spin>
  )
}
