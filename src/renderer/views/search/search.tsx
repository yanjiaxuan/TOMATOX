import React, { useState } from 'react';
import playTool from '@/utils/paly-tool';
import TomatoxWaterfall from '@/components/tomatox-waterfall/tomatox-waterfall'
import store from '@/utils/store';
import Scrollbars from 'react-custom-scrollbars';
import TOMATOX_ICON from '@/images/svg/icon.svg';
import cssM from './search.scss';

export default class Search extends React.Component<any, any>{

    constructor(props: any) {
        super(props);
        this.state = {
            cardsData: []
        }
        store.subscribe('SEARCH_KEYWORDS', this.searchResByKW.bind(this))
    }

    async searchResByKW() {
        const _this = this
        store.setState('GLOBAL_LOADING', true)
        try {
            const keyword = store.getState('SEARCH_KEYWORDS')
            if (!keyword) {
                store.setState('GLOBAL_LOADING', false)
                return
            }
            const res = await playTool.search('', keyword)
            const newCradsData: any = []
            if (res instanceof Array) {
                const promises = []
                for (const item of res) {
                    const prom = Promise.resolve().then(async () => {
                        const rr = await playTool.detail('', item.id)
                        newCradsData.push(rr)
                    })
                    promises.push(prom)
                }
                Promise.all(promises).finally(() => {
                    this.setState({
                        cardsData: newCradsData
                    })
                    store.setState('GLOBAL_LOADING', false)
                })
            } else if (res instanceof Object) {
                const rr = await playTool.detail('', res.id)
                newCradsData.push(rr)
                this.setState({
                    cardsData: newCradsData
                })
                store.setState('GLOBAL_LOADING', false)
            } else {
                store.setState('GLOBAL_LOADING', false)
            }
        } catch (e) {
            store.setState('GLOBAL_LOADING', false)
        }
    }

    componentWillMount(): void {
        this.searchResByKW()
    }

    componentWillUnmount(): void {
        store.unSubscribe('SEARCH_KEYWORDS', this.searchResByKW)
    }

    render(): React.ReactNode {
        if (this.state.cardsData && this.state.cardsData.length) {
            return (
                <Scrollbars>
                    <TomatoxWaterfall data={this.state.cardsData}/>
                </Scrollbars>
            )
        }
        return (
            <div className={cssM.noResult}>
                <div>
                    <img src={TOMATOX_ICON} />
                </div>
                <span>暂无结果，请尝试搜索其他关键字</span>
            </div>
        )
    }
}