// @ts-ignore
const {ipcMain} = require('electron')

module.exports = function eventHandler(mainWindow: Electron.BrowserWindow) {
    ipcMain.on('WINDOW_MIN', () => {
        mainWindow.minimize()
    })
    ipcMain.on('WINDOW_MAX', () => {
        if (mainWindow.isMaximized()) {
            mainWindow.unmaximize()
        } else {
            mainWindow.maximize()
        }
    })
    ipcMain.on('WINDOW_CLOSE', () => {
        mainWindow.close()
    })
    ipcMain.on('WINDOW_DEBUG', () => {
        mainWindow.webContents.openDevTools()
    })
}