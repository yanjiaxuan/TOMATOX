import './index.less'
import { queryResources } from '../../api/resource'
import { useEffect, useState } from 'react'

export default function Recommend(): JSX.Element {
  const [result, setResult] = useState('')
  useEffect(() => {
    queryResources({}).then((res) => setResult(JSON.stringify(res)))
  }, [])
  return <div className={'recommend-wrapper'}>{result}</div>
}
