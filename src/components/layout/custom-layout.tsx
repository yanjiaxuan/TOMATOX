import { Layout } from "antd"
import './custom-layout.css'
import React, {useState} from "react";
import CustomSider from "./sider/custom-sider";
import CustomHeader from "./header/custom-header";
import CustomContent from './content/custom-content'
import {BrowserRouter} from "react-router-dom";

const { Header, Sider, Content } = Layout

export default function CustomLayout() {
    const [theme, setTheme] = useState('dark')
    return (
        <BrowserRouter basename={'/tomatox'}>
            <Layout className="full-content">
                <Sider theme={theme as 'light'|'dark'} width={170}>
                    <CustomSider theme={theme} />
                </Sider>
                <Layout>
                    <Header className={"custom-header"}>
                        <CustomHeader />
                    </Header>
                    <Content className={"custom-content"}>
                        <CustomContent />
                    </Content>
                </Layout>
            </Layout>
        </BrowserRouter>
    )
}
