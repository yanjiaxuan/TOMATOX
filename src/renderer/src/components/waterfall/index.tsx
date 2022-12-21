import './index.less'
import { Card, Image, theme } from 'antd'
import Fallback from '@renderer/assets/images/png/fallback.png'
import store from '../../store'

export default function Waterfall(props: { data: IPlayResource[] }): JSX.Element {
  const {
    token: { colorBgContainer }
  } = theme.useToken()

  function playResource(res: IPlayResource): void {
    store.playDrawerOpen = true
  }

  return (
    <div className={'card-list'}>
      {props.data.map((item, index) => (
        <Card
          key={index}
          style={{ backgroundImage: `url(${item.picture})` }}
          cover={
            <Image
              src={item.picture}
              className={'card-cover'}
              preview={false}
              fallback={Fallback}
            />
          }
          bordered={false}
          hoverable={true}
          bodyStyle={{
            backgroundImage: `linear-gradient(90deg, ${colorBgContainer}, transparent)`
          }}
          onClick={(): void => {
            playResource(item)
          }}
        >
          <Card.Meta
            title={item.name}
            description={
              <>
                <span>{item.remark}</span>
                <div style={{ marginTop: 5 }}>{item.actor || item.name}</div>
              </>
            }
          />
        </Card>
      ))}
    </div>
  )
}
