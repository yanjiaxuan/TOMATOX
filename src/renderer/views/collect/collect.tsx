import React from 'react';
import TomatoxWaterfall from '@/components/tomatox-waterfall/tomatox-waterfall';
import Indexed from '@/utils/db/indexed';
import { TABLES } from '@/utils/constants';
import cssM from './collect.scss';

export default class Collect extends React.Component<any, any> {
    constructor(props: any) {
        super(props);
        this.state = {
            resources: []
        };
    }

    async componentWillMount() {
        const res = (await Indexed.instance!.queryAll(TABLES.TABLE_COLLECT)) as IplayResource[];
        res.sort((a, b) => b.collectOption!.collectDate! - a.collectOption!.collectDate!);
        this.setState({
            resources: res
        });
    }

    render() {
        return (
            <div className={cssM.scrollWrapper}>
                <TomatoxWaterfall data={this.state.resources} />
            </div>
        );
    }
}
