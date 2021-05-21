import React, {createRef, LegacyRef, useEffect, useRef} from "react";
import DPlayer from 'dplayer'
import {LeftOutlined, MinusOutlined, BlockOutlined, CloseOutlined} from '@ant-design/icons';
import cssM from './palyer.scss'

const {ipcRenderer} = require('electron')

export default function Player(props: any) {
    const playWrapperRef = createRef<HTMLDivElement>();
    let dPlayer = null;
    useEffect(() => {
        dPlayer = new DPlayer({
            container: playWrapperRef.current,
            video: {
                url: props.videoSrc || 'https://api.dogecloud.com/player/get.mp4?vcode=5ac682e6f8231991&userId=17&ext=.mp4'
            },
            autoplay: true
        })
    })

    return (
        <>
            <div className={cssM.playFullHeader}>
                <span onClick={() => {
                    window.history.go(-1)
                }}>
                    <LeftOutlined /> 返回
                </span>
                <span>
                    Mouse(窥探)
                </span>
                <span>
                    <MinusOutlined onClick={() => { ipcRenderer.send('WINDOW_MIN') }} />
                    <BlockOutlined onClick={() => { ipcRenderer.send('WINDOW_MAX') }} />
                    <CloseOutlined onClick={() => { ipcRenderer.send('WINDOW_CLOSE') }} />
                </span>
            </div>
            <div className={cssM.playFullWrapper}>
                <div ref={playWrapperRef} className={cssM.playerWrapper} />
                <div className={cssM.videoInfo} />
            </div>
        </>
    )

}