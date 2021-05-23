import React, { useEffect, useState } from 'react';
import { Button, Spin } from 'antd';
import store from '@/utils/store';
import Scrollbars from 'react-custom-scrollbars';
import playTool from '@/utils/paly-tool';
import InfiniteScroll from 'react-infinite-scroller'
import CustomSpin from '@/components/custom-spin/custom-spin';
import TomatoxWaterfall from '@/components/tomatox-waterfall/tomatox-waterfall'
import cssM from './recommend.scss'

export default class Recommend extends React.Component<any, any>{
    private storeListener: any
    private origin: Iorigin|undefined
    private page = 0
    private type = undefined

    constructor(props: any) {
        super(props);
        this.state = {
            cardsData: [],
            recommendLoading: false
        }
    }

    componentWillMount(): void {
        store.setState('GLOBAL_LOADING', true)
    }

    componentDidMount(): void {
        const _this = this
        const siteAddr: Iorigin = store.getState('SITE_ADDRESS')
        if (siteAddr) {
            this.origin = siteAddr
            this.getRecommend()
        } else {
            this.storeListener = store.subscribe('SITE_ADDRESS', (ori: Iorigin) => {
                this.origin = ori
                this.getRecommend()
            })
        }
    }

    componentWillUnmount(): void {
        this.storeListener && store.unSubscribe('SITE_ADDRESS', this.storeListener)
    }

    async getPerRecommend() {
        if (!this.origin) { return }
        const { api } = this.origin
        this.page++
        const curPage = this.page
        const res = await playTool.list(api, curPage, this.type)
        if (curPage === 1) {
            store.setState('GLOBAL_LOADING', false)
            this.setState({
                recommendLoading: true
            })
        }
        this.setState({
            cardsData: [...this.state.cardsData, ...res]
        })
    }

    getRecommend() {
        this.getPerRecommend()
        this.getPerRecommend()
        this.getPerRecommend()
    }

    render(): React.ReactNode {
        return (
            <Scrollbars>
                <InfiniteScroll
                    initialLoad={false}
                    pageStart={1}
                    loadMore={this.getRecommend.bind(this)}
                    hasMore
                    useWindow={false} >
                        <TomatoxWaterfall data={this.state.cardsData} />
                        <div style={{height: 100, position: 'relative'}}>
                            <Spin size={'large'} indicator={<CustomSpin />} spinning={this.state.recommendLoading} />
                        </div>
                </InfiniteScroll>
            </Scrollbars>
        );
    }
}