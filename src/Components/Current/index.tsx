import React, { useContext, useRef } from "react";
import { GlobalContext } from "../../Context/global";
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import { message } from 'antd';
import Services from "../service";
interface IProps {

}
export default function Current(props: IProps) {
    const { context, dispatch } = useContext(GlobalContext);
    const _context = useRef<any>();
    _context.current = context;
    const currentItem = context.infoList.find(v => v.Name === context.current);
    return <>
        <div>{currentItem ? currentItem.Name : "NoName"}</div>
        <div>{currentItem ? currentItem.Location : "NoLocation"}</div>
        <ButtonGroup variant="contained" aria-label="Basic button group">
            <Button onClick={reload}>reload</Button>
            <Button onClick={echo}>Echo</Button>
            <Button onClick={disConnect}>DisConnet</Button>
            {/* <Button onClick={addTimer}>Start</Button>
            <Button onClick={removeTimer}>Stop</Button> */}
        </ButtonGroup>
    </>
    async function echo() {
        if (currentItem) {
            const value = await Services.echo(currentItem.Location)
            message.success(value)
        }
    }
    function disConnect() {
        Services.disconnect().then(data => {
            message.success(JSON.stringify(data))
        })
    }
    function reload() {
        Services.getBleList().then(data => {
            dispatch?.({ type: 'infoList', payload: data })
        })
    }
}