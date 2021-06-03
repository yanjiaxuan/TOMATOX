import React from 'react';
import { Input, Radio, Row, Space, Col, Button, message, Checkbox } from 'antd';
import cssM from './setting.scss';
import { getEnabledOrigin, setEnabledOrigin } from '@/utils/db/storage';
import Indexed from '@/utils/db/indexed';
import { TABLES } from '@/utils/constants';
import store from '@/utils/store';

export default class Setting extends React.Component<any, any> {
    constructor(props: any) {
        super(props);
        this.state = {
            enableOrigin: getEnabledOrigin(),
            selectableOrigins: []
        };
    }

    componentWillMount(): void {
        Indexed.instance!.queryAll(TABLES.TABLE_ORIGIN).then(res => {
            this.setState({
                selectableOrigins: res as Iorigin[]
            });
        });
    }

    private onChange = (e: Iorigin) => {
        if (e.id === this.state.enableOrigin) {
            return;
        }
        this.setState({
            enableOrigin: e.id
        });
        setEnabledOrigin(e.id);
        store.setState('SITE_ADDRESS', e);
        message.success('切换成功');
    };

    private deleteOrigin = (id: string) => {
        this.setState({
            selectableOrigins: this.state.selectableOrigins.filter(
                (item: Iorigin) => item.id !== id
            )
        });
        Indexed.instance!.deleteById(TABLES.TABLE_ORIGIN, id);
    };

    private addOrigin = () => {
        const name = (this.refs.oriNameInput as Input).state.value;
        const addr = (this.refs.oriAddrInput as Input).state.value;
        if (!name || !/^[a-zA-Z0-9\u4e00-\u9fa5]+$/.test(name)) {
            message.warn('名称不能为空且只能输入大小写字母和数字');
        } else if (!addr || !/http(s)?:\/\/([\w-]+\.)+[\w-]+(\/[\w- ./?%&=]*)?/.test(addr)) {
            message.warn('地址不合法');
        } else {
            const newOri: Iorigin = { id: name, api: addr };
            Indexed.instance!.insertOrUpdateOrigin(TABLES.TABLE_ORIGIN, newOri);
            this.setState({
                selectableOrigins: [...this.state.selectableOrigins, newOri]
            });
        }
    };

    render(): React.ReactNode {
        return (
            <div className={cssM.settingWrapper}>
                <span className={cssM.settingTitle}>视频源</span>
                <div className={cssM.settingContent}>
                    {this.state.selectableOrigins.map((item: Iorigin) => (
                        <Checkbox
                            key={item.id}
                            className={cssM.origins}
                            checked={this.state.enableOrigin === item.id}
                            onChange={() => {
                                this.onChange(item);
                            }}>
                            <Row>
                                <Col span={4} className={cssM.originItem}>
                                    名称：{item.id}
                                </Col>
                                <Col span={16} className={cssM.originItem}>
                                    地址：{item.api}
                                </Col>
                                {item.id !== 'default' && (
                                    <Col span={2}>
                                        <span
                                            className={cssM.originBtn}
                                            onClick={() => {
                                                this.deleteOrigin(item.id);
                                            }}>
                                            删除
                                        </span>
                                    </Col>
                                )}
                            </Row>
                        </Checkbox>
                    ))}
                </div>
                <span className={cssM.settingTitle}>添加视频源</span>
                <div className={cssM.settingContent}>
                    <Row gutter={30}>
                        <Col span={6}>
                            <Input ref={'oriNameInput'} addonBefore={'名称'} />
                        </Col>
                        <Col span={13}>
                            <Input ref={'oriAddrInput'} addonBefore={'地址'} />
                        </Col>
                        <Col span={4}>
                            <Button onClick={this.addOrigin}>添加</Button>
                        </Col>
                    </Row>
                </div>
            </div>
        );
    }
}
