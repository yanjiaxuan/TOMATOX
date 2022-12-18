import { contextBridge, shell } from 'electron'
import { electronAPI } from '@electron-toolkit/preload'
import Store from 'electron-store'

// Custom APIs for renderer
const api = {
  openBrowser: (url: string): Promise<void> => shell.openExternal(url)
}
const store = new Store()

// Use `contextBridge` APIs to expose Electron APIs to
// renderer only if context isolation is enabled, otherwise
// just add to the DOM global.
if (process.contextIsolated) {
  try {
    contextBridge.exposeInMainWorld('electron', electronAPI)
    contextBridge.exposeInMainWorld('api', api)
    contextBridge.exposeInMainWorld('store', store)
  } catch (error) {
    console.error(error)
  }
} else {
  // @ts-ignore (define in dts)
  window.electron = electronAPI
  // @ts-ignore (define in dts)
  window.api = api
  // @ts-ignore (define in dts)
  window.store = store
}
