import React, { useEffect, useState } from 'react';
import { Button, Spin } from 'antd';
import store from '@/utils/store';
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
        this.initResource();
        store.subscribe('SITE_ADDRESS', () => {
            this.page = 0;
            this.pageCount = 10;
            this.setState(
                {
                    cardsData: [],
                    recommendLoading: false
                },
                this.initResource
            );
        });
    }

    initResource() {
        this.getRecommendLst();
    }

    getRecommendLst() {
        if (this.page >= this.pageCount) {
            return;
        }
        Promise.all([
            queryResources(++this.page, this.type, undefined, 24 * 30),
            queryResources(++this.page, this.type, undefined, 24 * 30),
            queryResources(++this.page, this.type, undefined, 24 * 30)
        ]).then(
            resLst => {
                const collectRes: IplayResource[] = [];
                resLst.forEach(res => {
                    if (!res) {
                        this.pageCount = 0;
                        return;
                    }
                    const { list, pagecount } = res;
                    this.pageCount = pagecount;
                    collectRes.push(...list);
                });
                if (store.getState('GLOBAL_LOADING')) {
                    store.setState('GLOBAL_LOADING', false);
                }
                this.setState({
                    recommendLoading: this.page < this.pageCount,
                    cardsData: [...this.state.cardsData, ...collectRes]
                });
            },
            reason => {
                if (store.getState('GLOBAL_LOADING')) {
                    store.setState('GLOBAL_LOADING', false);
                }
            }
        );
    }

    render(): React.ReactNode {
        return (
            <div className={cssM.scrollWrapper}>
                <InfiniteScroll
                    initialLoad={false}
                    pageStart={1}
                    loadMore={this.getRecommendLst.bind(this)}
                    hasMore={this.page < this.pageCount}
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
            </div>
        );
    }
}
