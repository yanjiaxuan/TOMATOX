import React, { useEffect, useState } from 'react';
import Recommend from '@/views/recommend/recommend';
import Classify from '@/views/classify/classify'
import History from '@/views/history/history'
import Collect from '@/views/collect/collect'
import Player from '@/views/player/player'
import {Spin} from "antd";
import CustomSpin from "@/components/custom-spin/custom-spin";
import store from '@/utils/store';
import Developing from '@/views/developing/developing'
import {Route} from 'react-keeper'
import Search from '@/views/search/search';
import Redirect from '@/components/redirect/redirect'
import cssM from './custom-content.scss'

export default function customContent() {
    const [load, setLoading] = useState(store.getState('GLOBAL_LOADING'))
    useEffect(() => {
        return store.subscribe('GLOBAL_LOADING', (val: boolean) => {
            setLoading(val)
        })
    })
    return (
    <Spin size={'large'} indicator={<CustomSpin />} spinning={load}>
        <div className={cssM.contentWrapper}>
            <Route path='/' component={Redirect} />
            <Route cache path='/recommend' component={Recommend} />
            <Route cache path='/classify' component={Developing} />
            <Route cache path='/history' component={Developing} />
            <Route cache path='/collect' component={Developing} />
            <Route path='/play' component={Player} />
            <Route cache path='/search' component={Search} />
        </div>
    </Spin>
)
}