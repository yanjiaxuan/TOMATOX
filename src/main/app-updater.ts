import { BrowserWindow, ipcMain } from 'electron'
import { autoUpdater } from 'electron-updater'
import fs from 'fs'

function delDir(path: string): void {
  if (fs.existsSync(path)) {
    const files = fs.readdirSync(path)
    files.forEach((file: string) => {
      const curPath = `${path}/${file}`
      if (fs.statSync(curPath).isDirectory()) {
        delDir(curPath)
      } else {
        fs.unlinkSync(curPath)
      }
    })
    fs.rmdirSync(path)
  }
}

// electron-updater 增量更新时似乎无法显示进度
export function initUpdater(win: BrowserWindow): void {
  autoUpdater.autoDownload = false
  autoUpdater.autoInstallOnAppQuit = true
  autoUpdater.forceDevUpdateConfig = true

  // fix download error when old version update file already exists
  function downloadUpdate(): void {
    autoUpdater.downloadUpdate().catch((err) => {
      if (err.message && err.message.includes('file already exists') && err.path) {
        delDir(err.path)
        downloadUpdate()
      } else {
        win.webContents.send('update-error', err)
      }
    })
  }

  // 主进程监听检查更新事件
  ipcMain.on('checkForUpdate', () => {
    autoUpdater.checkForUpdates().catch((err) => {
      win.webContents.send('update-error', err)
    })
  })

  // 主进程监听开始下载事件
  ipcMain.on('downloadUpdate', () => {
    downloadUpdate()
  })

  // 主进程监听退出并安装事件
  ipcMain.on('quitAndInstall', () => {
    autoUpdater.quitAndInstall()
  })

  // 开始检测是否有更新
  autoUpdater.on('checking-for-update', () => {
    win.webContents.send('checking-for-update')
  })

  // 检测到有可用的更新
  autoUpdater.on('update-available', (info) => {
    win.webContents.send('update-available', info)
  })

  // 没有检测到有可用的更新
  autoUpdater.on('update-not-available', () => {
    win.webContents.send('update-not-available')
  })

  // 更新出错
  autoUpdater.on('error', (err) => {
    win.webContents.send('update-error', err)
  })

  // 下载更新进度
  autoUpdater.on('download-progress', (progressObj) => {
    win.webContents.send('download-progress', progressObj)
  })

  // 下载完成
  autoUpdater.on('update-downloaded', () => {
    win.webContents.send('update-downloaded')
  })
}