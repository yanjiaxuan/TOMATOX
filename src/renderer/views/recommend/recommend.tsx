import React, { useEffect, useState } from 'react';
import { Button, Spin } from 'antd';
import store from '@/utils/store';
import Scrollbars from 'react-custom-scrollbars';
import InfiniteScroll from 'react-infinite-scroller';
import CustomSpin from '@/components/custom-spin/custom-spin';
import TomatoxWaterfall from '@/components/tomatox-waterfall/tomatox-waterfall';
import { filterResources } from '@/utils/filterResources';
import { queryResources } from '@/utils/request/modules/queryResources';
import cssM from './recommend.scss';

export default class Recommend extends React.Component<any, any> {
    private page = 0;
    private pageCount = 10;
    private type = undefined;

    constructor(props: any) {
        super(props);
        this.state = {
            cardsData: [],
            recommendLoading: false
        };
    }

    componentWillMount(): void {
        store.setState('GLOBAL_LOADING', true);
    }

    componentDidMount(): void {
        this.getRecommendLst();
    }

    async getPerRecommend() {
        if (this.page >= this.pageCount) {
            return;
        }
        const { list, pagecount } = await queryResources(++this.page, this.type);
        this.pageCount = pagecount;
        if (store.getState('GLOBAL_LOADING')) {
            store.setState('GLOBAL_LOADING', false);
            this.setState({
                recommendLoading: true
            });
        }
        this.setState({
            cardsData: [...this.state.cardsData, ...filterResources(list)]
        });
    }

    getRecommendLst() {
        this.getPerRecommend();
        this.getPerRecommend();
        this.getPerRecommend();
    }

    render(): React.ReactNode {
        return (
            <Scrollbars>
                <InfiniteScroll
                    initialLoad={false}
                    pageStart={1}
                    loadMore={this.getRecommendLst.bind(this)}
                    hasMore
                    useWindow={false}>
                    <TomatoxWaterfall data={this.state.cardsData} />
                    <div style={{ height: 100, position: 'relative' }}>
                        <Spin
                            size={'large'}
                            indicator={<CustomSpin />}
                            spinning={this.state.recommendLoading}
                            />
                    </div>
                </InfiniteScroll>
            </Scrollbars>
        );
    }
}
