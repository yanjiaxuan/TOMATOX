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
        // this.controlState = {"last":"2021-05-25 11:08:49","id":29980,"tid":15,"name":"某一天灭亡走进我家门","type":"日韩剧","pic":"http://img.kuaibozy.net/upload/vod/20210510-1/cede2eb39e4ff156cdbd77528da83d25.jpg","lang":"韩语","area":"韩国","year":2021,"state":"","note":"更新至05集","actor":"朴宝英,徐仁国,李洙赫,姜泰伍,申度贤","director":"权英日","dl":{"dd":{"_t":"第01集$https://vod.bunediy.com/20210510/W4kEEgR1/index.m3u8#第02集$https://vod.bunediy.com/20210511/mU5uTDr9/index.m3u8#第03集$https://vod.bunediy.com/20210519/jxigWUOR/index.m3u8#第04集$https://vod.bunediy.com/20210519/PhKgPjMB/index.m3u8#第05集$https://vod.bunediy.com/20210525/HHmFgCQF/index.m3u8","_flag":"kbm3u8"}},"des":"<p>tvN电视剧《某一天灭亡走进我家门》。该剧讲述的是使万物消失的源头“灭亡”和为了不消失而签下生命合约的人类“东景”之间发生的致命限定100天的魔幻浪漫剧，由权英日执导，林回音执笔，Studio&amp;New及DragonStudio企划制作，预计于2021年上半年播出。 &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;<br/>\n &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;朴宝英饰演网络小说编辑者“卓同景”，平凡的生活中因意料之外的命运堵上自身性命与爱情的人类。 &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;<br/>\n &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;徐仁国饰演跟卓同景签约的“灭亡”，介入狠毒命运在意外的生活下照射出自身怜悯和爱的特别存在。 &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;<br/>\n &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;李洙赫饰演网络小说编辑组长“车周益”，和卓同景同公司，同时也是初吻能力男，甜蜜语言，动摇心脏的肌肤接触，有着让作家们的爱情才能燃烧这一能力的人物。 &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;<br/>\n &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;姜泰伍饰演初恋后悔男“李贤圭”，从对爱一直逃跑的少年到为了作为初恋经历大人成长痛的咖啡店社长，也是车周益的同居人。 &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;<br/>\n &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;申道贤饰演网络小说作家“罗智娜”，是在初吻能力男和初恋后悔男之间偶然陷入三角关系的女主角。</p>","fullList":[{"flag":"kbm3u8","list":["第01集$https://vod.bunediy.com/20210510/W4kEEgR1/index.m3u8","第02集$https://vod.bunediy.com/20210511/mU5uTDr9/index.m3u8","第03集$https://vod.bunediy.com/20210519/jxigWUOR/index.m3u8","第04集$https://vod.bunediy.com/20210519/PhKgPjMB/index.m3u8","第05集$https://vod.bunediy.com/20210525/HHmFgCQF/index.m3u8"]}]}

        if (this.controlState) {
            if (this.controlState.dl.dd instanceof Array) {
                let idx = 1
                for (const source of this.controlState.dl.dd) {
                    this.parsePlayList({ _flag: `播放列表${idx === 1 ? '' : idx}`, _t: source._t })
                    idx++
                }
            } else {
                this.parsePlayList({ _flag: '播放列表', _t: this.controlState.dl.dd._t })
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
                                <Tabs defaultActiveKey={'播放列表'} className={cssM.sourceTab} onChange={ newKey => {
                                    this.selectedKey = newKey.includes('播放列表') ? newKey : this.selectedKey
                                } }>
                                    {this.descSources()}
                                    <Tabs.TabPane tab={'详情'} key={'详情'}>
                                        <div className={cssM.detailHeaderWrapper}>
                                            <img className={cssM.detailImage} src={this.controlState?.pic} />
                                            <div className={cssM.detailTextWrapper}>
                                                <div className={cssM.detailTitle}>{this.controlState?.name}</div>
                                                <div>
                                                    <div className={cssM.detailContent}>状态：{this.controlState?.state}</div>
                                                    <div className={cssM.detailContent}>年份：{this.controlState?.year}</div>
                                                    <div className={cssM.detailContent}>类型：{this.controlState?.type}</div>
                                                    <div className={cssM.detailContent}>地区：{this.controlState?.area}</div>
                                                    <div className={cssM.detailContent}>导演：{this.controlState?.director}</div>
                                                    <div className={cssM.detailContent}>主演：{this.controlState?.actor}</div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className={cssM.detailNote}>{this.controlState?.note}</div>
                                        <div className={cssM.detailDescTitle}>简介</div>
                                        <div className={cssM.detailDesc} dangerouslySetInnerHTML={{__html: this.controlState?.des}} />
                                    </Tabs.TabPane>
                                </Tabs>
                            </div>
                        </Scrollbars>
                    </div>
                </div>
            </>
        );
    }

}