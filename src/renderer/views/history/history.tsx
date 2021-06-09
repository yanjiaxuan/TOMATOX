import React, { ReactElement, useState } from 'react';
import Indexed from '@/utils/db/indexed';
import { TABLES } from '@/utils/constants';
import TomatoxWaterfall from '@/components/tomatox-waterfall/tomatox-waterfall';
import cssM from './history.scss';

function compareYMStr(a: string, b: string): number {
    return +a.replace('年', '').replace('月', '') - +b.replace('年', '').replace('月', '');
}

function compareDStr(a: string, b: string): number {
    return parseInt(b, 10) - parseInt(a, 10);
}

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
        const resMap = new Map<string, Map<string, IplayResource[]>>();
        // step1: convert list to map
        resources.forEach(resource => {
            const date = new Date(resource.historyOption!.lastPlayDate!);
            const yearMonth = `${date.getFullYear()}年${date.getMonth() + 1}月`;
            const day = `${date.getDate()}日`;
            if (!resMap.get(yearMonth)) {
                resMap.set(yearMonth, new Map<string, IplayResource[]>());
            }
            if (!resMap.get(yearMonth)!.get(day)) {
                resMap.get(yearMonth)!.set(day, new Array<IplayResource>());
            }
            resMap
                .get(yearMonth)!
                .get(day)!
                .push(resource);
        });
        // step2: sort
        const ymSortedArr = Array.from(resMap.keys()).sort(compareYMStr);
        const sortedMap = new Map<string, Map<string, IplayResource[]>>();
        ymSortedArr.forEach((ym: string) => {
            const dayMap = resMap.get(ym)!;
            const daySortedMap = new Map<string, IplayResource[]>();
            const daySortedArr = Array.from(dayMap.keys()).sort(compareDStr);
            daySortedArr.forEach(day => {
                daySortedMap.set(
                    day,
                    dayMap
                        .get(day)!
                        .sort(
                            (a, b) =>
                                b.historyOption!.lastPlayDate! - a.historyOption!.lastPlayDate!
                        )
                );
            });
            sortedMap.set(ym, daySortedMap);
        });
        this.setState({
            resourceList: sortedMap
        });
    }

    renderD(dData: Map<string, IplayResource[]>, ym: string) {
        const res: ReactElement[] = [];
        dData.forEach((value, key) => {
            res.push(
                <div key={key}>
                    <div className={[cssM.yearMonthStyle, 'theme-color'].join(' ')}>{ym}</div>
                    <div className={[cssM.dayStyle, 'theme-color'].join(' ')}>{key}</div>
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
        return <div className={cssM.scrollWrapper}>{this.renderYM(this.state.resourceList)}</div>;
    }
}
