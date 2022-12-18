import { ElectronAPI } from '@electron-toolkit/preload'
import Store from 'electron-store'

declare global {
  interface Window {
    electron: ElectronAPI
    api: {
      openBrowser: (url: string) => Promise<void>
    }
    store: Store
  }
}
