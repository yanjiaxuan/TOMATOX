import { Layout } from "antd"
import React, {useState} from "react";
import {BrowserRouter} from 'react-keeper'
import cssM from './custom-layout.scss'
import CustomSider from "./sider/custom-sider";
import CustomHeader from "./header/custom-header";
import CustomContent from './content/custom-content'

const { Header, Sider, Content } = Layout

export default function CustomLayout() {
    const [theme, setTheme] = useState('dark')
    return (
        <BrowserRouter>
            <Layout className={cssM.fullContent}>
                <Sider theme={theme as 'light'|'dark'} width={170}>
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
        </BrowserRouter>
    )
}
