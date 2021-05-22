import React, { useEffect, useState } from 'react';
import Recommend from '@/views/recommend/recommend';
import Classify from '@/views/classify/classify'
import History from '@/views/history/history'
import Collect from '@/views/collect/collect'
import Player from '@/views/player/player'
import {Spin} from "antd";
import CustomSpin from "@/components/custom-spin/custom-spin";
import store from '@/utils/store';
import {Route} from 'react-keeper'
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
            <Route cache path='/' component={Recommend} />
            <Route cache path='/recommend' component={Recommend} />
            <Route cache path='/classify' component={Classify} />
            <Route cache path='/history' component={History} />
            <Route cache path='/collect' component={Collect} />
            <Route path='/play' component={Player} />
        </div>
    </Spin>
)
}