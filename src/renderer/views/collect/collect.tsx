import React from 'react';
import TomatoxWaterfall from '@/components/tomatox-waterfall/tomatox-waterfall';
import Scrollbars from 'react-custom-scrollbars';
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
        const res = (await (await Indexed.getInstance()).queryAll(
            TABLES.TABLE_COLLECT
        )) as IplayResource[];
        res.sort((a, b) => (a.collectDate || 0) - (b.collectDate || 0));
        this.setState({
            resources: res.reverse()
        });
    }

    render() {
        return (
            <Scrollbars>
                <TomatoxWaterfall data={this.state.resources} />
            </Scrollbars>
        );
    }
}
