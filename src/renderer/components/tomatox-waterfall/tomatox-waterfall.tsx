import React from 'react';
import { Link } from 'react-keeper';
import TOMATOX_ICON from '@/images/svg/icon.svg';
import cssM from './tomatox-waterfall.scss';

export default function tomatoxWaterfall(props: any) {
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
                            </div>
                            <span>{ele.name}</span>
                            <span>{ele.actor || '未知'}</span>
                        </div>
                    </Link>
                </span>
            );
        }
        return res;
    }
    return <div className={cssM.cardList}>{convertEle()}</div>;
}
