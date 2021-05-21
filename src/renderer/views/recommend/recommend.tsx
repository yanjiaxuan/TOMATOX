import React, { useEffect, useState } from 'react';
import {Link} from "react-router-dom";
import {Button} from 'antd'
import './recommend.scss'
import store from '@/utils/store';
import Scrollbars from 'react-custom-scrollbars';

export default function Recommend() {
    const [ loading, setLoading ] = useState(true)
    const [ info, setInfo ] = useState(JSON.stringify(store.getState('ORIGIN_LIST')))
    if (info && info.length > 0) {
        store.setState('GLOBAL_LOADING', false)
    } else {
        store.setState('GLOBAL_LOADING', true)
    }
    useEffect(() => {
        return store.subscribe('ORIGIN_LIST', (ori: any) => {
            store.setState('GLOBAL_LOADING', false)
            setInfo(JSON.stringify(ori))
        })
    })
    return (
        <Scrollbars>
            <Link to={'/play'}>
                <Button type={'primary'} className={'btn'}>Recommend</Button>
            </Link>
            <span>{info}</span>
        </Scrollbars>
    )
}