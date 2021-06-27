import React, { useState } from 'react';
import { Input, message } from 'antd';
import {
    BugOutlined,
    ReloadOutlined,
    SearchOutlined,
    LeftOutlined,
    MinusOutlined,
    BlockOutlined,
    CloseOutlined,
    UserOutlined,
    SkinOutlined,
    ShareAltOutlined
} from '@ant-design/icons';
import { Control } from 'react-keeper';
import store from '@/utils/store';
import cssModule from './custom-header.scss';
import { setTheme } from '@/utils/db/storage';

const { ipcRenderer } = require('electron');

function developingMsg() {
    message.info({
        content: '功能正在开发中...',
        className: cssModule.msgClass,
        icon: <></>,
        duration: 1
    });
}

function changeTheme() {
    const targetTheme = store.getState('TOMATOX_THEME') === 'dark' ? 'light' : 'dark';
    store.setState('TOMATOX_THEME', targetTheme);
    setTheme(targetTheme);
}

export default function CustomHeader() {
    const [searchEnable, setSearchEnable] = useState(store.getState('GLOBAL_SEARCH_ENABLE'));
    store.subscribe('GLOBAL_SEARCH_ENABLE', (newVal: boolean) => {
        setSearchEnable(newVal);
    });
    async function onSearch(keyword: string) {
        store.setState('GLOBAL_SEARCH_ENABLE', false);
        store.setState('SEARCH_KEYWORDS', keyword);
        Control.go('/search');
    }
    return (
        <div className={cssModule.headerWrapper}>
            <Input.Search
                loading={!searchEnable}
                placeholder="电影、电视剧、综艺..."
                onSearch={onSearch}
                enterButton={
                    <span>
                        <SearchOutlined /> 全网搜
                    </span>
                }
                className={cssModule.headerInput}
                />
            <span className={cssModule.appBtn}>
                {process.env.NODE_ENV !== 'production' && (
                    <BugOutlined
                        onClick={() => {
                            ipcRenderer.send('WINDOW_DEBUG');
                        }}
                        />
                )}
                {process.env.NODE_ENV !== 'production' && (
                    <ReloadOutlined
                        onClick={() => {
                            window.location.href = '/';
                        }}
                        style={{ fontSize: 18 }}
                        />
                )}
                <SkinOutlined onClick={changeTheme} />
                <UserOutlined onClick={developingMsg} />
                <ShareAltOutlined onClick={developingMsg} />
            </span>
            <span className={cssModule.operationBtn}>
                <MinusOutlined
                    onClick={() => {
                        ipcRenderer.send('WINDOW_MIN');
                    }}
                    />
                <BlockOutlined
                    onClick={() => {
                        ipcRenderer.send('WINDOW_MAX');
                    }}
                    />
                <CloseOutlined
                    onClick={() => {
                        ipcRenderer.send('WINDOW_CLOSE');
                    }}
                    />
            </span>
        </div>
    );
}
