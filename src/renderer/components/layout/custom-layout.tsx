import { Layout } from 'antd';
import React, { useState } from 'react';
import { HashRouter } from 'react-keeper';
import Indexed from '@/utils/db/indexed';
import cssM from './custom-layout.scss';
import CustomSider from './sider/custom-sider';
import CustomHeader from './header/custom-header';
import CustomContent from './content/custom-content';
import { TABLES } from '@/utils/constants';
import { getEnabledOrigin } from '@/utils/db/storage';
import store from '@/utils/store';

const { Header, Sider, Content } = Layout;

export default function CustomLayout() {
    const [loaded, setLoaded] = useState(false);
    if (!loaded) {
        Indexed.init().then(async () => {
            const origin = await Indexed.instance!.queryById(
                TABLES.TABLE_ORIGIN,
                getEnabledOrigin()
            );
            store.setState('SITE_ADDRESS', origin);
            setLoaded(true);
        });
    }
    return (
        <>
            {!loaded && <div className={cssM.defaultBackground} />}
            {loaded && <LayoutFunc />}
        </>
    );
}

function LayoutFunc() {
    const [theme, setTheme] = useState('dark');
    return (
        <HashRouter>
            <Layout className={cssM.fullContent}>
                <Sider theme={theme as 'light' | 'dark'} width={170}>
                    <CustomSider theme={theme} />
                </Sider>
                <Layout>
                    <Header className={cssM.customHeader}>
                        <CustomHeader />
                    </Header>
                    <Content className={cssM.customContent}>
                        <CustomContent />
                    </Content>
                </Layout>
            </Layout>
        </HashRouter>
    );
}
