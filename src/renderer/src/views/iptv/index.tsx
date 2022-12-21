import store from '../../store'
import './index.less'
import { Card, Image } from 'antd'
import IPTV from '@renderer/assets/images/svg/iptv.svg'

export default function Iptv(): JSX.Element {
  const { iptvGroups } = store

  return (
    <div className={'iptv-wrapper'}>
      {iptvGroups.map((item) => (
        <Card className={'iptv-group'} key={item.type} hoverable>
          <Image src={IPTV} width={40} height={40} preview={false} />
          <span className={'iptv-group-name'}>{item.type}</span>
        </Card>
      ))}
    </div>
  )
}
