import React, { useEffect, useState } from 'react';
import Recommend from '@/views/recommend/recommend';
import Classify from '@/views/classify/classify';
import History from '@/views/history/history';
import Collect from '@/views/collect/collect';
import Player from '@/views/player/player';
import { Spin } from 'antd';
import CustomSpin from '@/components/custom-spin/custom-spin';
import store from '@/utils/store';
import Developing from '@/views/developing/developing';
import { Route } from 'react-keeper';
import Search from '@/views/search/search';
import cssM from './custom-content.scss';
import About from '@/views/about/about';
import Iptv from '@/views/iptv/iptv';
import IptvPlayer from '@/views/iptv/iptv-player/iptv-player';
import Setting from '@/views/setting/setting';

function updatePath(cb: Function, props: any) {
    store.setState('CURRENT_PATH', props.path);
    cb();
}

export default function customContent() {
    const [load, setLoading] = useState(store.getState('GLOBAL_LOADING'));
    useEffect(() => {
        return store.subscribe('GLOBAL_LOADING', (val: boolean) => {
            setLoading(val);
        });
    });
    return (
        <Spin size={'large'} indicator={<CustomSpin />} spinning={load}>
            <div className={cssM.contentWrapper}>
                <Route
                    cache
                    index
                    path="/recommend"
                    component={Recommend}
                    enterFilter={updatePath}
                    />
                <Route cache path="/classify" component={Classify} enterFilter={updatePath} />
                <Route cache path="/iptv" component={Iptv} enterFilter={updatePath} />
                <Route path="/iptvPlayer" component={IptvPlayer} enterFilter={updatePath} />
                <Route path="/history" component={History} enterFilter={updatePath} />
                <Route path="/collect" component={Collect} enterFilter={updatePath} />
                <Route path="/play" component={Player} enterFilter={updatePath} />
                <Route cache path="/search" component={Search} enterFilter={updatePath} />
                <Route cache path="/setting" component={Setting} enterFilter={updatePath} />
                <Route cache path="/about" component={About} enterFilter={updatePath} />
            </div>
        </Spin>
    );
}
