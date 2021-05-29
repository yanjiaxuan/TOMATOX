import React, { useState } from 'react';
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
    const [collects, setCollects] = useState<string[]>([]);

    async function doCollect(data: IplayResource) {
        (await Indexed.getInstance()).insertOrUpdate(TABLES.TABLE_COLLECT, {
            ...data,
            collectDate: Date.now()
        });
    }

    async function cancelCollect(id: string) {
        (await Indexed.getInstance()).deleteById(TABLES.TABLE_COLLECT, id);
    }

    Indexed.getInstance()
        .then(db => {
            return db.queryAllKeys(TABLES.TABLE_COLLECT);
        })
        .then(res => {
            setCollects(res as string[]);
        });
    const cardsData = props.data;
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
                                    {collects.indexOf(ele.id) >= 0 ? (
                                        <HeartFilled
                                            className={cssM.resourceCollect}
                                            onClick={e => {
                                                cancelCollect(ele.id);
                                                e.stopPropagation();
                                                e.preventDefault();
                                            }}
                                            />
                                    ) : (
                                        <HeartOutlined
                                            className={cssM.resourceNotCollect}
                                            onClick={e => {
                                                doCollect(ele);
                                                e.stopPropagation();
                                                e.preventDefault();
                                            }}
                                            />
                                    )}
                                </div>
                            </div>
                            <span>{ele.name}</span>
                            <span>
                                {ele.lastPlayTime || ele.lastPlayDrama ? '' : ele.actor || '未知'}
                            </span>
                            {(ele.lastPlayTime || ele.lastPlayDrama) && (
                                <span>{`观看至 ${ele.lastPlayDrama || ''} ${timeConverter(
                                    ele.lastPlayTime || 0
                                )}`}</span>
                            )}
                        </div>
                    </Link>
                </span>
            );
        }
        return res;
    }
    return <div className={cssM.cardList}>{convertEle()}</div>;
}
