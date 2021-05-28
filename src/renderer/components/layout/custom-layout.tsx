import { Layout } from 'antd';
import React, { useState } from 'react';
import { HashRouter } from 'react-keeper';
import store from '@/utils/store';
import Indexed from '@/utils/db/indexed';
import cssM from './custom-layout.scss';
import CustomSider from './sider/custom-sider';
import CustomHeader from './header/custom-header';
import CustomContent from './content/custom-content';

const { Header, Sider, Content } = Layout;
let dbLoaded = false;
let siteLoaded = false;

export default function CustomLayout() {
    const site = store.getState('SITE_ADDRESS');
    const [loaded, setLoaded] = useState(Boolean(site));
    if (!loaded) {
        const unsubCB = store.subscribe('SITE_ADDRESS', () => {
            unsubCB();
            siteLoaded = true;
            if (dbLoaded) {
                setLoaded(true);
            }
        });
        Indexed.getInstance().then(() => {
            dbLoaded = true;
            if (siteLoaded) {
                setLoaded(true);
            }
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
