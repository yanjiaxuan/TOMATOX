import React from "react";
import { Menu } from "antd";
import { FireOutlined, HistoryOutlined, HeartOutlined, AppstoreOutlined } from '@ant-design/icons'
import { Link } from 'react-router-dom'
import './custom-sider.css'
import Icon from '../../../images/svg/icon.svg'
import { Scrollbars } from 'react-custom-scrollbars'

export default function CustomSider(props: any) {
    return (<>
        <div className={'prod-title'}>
            <img src={Icon} className={'prod-icon'} />
            <span>TOMATOX</span>
        </div>
        <Scrollbars className={'scroll-bar'}>
            <Menu defaultSelectedKeys={['recommend']} theme={props.theme} mode={"inline"} data-v-1 >
                <Menu.Item key={"recommend"} icon={<FireOutlined />}>
                    <Link to={"/recommend"}>推荐</Link>
                </Menu.Item>
                <Menu.Item key={"classify"} icon={<AppstoreOutlined />}>
                    <Link to={'/classify'}>分类</Link>
                </Menu.Item>
                <Menu.Item key={"history"} icon={<HistoryOutlined />}>
                    <Link to={'/history'}>历史</Link>
                </Menu.Item>
                <Menu.Item key={"collect"} icon={<HeartOutlined />}>
                    <Link to={'/collect'}>收藏</Link>
                </Menu.Item>
            </Menu>
        </Scrollbars>
    </>)
}