import React from "react";
import {BrowserRouter, Route, Link, Redirect} from 'react-router-dom'
import Recommend from "../../../views/recommend/recommend";
import Classify from '../../../views/classify/classify'
import History from '../../../views/history/history'
import Collect from '../../../views/collect/collect'
import Player from '../../../views/player/player'
import './custom-content.css'
import {Spin} from "antd";
import CustomSpin from "../../custom-spin/custom-spin";

export default function customContent() {
    return (<Spin className={'loading-spin'} size={'large'} indicator={<CustomSpin />}>
        <div className={'content-wrapper'}>
            <Route exact path='/'>
                <Redirect to={'/recommend'}/>
            </Route>
            <Route exact path='/recommend'>
                <Recommend/>
            </Route>
            <Route exact path='/classify'>
                <Classify/>
            </Route>
            <Route exact path='/history'>
                <History/>
            </Route>
            <Route exact path='/collect'>
                <Collect/>
            </Route>
            <Route exact path='/play'>
                <Player/>
            </Route>
        </div>
    </Spin>)
}