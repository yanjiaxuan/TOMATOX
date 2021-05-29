import React, { useEffect, useState } from 'react';
import { Link } from 'react-keeper';
import TOMATOX_ICON from '@/images/svg/icon.svg';
import { HeartOutlined, HeartFilled } from '@ant-design/icons';
import Indexed from '@/utils/db/indexed';
import { TABLES } from '@/utils/constants';
import cssM from './tomatox-waterfall.scss';

function timeConverter(time: number) {
    const hours = Math.floor(time / 3600);
    const minutes = Math.floor((time % 3600) / 60);
    const senconds = Math.floor(time % 60);
    const ms = `${minutes < 10 ? '0' : ''}${minutes}:${senconds < 10 ? '0' : ''}${senconds}`;
    return hours === 0 ? ms : `${hours < 10 ? '0' : ''}${hours}:${ms}`;
}

export default function tomatoxWaterfall(props: { data: IplayResource[] }) {
    const [collectRes, setCollectRes] = useState(Indexed.collectedRes);
    const cardsData = props.data;
    cardsData.forEach(item => {
        if (item.lastPlayDrama || item.lastPlayTime) {
            item.lastPlayDesc = `观看至 ${item.lastPlayDrama || ''} ${timeConverter(
                item.lastPlayTime || 0
            )}`;
        }
    });
    function convertEle() {
        const res = [];
        for (const ele of cardsData) {
            res.push(
                <span key={ele.id}>
                    <Link to={`/play`} state={ele}>
                        <div key={ele.id} className={cssM.card}>
                            <div>
                                <img src={ele.picture} className={cssM.descImg} />
                                <span className={cssM.topRightTitle}>{ele.remark}</span>
                                <div>
                                    {collectRes.has(ele.id) ? (
                                        <HeartFilled
                                            className={cssM.resourceCollect}
                                            onClick={e => {
                                                Indexed.instance?.cancelCollect(ele.id);
                                                setCollectRes(new Set(Indexed.collectedRes));
                                                e.stopPropagation();
                                                e.preventDefault();
                                            }}
                                            />
                                    ) : (
                                        <HeartOutlined
                                            className={cssM.resourceNotCollect}
                                            onClick={e => {
                                                Indexed.instance?.doCollect(ele);
                                                setCollectRes(new Set(Indexed.collectedRes));
                                                e.stopPropagation();
                                                e.preventDefault();
                                            }}
                                            />
                                    )}
                                </div>
                            </div>
                            <span>{ele.name}</span>
                            <span>{ele.lastPlayDesc ? '' : ele.actor || '未知'}</span>
                            {ele.lastPlayDesc && <span>{ele.lastPlayDesc}</span>}
                        </div>
                    </Link>
                </span>
            );
        }
        return res;
    }
    return <div className={cssM.cardList}>{convertEle()}</div>;
}
