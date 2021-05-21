import React from "react";
import logo from '../../images/svg/icon.svg'
import './custom-spin.css'

export default function CustomSpin() {
    return (
        <span className={'loading-icon-wrapper'}>
            <img src={logo} width={35} className={'loading-icon'} />
            <div className={'loading-text'}>Loading...</div>
        </span>
    )
}