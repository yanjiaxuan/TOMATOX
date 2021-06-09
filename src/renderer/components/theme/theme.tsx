import React, { useEffect, useState } from 'react';
import store from '@/utils/store';
import { getTheme } from '@/utils/db/storage';

const themeMap = {
    dark: {
        headerBG: '#4a4a4a',
        header2ndBG: '#444444',
        color: '#f1f1f1',
        headerInputBG: '#696666',
        placeholderColor: '#adadad',
        logoBG: '#3a3a3a',
        contentBG: '#403f3f'
    },
    light: {
        headerBG: '#e8e8e8',
        header2ndBG: '#efefef',
        color: '#525252',
        headerInputBG: '#dcdcdc',
        placeholderColor: '#787878',
        logoBG: '#dedede',
        contentBG: '#f9f9f9'
    }
};

export default function theme() {
    const [curTheme, setCurTheme] = useState<'dark' | 'light'>(getTheme());

    useEffect(() => {
        return store.subscribe('TOMATOX_THEME', (val: any) => {
            setCurTheme(val);
        });
    });

    return (
        <style>
            {` a { color: ${themeMap[curTheme].color}!important; }`}
            {`.ant-tabs-tab-btn { color: ${themeMap[curTheme].color}!important }`}
            {`.theme-header { background-color: ${themeMap[curTheme].headerBG}; color: ${themeMap[curTheme].color} }`}
            {`.theme-input input { background-color: ${themeMap[curTheme].headerInputBG}; border-color: ${themeMap[curTheme].headerInputBG}; color: ${themeMap[curTheme].color} }`}
            {`.theme-input input::-webkit-input-placeholder { color: ${themeMap[curTheme].placeholderColor} }`}
            {`.theme-logo { background-color: ${themeMap[curTheme].logoBG}; color: ${themeMap[curTheme].color} }`}
            {`.theme-content { background-color: ${themeMap[curTheme].contentBG}; color: ${themeMap[curTheme].color} }`}
            {`.theme-color { color: ${themeMap[curTheme].color} }`}
            {`.theme-2nd-header { background-color: ${themeMap[curTheme].header2ndBG}; color: ${themeMap[curTheme].color} }`}
        </style>
    );
}
