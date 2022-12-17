import { ElectronAPI } from '@electron-toolkit/preload'

declare global {
  interface Window {
    electron: ElectronAPI
    api: {
      openBrowser: (url: string) => Promise<void>
    }
  }
}
