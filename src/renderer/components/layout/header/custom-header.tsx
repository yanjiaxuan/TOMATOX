import React from "react";
import { Input } from 'antd'
import {BugOutlined, ReloadOutlined, SearchOutlined, LeftOutlined, MinusOutlined, BlockOutlined, CloseOutlined, UserOutlined, SkinOutlined, ShareAltOutlined} from '@ant-design/icons';
import cssModule from './custom-header.scss'

const {ipcRenderer} = require('electron')

export default function CustomHeader() {
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    function onSearch() {

    }
    return (
    <div className={cssModule.headerWrapper}>
        <Input.Search placeholder="Mouse" onSearch={onSearch} enterButton={<span><SearchOutlined /> 全网搜</span>} className={cssModule.headerInput} />
        <span className={cssModule.appBtn}>
            <BugOutlined onClick={() => { ipcRenderer.send('WINDOW_DEBUG') }} />
            <ReloadOutlined onClick={() => {window.location.href += ''}} style={{fontSize: 18}} />
            <SkinOutlined />
            <UserOutlined />
            <ShareAltOutlined />
        </span>
        <span className={cssModule.operationBtn}>
            <MinusOutlined onClick={() => { ipcRenderer.send('WINDOW_MIN') }} />
            <BlockOutlined onClick={() => { ipcRenderer.send('WINDOW_MAX') }} />
            <CloseOutlined onClick={() => { ipcRenderer.send('WINDOW_CLOSE') }} />
        </span>
    </div>
)
}