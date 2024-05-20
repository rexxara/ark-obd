import React, { useContext, useRef } from "react";
import { GlobalContext, RPMData } from "../../Context/global";
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import { message } from 'antd';
import Services from "../service";
import Echart from '../Echart';
interface IProps {

}
export default function Current(props: IProps) {
    const { context, dispatch } = useContext(GlobalContext);
    const _context = useRef<any>();
    _context.current = context;
    const currentItem = context.infoList.find(v => v.Name === context.current);
    const timer = useRef<any>(null);
    return <>
        <div>{currentItem ? currentItem.Name : "NoName"}</div>
        <div>{currentItem ? currentItem.Location : "NoLocation"}</div>
        <ButtonGroup variant="contained" aria-label="Basic button group">
            <Button onClick={reload}>reload</Button>
            <Button onClick={echo}>Echo</Button>
            <Button onClick={addTimer}>Start</Button>
            <Button onClick={removeTimer}>Stop</Button>
        </ButtonGroup>
        <Echart />
    </>
    async function echo() {
        if (currentItem) {
            const value = await Services.echo(currentItem.Location)
            message.success(value)
        }
    }
    function reload() {
        Services.getBleList().then(data => {
            dispatch?.({ type: 'infoList', payload: data })
        })
    }
    function addTimer() {
        timer.current = setInterval(getRpm, 250)
    }
    function removeTimer() {
        if (timer.current) {
            clearInterval(timer.current);
        }
        timer.current = null;
    }
    async function getRpm() {
        if (currentItem) {
            const value: string = await Services.getRpm(currentItem.Location)
            if (value.indexOf('410C') === 0) {
                const x16Value = value.substring(4);
                const decimalNumber = parseInt(x16Value, 16);
                const newValue: RPMData = {
                    value: decimalNumber / 4,
                    date: Date.now().valueOf()
                }
                const newArr = [..._context.current.rpmDataList, newValue];
                while (newArr.length > 30) {
                    newArr.shift();
                }
                dispatch?.({ type: 'rpmDataList', payload: newArr });
            }
            //410C133E
        }
    }
}