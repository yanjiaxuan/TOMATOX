import React from 'react';
import cssM from './global-loading.scss';
import logo from '@/images/svg/icon.svg';

export default function() {
    return (
        <div className={cssM.globalLoadingWrapper}>
            <img src={logo} width={80} className={cssM.loadingIcon} />
            <div className={cssM.loadingText}>TOMATOX</div>
        </div>
    );
}
