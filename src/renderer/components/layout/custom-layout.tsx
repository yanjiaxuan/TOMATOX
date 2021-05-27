import { Layout } from 'antd';
import React, { useState } from 'react';
import { HashRouter } from 'react-keeper';
import store from '@/utils/store';
import cssM from './custom-layout.scss';
import CustomSider from './sider/custom-sider';
import CustomHeader from './header/custom-header';
import CustomContent from './content/custom-content';

const { Header, Sider, Content } = Layout;

export default function CustomLayout() {
    const site = store.getState('SITE_ADDRESS');
    const [theme, setTheme] = useState('dark');
    const [loaded, setLoaded] = useState(Boolean(site));
    if (!loaded) {
        const unsubCB = store.subscribe('SITE_ADDRESS', () => {
            setLoaded(true);
            unsubCB();
        });
    }
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
                    {loaded ? (
                        <Content className={cssM.customContent}>
                            <CustomContent />
                        </Content>
                    ) : (
                        <div className={cssM.defaultBackground} />
                    )}
                </Layout>
            </Layout>
        </HashRouter>
    );
}
