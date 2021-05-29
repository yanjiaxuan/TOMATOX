import React from 'react';
import cssM from './about.scss';
import logo from '@/images/svg/icon.svg';
import {
    GithubOutlined,
    SyncOutlined,
    CheckCircleOutlined,
    ArrowUpOutlined,
    CloseCircleOutlined
} from '@ant-design/icons';
import { ipcRenderer } from 'electron';

const openBrowser = require('@/utils/openBrowser');
const { version } = require('@/../../package.json');
const path = require('path');

export default class About extends React.Component<any, any> {
    constructor(props: any) {
        super(props);
        this.state = {
            updateStatus: 0, // 0: 未检查， 1：检查中，2：无新版本，3：有新版本，4：下载完成，等待安装，5：更新失败，6：正在下载
            newVersion: '',
            percent: 0,
            bytesPerSecond: 0,
            transferred: 0,
            total: 0
            // note: ''
        };
    }

    componentWillMount(): void {
        ipcRenderer
            .on('checking-for-update', () => {
                this.setState({
                    updateStatus: 1
                });
            })
            .on('update-available', (event: any, info: any) => {
                this.setState({
                    updateStatus: 3,
                    newVersion: info.version
                    // note: info.releaseNotes
                });
            })
            .on('update-not-available', () => {
                this.setState({
                    updateStatus: 2
                });
            })
            .on('update-error', () => {
                this.setState({
                    updateStatus: 5
                });
            })
            .on('update-downloaded', () => {
                this.setState({
                    updateStatus: 4
                });
            })
            .on('download-progress', (event: any, procInfo: any) => {
                this.setState({
                    updateStatus: 6,
                    percent: procInfo.percent,
                    bytesPerSecond: procInfo.bytesPerSecond,
                    transferred: procInfo.transferred,
                    total: procInfo.total
                });
            });
    }

    private checkUpdate = () => {
        this.setState({
            updateStatus: 1
        });
        ipcRenderer.send('checkForUpdate');
    };

    private downloadNew = () => {
        ipcRenderer.send('downloadUpdate');
    };

    private installNew = () => {
        ipcRenderer.send('quitAndInstall');
    };

    render(): React.ReactNode {
        return (
            <div className={cssM.logoWrapper}>
                <img src={logo} width={120} />
                <span>
                    TOMATOX {version}
                    <span className={cssM.checkUpdate}>
                        {this.state.updateStatus === 0 && (
                            <span onClick={this.checkUpdate}>
                                <SyncOutlined />
                                检查更新
                            </span>
                        )}
                        {this.state.updateStatus === 1 && (
                            <span>
                                <SyncOutlined spin />
                                正在检查更新
                            </span>
                        )}
                        {this.state.updateStatus === 2 && (
                            <span onClick={this.checkUpdate}>
                                <CheckCircleOutlined />
                                已是最新版本
                            </span>
                        )}
                        {this.state.updateStatus === 3 && (
                            <span onClick={this.downloadNew}>
                                <ArrowUpOutlined />
                                发现新版本({this.state.newVersion || ''})，点击更新
                            </span>
                        )}
                        {this.state.updateStatus === 4 && (
                            <span onClick={this.installNew}>
                                <ArrowUpOutlined />
                                下载完毕，点击安装
                            </span>
                        )}
                        {this.state.updateStatus === 5 && (
                            <span onClick={this.checkUpdate}>
                                <CloseCircleOutlined />
                                (检查)更新失败，点击重试
                            </span>
                        )}
                        {this.state.updateStatus === 6 && (
                            <span>
                                <SyncOutlined spin />
                                正在下载新版本{' '}
                                {`${this.state.transferred}/${this.state.total} ${this.state.percent}% ${this.state.bytesPerSecond}byte/s`}
                            </span>
                        )}
                    </span>
                </span>
                <span>
                    Author: Freeless
                    <GithubOutlined
                        className={cssM.ghIcon}
                        onClick={() => {
                            openBrowser('https://github.com/yanjiaxuan/TOMATOX');
                        }}
                        />
                </span>
            </div>
        );
    }
}
