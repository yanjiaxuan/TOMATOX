import React from "react";
import { Input } from 'antd'
import './custom-header.css'
import {ReloadOutlined, SearchOutlined, LeftOutlined, MinusOutlined, BlockOutlined, CloseOutlined, UserOutlined, SkinOutlined, ShareAltOutlined} from '@ant-design/icons';

export default function CustomHeader() {
    function onSearch() {

    }
    return (<div className={'header-wrapper'}>
        <Input.Search placeholder="Mouse" onSearch={onSearch} enterButton={<span><SearchOutlined /> 全网搜</span>} className={"header-input"} />
        <span className={'app-btn'}>
            <ReloadOutlined onClick={() => {window.location.reload()}} style={{fontSize: 18}} />
            <SkinOutlined />
            <UserOutlined />
            <ShareAltOutlined />
        </span>
        <span className={'operation-btn'}>
            <MinusOutlined/>
            <BlockOutlined />
            <CloseOutlined/>
        </span>
    </div>)
}