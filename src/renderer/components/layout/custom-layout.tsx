import { Layout } from 'antd';
import React, { useEffect, useState } from 'react';
import { HashRouter } from 'react-keeper';
import Indexed from '@/utils/db/indexed';
import cssM from './custom-layout.scss';
import CustomSider from './sider/custom-sider';
import CustomHeader from './header/custom-header';
import CustomContent from './content/custom-content';
import { TABLES } from '@/utils/constants';
import { getEnabledOrigin, getTheme } from '@/utils/db/storage';
import store from '@/utils/store';
import GlobalLoading from '../global-loading/global-loading';

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
            {loaded ? (
                <LayoutFunc />
            ) : (
                <div className={[cssM.defaultBackground, 'theme-content'].join(' ')}>
                    {/* <GlobalLoading /> */}
                </div>
            )}
        </>
    );
}

function LayoutFunc() {
    const [theme, setTheme] = useState(getTheme());
    useEffect(() => {
        return store.subscribe('TOMATOX_THEME', (val: any) => {
            setTheme(val);
        });
    });
    return (
        <HashRouter>
            <Layout className={cssM.fullContent}>
                <Sider theme={theme as 'light' | 'dark'} width={170}>
                    <CustomSider theme={theme} />
                </Sider>
                <Layout>
                    <Header
                        className={[cssM.customHeader, 'theme-header', 'theme-input'].join(' ')}>
                        <CustomHeader />
                    </Header>
                    <Content className={[cssM.customContent, 'theme-content'].join(' ')}>
                        <CustomContent />
                    </Content>
                </Layout>
            </Layout>
        </HashRouter>
    );
}
