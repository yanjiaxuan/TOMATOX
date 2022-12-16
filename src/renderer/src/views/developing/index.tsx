import TOMATOX_ICON from '@renderer/assets/images/svg/icon.svg'
import './index.scss'

export default function index(): JSX.Element {
  return (
    <div className={'developing'}>
      <div>
        <img src={TOMATOX_ICON} />
      </div>
      <span>功能正在马不停蹄的开发中</span>
    </div>
  )
}
