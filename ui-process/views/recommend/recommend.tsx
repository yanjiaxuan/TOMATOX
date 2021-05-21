import React, {useState} from "react";
import {Link} from "react-router-dom";
import {Button} from 'antd'

export default function Recommend() {
    const [ loading, setLoading ] = useState(true)
    const [ info, setInfo ] = useState('')
    return (
        <>
            <Link to={'/play'}>
                <Button type={'primary'}>Recommend</Button>
            </Link>
            <span>{info}</span>
        </>
    )
}