import React from 'react';
import cssM from './recommend.scss';

export default function CardStream(props: any) {
    const returnEle = []
    for (const ele of props.items) {
        returnEle.push(<div key={ele.id}>
            <img src={ele.pic} className={cssM.descImg} />
            <span>演员 : {ele.actor}</span>
            <span>地区 : {ele.area}</span>
            <span>描述 : {ele.des}</span>
            <span>主演 : {ele.director}</span>
            <span>语言 : {ele.lang}</span>
            <span>最后更新 : {ele.last}</span>
            <span>片名 : {ele.name}</span>
            <span>备注 : {ele.note}</span>
            <span>状态 : {ele.state}</span>
            <span>类型 : {ele.type}</span>
            <span>年份 : {ele.year}</span>
        </div>)
    }
    return <div>returnEle</div>
}