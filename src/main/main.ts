// 引入electron并创建一个BrowserWindow
import { app, BrowserWindow } from 'electron';
import { initUpdater } from './auto-update/auto-update';

const path = require('path');
const url = require('url');
const procEvent = require('./event-handler/event-handler');

app.commandLine.appendSwitch('disable-features', 'OutOfBlinkCors'); // 允许跨域
app.commandLine.appendSwitch('--ignore-certificate-errors', 'true'); // 忽略证书相关错误

// 保持window对象的: BrowserWindow | null全局引用,避免JavaScript对象被垃圾回收时,窗口被自动关闭.
let mainWindow: Electron.BrowserWindow | null;

function createWindow() {
    // 创建浏览器窗口,宽高自定义具体大小你开心就好
    mainWindow = new BrowserWindow({
        show: false,
        width: 1260,
        height: 700,
        minWidth: 1260,
        minHeight: 700,
        frame: false,
        backgroundColor: '#403f3f',
        webPreferences: {
            webSecurity: false,
            // nodeIntegration: true,
            contextIsolation: false
        }
    });
    procEvent(mainWindow);

    if (process.env.NODE_ENV !== 'production') {
        process.env.ELECTRON_DISABLE_SECURITY_WARNINGS = '1'; // eslint-disable-line require-atomic-updates
        mainWindow!.loadURL(`http://localhost:2003`);
    } else {
        mainWindow!.loadURL(
            url.format({
                pathname: path.join(__dirname, 'index.html'),
                protocol: 'file:',
                slashes: true
            })
        );
    }
    mainWindow.on('ready-to-show', () => {
        mainWindow?.show();
    });
    initUpdater(mainWindow);
}

// 当 Electron 完成初始化并准备创建浏览器窗口时调用此方法
app.on('ready', createWindow);
// 所有窗口关闭时退出应用.
app.on('window-all-closed', () => {
    // macOS中除非用户按下 `Cmd + Q` 显式退出,否则应用与菜单栏始终处于活动状态.
    if (process.platform !== 'darwin') {
        app.quit();
    }
});
app.on('activate', () => {
    // macOS中点击Dock图标时没有已打开的其余应用窗口时,则通常在应用中重建一个窗口
    if (mainWindow === null) {
        createWindow();
    }
});
// 你可以在这个脚本中续写或者使用require引入独立的js文件.
