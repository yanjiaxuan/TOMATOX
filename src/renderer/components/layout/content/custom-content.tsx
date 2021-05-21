import React, { useEffect, useState } from 'react';
import {BrowserRouter, Route, Link, Redirect} from 'react-router-dom'
import Recommend from '@/views/recommend/recommend';
import Classify from '@/views/classify/classify'
import History from '@/views/history/history'
import Collect from '@/views/collect/collect'
import Player from '@/views/player/player'
import {Spin} from "antd";
import CustomSpin from "@/components/custom-spin/custom-spin";
import store from '@/utils/store';
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
            <Redirect to={'/recommend'} />
            <Route exact path='/'>
                <Redirect to={'/recommend'} />
            </Route>
            <Route exact path='/recommend'>
                <Recommend />
            </Route>
            <Route exact path='/classify'>
                <Classify />
            </Route>
            <Route exact path='/history'>
                <History />
            </Route>
            <Route exact path='/collect'>
                <Collect />
            </Route>
            <Route exact path='/play'>
                <Player />
            </Route>
        </div>
    </Spin>
)
}