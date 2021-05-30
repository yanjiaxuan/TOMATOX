import React, { useState } from 'react';
import TomatoxWaterfall from '@/components/tomatox-waterfall/tomatox-waterfall';
import store from '@/utils/store';
import Scrollbars from 'react-custom-scrollbars';
import TOMATOX_ICON from '@/images/svg/icon.svg';
import { queryResources } from '@/utils/request/modules/queryResources';
import { filterResources } from '@/utils/filterResources';
import InfiniteScroll from 'react-infinite-scroller';
import { Spin } from 'antd';
import CustomSpin from '@/components/custom-spin/custom-spin';
import cssM from './search.scss';

export default class Search extends React.Component<any, any> {
    private page = 0;
    private pageCount = 10;
    constructor(props: any) {
        super(props);
        this.state = {
            cardsData: [],
            recommendLoading: false
        };
        store.subscribe('SEARCH_KEYWORDS', this.searchResByKW.bind(this));
    }

    componentWillMount(): void {
        const kw = store.getState('SEARCH_KEYWORDS');
        if (kw) {
            this.searchResByKW();
        }
    }

    async searchResByKW() {
        this.page = 0;
        this.pageCount = 10;
        store.setState('GLOBAL_LOADING', true);
        this.setState(
            {
                cardsData: [],
                recommendLoading: false
            },
            () => {
                this.searchWrapper();
            }
        );
    }

    async searchWrapper() {
        if (this.page >= this.pageCount) {
            store.setState('GLOBAL_SEARCH_ENABLE', true);
            store.setState('GLOBAL_LOADING', false);
            this.setState({
                recommendLoading: false
            });
            return;
        }
        Promise.all([this.search(), this.search(), this.search()]).finally(() => {
            store.setState('GLOBAL_SEARCH_ENABLE', true);
            if (store.getState('GLOBAL_LOADING')) {
                this.setState({
                    recommendLoading: this.page < this.pageCount
                });
                store.setState('GLOBAL_LOADING', false);
            }
        });
    }

    async search() {
        const keyword = store.getState('SEARCH_KEYWORDS');
        if (!keyword) {
            store.setState('GLOBAL_LOADING', false);
            return;
        }
        const { pagecount, list } = await queryResources(++this.page, undefined, keyword);
        this.pageCount = pagecount;
        const res = filterResources(list);
        this.setState({
            cardsData: [...this.state.cardsData, ...res]
        });
    }

    render(): React.ReactNode {
        if (this.state.cardsData && this.state.cardsData.length) {
            return (
                <Scrollbars>
                    <InfiniteScroll
                        initialLoad={false}
                        pageStart={1}
                        loadMore={this.searchWrapper.bind(this)}
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
        return (
            <div className={cssM.noResult}>
                <div>
                    <img src={TOMATOX_ICON} />
                </div>
                <span>暂无结果，请尝试搜索其他关键字</span>
            </div>
        );
    }
}
