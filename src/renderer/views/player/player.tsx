import React, { createRef, LegacyRef, useEffect, useRef } from 'react';
import { LeftOutlined, MinusOutlined, BlockOutlined, CloseOutlined } from '@ant-design/icons';
import { Control } from 'react-keeper';
import { Tag ,Tabs} from 'antd';
import XGPlayer from  'xgplayer';
import Scrollbars from 'react-custom-scrollbars';
import cssM from './palyer.scss';

const HlsPlayer = require('xgplayer-hls.js')
const { ipcRenderer } = require('electron');

export default class Player extends React.Component<any, any> {
    private xgPlayer: XGPlayer | undefined;
    private sourceList: Record<string, Record<string, string>> = {}
    private selectedKey = ''
    private firstPlaySrc = ''
    private first = true
    private controlState: Record<string, any> = {}

    constructor(props: any) {
        super(props);
        this.state = {
            curPlaySrc: ''
        }
        this.controlState = Control.state
        // this.controlState = {"last":"2021-05-22 21:23:02","id":26148,"tid":3,"name":"女人我最大[2021]","type":"综艺","pic":"http://img.kuaibozy.net/upload/vod/20210106-1/7586e1459983619d6031077ab1ada097.jpg","lang":"国语","area":"台湾","year":2021,"state":0,"note":"更新至20210521","actor":"蓝心湄","director":"未知","dl":{"dd":{"_t":"20210104$https://vod.bunediy.com/20210105/WONHlAKA/index.m3u8#20210106$https://vod.bunediy.com/20210107/mfScOAOJ/index.m3u8#20210107$https://vod.bunediy.com/20210108/ZuB78Zm1/index.m3u8#20210108$https://vod.bunediy.com/20210109/tiNNvcFG/index.m3u8#20210111$https://vod.bunediy.com/20210112/mYvXHyRR/index.m3u8#20210113$https://vod.bunediy.com/20210113/2DvIFh5O/index.m3u8#20210114$https://vod.bunediy.com/20210115/RJvda8Kg/index.m3u8#20210115$https://vod.bunediy.com/20210116/ZZIGiKHO/index.m3u8#20210118$https://vod.bunediy.com/20210119/644O8E8d/index.m3u8#20210119$https://vod.bunediy.com/20210120/O8toTRzo/index.m3u8#20210120$https://vod.bunediy.com/20210121/RdmgpTuL/index.m3u8#20210121$https://vod.bunediy.com/20210122/Am5vHgFh/index.m3u8#20210122$https://vod.bunediy.com/20210123/4eLp2xIK/index.m3u8#20210125$https://vod.bunediy.com/20210126/9NW6iLGX/index.m3u8#20210126$https://vod.bunediy.com/20210127/DOAo9dz4/index.m3u8#20210127$https://vod.bunediy.com/20210128/0TMM7Cb4/index.m3u8#20210128$https://vod.bunediy.com/20210128/6hCoAl2j/index.m3u8#20210129$https://vod.bunediy.com/20210130/ABjnrBRq/index.m3u8#20210202$https://vod.bunediy.com/20210203/2kw9xmuE/index.m3u8#20210204$https://vod.bunediy.com/20210205/UfWN0Ca0/index.m3u8#20210205$https://vod.bunediy.com/20210206/yeLpq0ts/index.m3u8#20210208$https://vod.bunediy.com/20210209/20kusSuz/index.m3u8#20210209$https://vod.bunediy.com/20210210/zjKe5At0/index.m3u8#20210217$https://vod.bunediy.com/20210218/mnVVOZik/index.m3u8#20210218$https://vod.bunediy.com/20210219/EryBa1UP/index.m3u8#20210222$https://vod.bunediy.com/20210223/ums72ilX/index.m3u8#20210223$https://vod.bunediy.com/20210224/KF5Tkeau/index.m3u8#20210224$https://vod.bunediy.com/20210225/M3wbCEjQ/index.m3u8#20210225$https://vod.bunediy.com/20210226/xHFKn2Fh/index.m3u8#20210226$https://vod.bunediy.com/20210227/ExPf3J9y/index.m3u8#20210301$https://vod.bunediy.com/20210302/6rfc2wpj/index.m3u8#20210302$https://vod.bunediy.com/20210303/dBZnPC0X/index.m3u8#20210303$https://vod.bunediy.com/20210304/bahreDAz/index.m3u8#20210304$https://vod.bunediy.com/20210305/QGJ1ps5q/index.m3u8#20210305$https://vod.bunediy.com/20210306/yPDw8smT/index.m3u8#20210308$https://vod.bunediy.com/20210309/JwdzqZ6S/index.m3u8#20210309$https://vod.bunediy.com/20210310/TTgvG3ld/index.m3u8#20210310$https://vod.bunediy.com/20210311/hdKGzPCo/index.m3u8#20210311$https://vod.bunediy.com/20210312/BGEqkZXs/index.m3u8#20210312$https://vod.bunediy.com/20210313/s2yxIQuf/index.m3u8#20210315$https://vod.bunediy.com/20210316/AvScnmKj/index.m3u8#20210316$https://vod.bunediy.com/20210317/KaHMpbxa/index.m3u8#20210317$https://vod.bunediy.com/20210318/tnjMz7ht/index.m3u8#20210318$https://vod.bunediy.com/20210319/V54PZ8XT/index.m3u8#20210319$https://vod.bunediy.com/20210320/xAhHjCdz/index.m3u8#20210322$https://vod.bunediy.com/20210323/CfquxMhu/index.m3u8#20210323$https://vod.bunediy.com/20210324/Rzt2xGoM/index.m3u8#20210324$https://vod.bunediy.com/20210325/fxaplJNt/index.m3u8#20210325$https://vod.bunediy.com/20210326/EtDQ4PDD/index.m3u8#20210326$https://vod.bunediy.com/20210327/fWsrvmU9/index.m3u8#20210329$https://vod.bunediy.com/20210330/iXFfFhGx/index.m3u8#20210330$https://vod.bunediy.com/20210331/ow3o5vlh/index.m3u8#20210331$https://vod.bunediy.com/20210401/CuLgorfu/index.m3u8#20210401$https://vod.bunediy.com/20210402/i4yKXqYq/index.m3u8#20210402$https://vod.bunediy.com/20210403/8jVjjktJ/index.m3u8#20210405$https://vod.bunediy.com/20210406/LMnVT0Gx/index.m3u8#20210406$https://vod.bunediy.com/20210407/Bsm0X8OZ/index.m3u8#20210407$https://vod.bunediy.com/20210408/zUKTgg9h/index.m3u8#20210408$https://vod.bunediy.com/20210409/7Pl1mAdy/index.m3u8#20210409$https://vod.bunediy.com/20210410/4KWS2jOB/index.m3u8#20210412$https://vod.bunediy.com/20210413/TDjUMYPj/index.m3u8#20210413$https://vod.bunediy.com/20210414/XdKCAaEC/index.m3u8#20210414$https://vod.bunediy.com/20210415/QLioUO9N/index.m3u8#20210415$https://vod.bunediy.com/20210416/K7QtGPYG/index.m3u8#20210416$https://vod.bunediy.com/20210417/UQ5RLCKB/index.m3u8#20210419$https://vod.bunediy.com/20210420/poOfiLoz/index.m3u8#20210420$https://vod.bunediy.com/20210421/qSnRfy8n/index.m3u8#20210421$https://vod.bunediy.com/20210422/j2YJVAbd/index.m3u8#20210422$https://vod.bunediy.com/20210423/zFnJICe6/index.m3u8#20210423$https://vod.bunediy.com/20210424/YnR732fR/index.m3u8#20210426$https://vod.bunediy.com/20210427/By0Gjvr1/index.m3u8#20210427$https://vod.bunediy.com/20210428/2zZ6nzbc/index.m3u8#20210428$https://vod.bunediy.com/20210429/JCEqNylF/index.m3u8#20210429$https://vod.bunediy.com/20210430/8FrF9psC/index.m3u8#20210430$https://vod.bunediy.com/20210501/9h2sM3To/index.m3u8#20210503$https://vod.bunediy.com/20210504/hPttWk8U/index.m3u8#20210504$https://vod.bunediy.com/20210505/jD5teKp2/index.m3u8#20210505$https://vod.bunediy.com/20210506/yKc7bq65/index.m3u8#20210506$https://vod.bunediy.com/20210507/JidnC7H6/index.m3u8#20210507$https://vod.bunediy.com/20210508/ZUyFjMFA/index.m3u8#20210510$https://vod.bunediy.com/20210511/huOUcvIA/index.m3u8#20210511$https://vod.bunediy.com/20210512/kMtys1pa/index.m3u8#20210512$https://vod.bunediy.com/20210513/PvvAHEvv/index.m3u8#20210513$https://vod.bunediy.com/20210514/Us8msei1/index.m3u8#20210514$https://vod.bunediy.com/20210515/iulJVtc9/index.m3u8#20210517$https://vod.bunediy.com/20210518/v0V0nQzX/index.m3u8#20210518$https://vod.bunediy.com/20210519/sw2mLrNn/index.m3u8#20210519$https://vod.bunediy.com/20210520/hfBhaxJh/index.m3u8#20210520$https://vod.bunediy.com/20210521/OQOuaXuM/index.m3u8#20210521$https://vod.bunediy.com/20210522/SSFd29Qy/index.m3u8","_flag":"kbm3u8"}},"des":"<p>《女人我最大》是台湾一个女性类的电视娱乐节目，讨论各种女性感兴趣的话题——从头到脚，从里到外，从身体到心灵。本书根据中国大陆的流行趋势，对这个节目进行了深度挖掘和梳理，并有针对性地推荐了很多产品，是一本适合所有爱美女性的时尚读物。</p>"}

        if (this.controlState) {
            if (this.controlState.dl.dd instanceof Array) {
                for (const source of this.controlState.dl.dd) {
                    this.parsePlayList(source)
                }
            } else {
                this.parsePlayList(this.controlState.dl.dd)
            }
        }
    }

    parsePlayList(option: any) {
        const sourceUrl: Record<string, string> = {}
        option._t.split('#').forEach((item: string) => {
            const [name, url] = item.split('$');
            if (name && url) {
                sourceUrl[name] = url;
                if (this.first) {
                    this.selectedKey = option._flag
                    this.firstPlaySrc = url
                    this.first = false
                }
            }
        });
        this.sourceList[option._flag] = sourceUrl
    }

    playNext() {
        const srcs = Object.values(this.sourceList[this.selectedKey])
        const curIdx = srcs.indexOf(this.state.curPlaySrc)
        if (curIdx >= 0 && curIdx < srcs.length - 1) {
            this.setState({
                curPlaySrc: srcs[curIdx + 1]
            })
            this.xgPlayer!.src = srcs[curIdx + 1]
        }
    }

    componentDidMount(): void {
        this.setState({
            curPlaySrc: this.firstPlaySrc
        })
        this.xgPlayer = new HlsPlayer({
            el: this.refs.playWrapperRef as any,
            url: this.firstPlaySrc,
            id: 'tomatox',
            lang: 'zh-cn',
            width: '100%',
            height: '100%',
            autoplay: false,
            videoInit: true,
            screenShot: true,
            keyShortcut: 'off',
            crossOrigin: true,
            cssFullscreen: true,
            defaultPlaybackRate: 1,
            playbackRate: [0.25, 0.5, 0.75, 1, 1.25, 1.5, 1.75, 2, 3, 4, 5],
            playPrev: true,
            playNextOne: true,
            videoStop: true,
            showList: true,
            showHistory: true,
            quitMiniMode: true,
            videoTitle: true,
            airplay: true,
            closeVideoTouch: true,
            ignores: ['replay', 'error'], // 为了切换播放器类型时避免显示错误刷新，暂时忽略错误
            preloadTime: 300,
        })
        this.xgPlayer?.play()
        this.xgPlayer?.on('ended', this.playNext.bind(this))
    }

    componentWillUnmount(): void {
        this.xgPlayer?.off('ended', this.playNext.bind(this))
        this.xgPlayer?.destroy();
    }

    descSources() {
        const eles = []
        for (const key in this.sourceList) {
            eles.push(
                <Tabs.TabPane tab={key} key={key}>
                    {this.descSeries(this.sourceList[key])}
                </Tabs.TabPane>
            )
        }
        return eles
    }

    descSeries(playList: Record<string, string>) {
        console.log(playList)
        const eles = [];
        for (const key in playList) {
            eles.push(
                <span key={key} className={`${cssM.seriesTag} ${playList[key] === this.state.curPlaySrc ? cssM.seriesTagActive : ''}`}
                     onClick={() => {
                         if (this.state.curPlaySrc !== playList[key]) {
                             this.setState({curPlaySrc: playList[key]});
                             this.xgPlayer!.src = playList[key]
                         }
                     }} >
                    {key}
                </span>
            );
        }
        return eles;
    }

    render(): React.ReactNode {
        return (
            <>
                <div className={cssM.playFullHeader}>
                <span onClick={() => {
                    Control.go(-1)
                }}>
                    <LeftOutlined /> 返回
                </span>
                    <span>
                        {this.controlState?.name}
                </span>
                    <span>
                    <MinusOutlined onClick={() => {
                        ipcRenderer.send('WINDOW_MIN');
                    }}
                                   />
                    <BlockOutlined onClick={() => {
                        ipcRenderer.send('WINDOW_MAX');
                    }}
                                   />
                    <CloseOutlined onClick={() => {
                        ipcRenderer.send('WINDOW_CLOSE');
                    }}
                                   />
                </span>
                </div>
                <div className={cssM.playFullWrapper}>
                    <div ref={'playWrapperRef'} className={cssM.playerWrapper} />
                    <div className={cssM.videoInfoWrapper}>
                        <Scrollbars>
                            <div className={cssM.videoInfo}>
                                <Tabs className={cssM.sourceTab} onChange={ newKey => {
                                    this.selectedKey = newKey
                                    const curSrc = Object.values(this.sourceList[newKey])[0]
                                    this.setState({
                                        curPlaySrc: curSrc
                                    })
                                    this.xgPlayer!.src = curSrc
                                }
                                }>
                                    {this.descSources()}
                                </Tabs>
                            </div>
                        </Scrollbars>
                    </div>
                </div>
            </>
        );
    }

}