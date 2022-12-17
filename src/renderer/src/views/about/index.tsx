import './index.less'
import logo from '@renderer/assets/images/svg/icon.svg'
import {
  GithubOutlined,
  SyncOutlined,
  CheckCircleOutlined,
  ArrowUpOutlined,
  CloseCircleOutlined
} from '@ant-design/icons'
import { PROD_STATEMENT } from '@renderer/utils/constant'
import { version } from '@root/package.json'
import { useState } from 'react'
import { convertBytes } from '../../utils/byte-util'
import { IpcRendererEvent } from '@electron-toolkit/preload'

export default function About(): JSX.Element {
  const [updateStatus, setUpdateStatus] = useState(0) // 0: 未检查， 1：检查中，2：无新版本，3：有新版本，4：下载完成，等待安装，5：更新失败，6：正在下载，7：请求下载中
  const [newVersion, setNewVersion] = useState('')
  const [percent, setPercent] = useState(0)
  const [bytesPerSecond, setBytesPerSecond] = useState('')
  const [transferred, setTransferred] = useState('')
  const [total, setTotal] = useState('')

  window.electron.ipcRenderer
    .on('checking-for-update', () => {
      setUpdateStatus(1)
    })
    .on('update-available', (_: IpcRendererEvent, info) => {
      setUpdateStatus(3)
      setNewVersion(info.version)
    })
    .on('update-not-available', () => {
      setUpdateStatus(2)
    })
    .on('update-error', () => {
      setUpdateStatus(5)
    })
    .on('update-downloaded', () => {
      setUpdateStatus(4)
    })
    .on('download-progress', (_: IpcRendererEvent, procInfo) => {
      setUpdateStatus(6)
      setPercent(Math.floor(procInfo.percent || 0))
      setBytesPerSecond(convertBytes(procInfo.bytesPerSecond || 0))
      setTransferred(convertBytes(procInfo.transferred || 0))
      setTotal(convertBytes(procInfo.total || 0))
    })

  function checkUpdate(): void {
    setUpdateStatus(1)
    window.electron.ipcRenderer.send('checkForUpdate')
  }

  function downloadNew(): void {
    setUpdateStatus(7)
    window.electron.ipcRenderer.send('downloadUpdate')
  }

  function installNew(): void {
    window.electron.ipcRenderer.send('quitAndInstall')
  }

  return (
    <div>
      <div className={'logo-wrapper'}>
        <img src={logo} width={120} />
        <span>
          TOMATOX {version}
          <span className={'check-update'}>
            {updateStatus === 0 && (
              <span onClick={checkUpdate}>
                <SyncOutlined />
                检查更新
              </span>
            )}
            {updateStatus === 1 && (
              <span>
                <SyncOutlined spin />
                正在检查更新
              </span>
            )}
            {updateStatus === 2 && (
              <span onClick={checkUpdate}>
                <CheckCircleOutlined />
                已是最新版本
              </span>
            )}
            {updateStatus === 3 && (
              <span onClick={downloadNew}>
                <ArrowUpOutlined />
                发现新版本({newVersion || ''})，点击更新
              </span>
            )}
            {updateStatus === 4 && (
              <span onClick={installNew}>
                <ArrowUpOutlined />
                下载完毕，点击安装
              </span>
            )}
            {updateStatus === 5 && (
              <span onClick={checkUpdate}>
                <CloseCircleOutlined />
                (检查)更新失败，点击重试
              </span>
            )}
            {updateStatus === 6 && (
              <span>
                <SyncOutlined spin />
                正在下载新版本 {`${transferred}/${total} ${percent}% ${bytesPerSecond}/s`}
              </span>
            )}
            {updateStatus === 7 && (
              <span>
                <SyncOutlined spin />
                正在请求更新
              </span>
            )}
          </span>
        </span>
        <span>
          Author: Freeless
          <GithubOutlined
            className={'gh-icon'}
            onClick={(): void => {
              window.api.openBrowser('https://github.com/yanjiaxuan/TOMATOX')
            }}
          />
        </span>
      </div>
      <div className={'prod-statement-wrapper'}>
        <div className={'prod-statement'}>{PROD_STATEMENT}</div>
      </div>
    </div>
  )
}
