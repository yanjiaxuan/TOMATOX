import { ReactNode } from 'react'
import { HeartOutlined } from '@ant-design/icons'
import { Link } from 'react-router-dom'
import './index.less'
import { Card, Image } from 'antd'

export default function Waterfall(props: { data: IPlayResource[] }): JSX.Element {
  const cardsData = props.data
  function convertEle(): ReactNode {
    const result: ReactNode[] = []
    for (const ele of cardsData) {
      result.push(
        <Link to={'/play'}>
          <Card
            key={ele.id}
            cover={<Image src={ele.picture} className={'card-cover'} preview={false} />}
            className={'card'}
            hoverable={true}
            actions={[<span key={'remark'}>{ele.remark}</span>, <HeartOutlined key={'ellipsis'} />]}
          >
            <Card.Meta title={ele.name} description={ele.actor || '未知'} />
          </Card>
        </Link>
      )
    }
    return result
  }
  return <div className={'card-list'}>{convertEle()}</div>
}
