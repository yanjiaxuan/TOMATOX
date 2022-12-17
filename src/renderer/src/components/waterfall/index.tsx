import { HeartOutlined } from '@ant-design/icons'
import { Link } from 'react-router-dom'
import './index.less'
import { Card, Image } from 'antd'

export default function Waterfall(props: { data: IPlayResource[] }): JSX.Element {
  return (
    <div className={'card-list'}>
      {props.data.map((item) => (
        <Link to={'/play'} key={item.id}>
          <Card
            cover={<Image src={item.picture} className={'card-cover'} preview={false} />}
            className={'card'}
            hoverable={true}
            actions={[
              <span key={'remark'}>{item.remark}</span>,
              <HeartOutlined key={'ellipsis'} />
            ]}
          >
            <Card.Meta title={item.name} description={item.actor || '未知'} />
          </Card>
        </Link>
      ))}
    </div>
  )
}
