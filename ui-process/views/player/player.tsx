import React, {createRef, LegacyRef, useEffect, useRef} from "react";
import DPlayer from 'dplayer'
import './palyer.css'
import {LeftOutlined, MinusOutlined, BlockOutlined, CloseOutlined} from '@ant-design/icons';

export default function Player(props: any) {
    debugger
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
            <div className={'play-full-header'}>
                <span onClick={() => {
                    window.history.go(-1)
                }}>
                    <LeftOutlined/> 返回
                </span>
                <span>
                    Mouse(窥探)
                </span>
                <span>
                    <MinusOutlined/>
                    <BlockOutlined />
                    <CloseOutlined/>
                </span>
            </div>
            <div className={'play-full-wrapper'}>
                <div ref={playWrapperRef} className={'player-wrapper'}/>
                <div className={'video-info'}>
                </div>
            </div>
        </>
    )

}