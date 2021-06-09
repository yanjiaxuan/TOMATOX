import React from 'react';
import logo from '@/images/svg/icon.svg';
import cssM from './custom-spin.scss';

export default function CustomSpin() {
    return (
        <span className={cssM.loadingIconWrapper}>
            <img src={logo} width={35} className={cssM.loadingIcon} />
            <div className={[cssM.loadingText, 'theme-color'].join(' ')}>Loading...</div>
        </span>
    );
}
