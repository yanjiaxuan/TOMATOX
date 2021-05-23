import React from 'react';
import TOMATOX_ICON from '@/images/svg/icon.svg';
import cssM from './developing.scss';

export default function developing(props: any) {
    return (
        <div className={cssM.developing}>
            <div>
                <img src={TOMATOX_ICON} />
            </div>
            <span>功能正在马不停蹄的开发中</span>
        </div>
    )
}