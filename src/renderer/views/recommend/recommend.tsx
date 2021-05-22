import React, { useEffect, useState } from 'react';
import {Link} from "react-router-dom";
import { Button, Spin } from 'antd';
import store from '@/utils/store';
import Scrollbars from 'react-custom-scrollbars';
import playTool from '@/utils/paly-tool';
import CardStream from '@/views/recommend/CardStream';
import InfiniteScroll from 'react-infinite-scroller'
import CustomSpin from '@/components/custom-spin/custom-spin';
import cssM from './recommend.scss'

// eslint-disable-next-line react/prefer-stateless-function
export default class Recommends extends React.Component<any, any>{
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
        function convertEle(eles: any[]) {
            const res = []
            for (const ele of eles) {
                res.push(<div key={ele.id} className={cssM.card}>
                    <div>
                        <img src={ele.pic} className={cssM.descImg} />
                        <span className={cssM.topRightTitle}>{ele.note}</span>
                    </div>
                    <span>{ele.name}</span>
                    <span>主演 : {ele.director||'未知'}</span>
                </div>)
            }
            return res
        }
        return (
            <Scrollbars>
                <InfiniteScroll
                    initialLoad={false}
                    pageStart={1}
                    loadMore={this.getRecommend.bind(this)}
                    hasMore
                    useWindow={false} >
                        <div className={cssM.cardList}>
                            {convertEle(this.state.cardsData)}
                        </div>
                        <div style={{height: 80, position: 'relative'}}>
                            <Spin size={'large'} indicator={<CustomSpin />} spinning={this.state.recommendLoading} />
                        </div>
                </InfiniteScroll>
            </Scrollbars>
        );
    }
}