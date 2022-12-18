import './index.less'
import { Card, Image } from 'antd'
import Fallback from '@renderer/assets/images/png/fallback.png'

export default function Waterfall(props: { data: IPlayResource[] }): JSX.Element {
  return (
    <div className={'card-list'}>
      {props.data.map((item, index) => (
        <Card
          key={index}
          cover={
            <Image
              src={item.picture}
              className={'card-cover'}
              preview={false}
              fallback={Fallback}
            />
          }
          hoverable={true}
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
