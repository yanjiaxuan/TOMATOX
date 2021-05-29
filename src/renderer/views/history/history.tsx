import React, { ReactElement, useState } from 'react';
import Indexed from '@/utils/db/indexed';
import { TABLES } from '@/utils/constants';
import TomatoxWaterfall from '@/components/tomatox-waterfall/tomatox-waterfall';
import Scrollbars from 'react-custom-scrollbars';
import cssM from './history.scss';

export default class History extends React.Component<any, any> {
    constructor(props: any) {
        super(props);
        this.state = {
            resourceList: new Map<string, Map<string, IplayResource[]>>()
        };
    }

    async componentWillMount() {
        const res = await Indexed.instance!.queryAll(TABLES.TABLE_HISTORY);
        const resources = res as IplayResource[];
        const resCovertRes = new Map<string, Map<string, IplayResource[]>>();
        resources.forEach(resource => {
            const date = new Date(resource.lastPlayDate!);
            const yearMonth = `${date.getFullYear()}年${date.getMonth() + 1}月`;
            const day = `${date.getDate()}日`;
            if (!resCovertRes.get(yearMonth)) {
                resCovertRes.set(yearMonth, new Map<string, IplayResource[]>());
            }
            if (!resCovertRes.get(yearMonth)!.get(day)) {
                resCovertRes.get(yearMonth)!.set(day, new Array<IplayResource>());
            }
            resCovertRes
                .get(yearMonth)!
                .get(day)!
                .push(resource);
            resCovertRes
                .get(yearMonth)!
                .get(day)!
                .sort((a, b) => b.lastPlayDate! - a.lastPlayDate!);
        });
        this.setState({
            resourceList: resCovertRes
        });
    }

    renderD(dData: Map<string, IplayResource[]>, ym: string) {
        const res: ReactElement[] = [];
        dData.forEach((value, key) => {
            res.unshift(
                <div key={key}>
                    <div className={cssM.yearMonthStyle}>{ym}</div>
                    <div className={cssM.dayStyle}>{key}</div>
                    <TomatoxWaterfall data={value} />
                </div>
            );
        });
        return res;
    }

    renderYM(ymData: Map<string, Map<string, IplayResource[]>>) {
        const res: ReactElement[] = [];
        ymData.forEach((value, key) => {
            res.unshift(<div key={key}>{this.renderD(value, key)}</div>);
        });
        return res;
    }

    render(): React.ReactNode {
        return <Scrollbars>{this.renderYM(this.state.resourceList)}</Scrollbars>;
    }
}
