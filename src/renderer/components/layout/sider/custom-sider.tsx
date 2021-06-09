import React, { useState } from 'react';
import { Menu } from 'antd';
import {
    FireOutlined,
    HistoryOutlined,
    HeartOutlined,
    AppstoreOutlined,
    SearchOutlined,
    StarOutlined,
    PlayCircleOutlined,
    SettingOutlined
} from '@ant-design/icons';
import { Link } from 'react-keeper';
import Icon from '@/images/svg/icon.svg';
import store from '@/utils/store';
import cssM from './custom-sider.scss';

export default function CustomSider(props: any) {
    const [path, setPath] = useState(window.location.hash.slice(1));
    store.subscribe('CURRENT_PATH', (newPath: string) => {
        setPath(newPath);
    });

    return (
        <>
            <div className={[cssM.prodTitle, 'theme-logo'].join(' ')}>
                <img src={Icon} className={cssM.prodIcon} />
                <span>TOMATOX</span>
            </div>
            <Menu selectedKeys={[path]} theme={props.theme} mode={'inline'}>
                <Menu.Item key={'/recommend'} icon={<FireOutlined />}>
                    <Link to={'/recommend'}>
                        <span>推荐</span>
                    </Link>
                </Menu.Item>
                <Menu.Item key={'/classify'} icon={<AppstoreOutlined />}>
                    <Link to={'/classify'}>
                        <span>分类</span>
                    </Link>
                </Menu.Item>
                <Menu.Item key={'/iptv'} icon={<PlayCircleOutlined />}>
                    <Link to={'/iptv'}>
                        <span>直播</span>
                    </Link>
                </Menu.Item>
                <Menu.Item key={'/search'} icon={<SearchOutlined />}>
                    <Link to={'/search'}>
                        <span>搜索</span>
                    </Link>
                </Menu.Item>
                <Menu.Item key={'/history'} icon={<HistoryOutlined />}>
                    <Link to={'/history'}>
                        <span>历史</span>
                    </Link>
                </Menu.Item>
                <Menu.Item key={'/collect'} icon={<HeartOutlined />}>
                    <Link to={'/collect'}>
                        <span>收藏</span>
                    </Link>
                </Menu.Item>
                <Menu.Item key={'/setting'} icon={<SettingOutlined />}>
                    <Link to={'/setting'}>
                        <span>设置</span>
                    </Link>
                </Menu.Item>
                <Menu.Item key={'/about'} icon={<StarOutlined />}>
                    <Link to={'/about'}>
                        <span>关于</span>
                    </Link>
                </Menu.Item>
            </Menu>
        </>
    );
}
