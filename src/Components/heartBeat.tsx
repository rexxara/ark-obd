import React, { useContext, useEffect, useRef } from "react";
import Services from "./service";
import { BleInfo, GlobalContext, RPMData } from "../Context/global";
const initTime = Date.now().valueOf();
interface IProps {
    currentItem: BleInfo;
}

export default function HeartBeat(props: IProps) {
    useEffect(() => {
        addTimer()
        return () => {
            removeTimer()
        }
    }, [])
    const timer = useRef<any>(null);
    const { context, dispatch } = useContext(GlobalContext);
    const _context = useRef<any>();
    _context.current = context;
    function addTimer() {
        timer.current = setTimeout(getRpm, context.heartBeatGap)
    }
    function removeTimer() {
        if (timer.current) {
            clearInterval(timer.current);
        }
        timer.current = null;
    }
    async function getRpm() {
        const rpm = await Services.getRpm(props.currentItem.Location)
        const timeComponents = convertMillisecondsToMinutesSeconds(Date.now().valueOf() - initTime);
        const newValue: RPMData = {
            value: rpm,
            date: timeComponents
        }
        const newArr = [..._context.current.rpmDataList, newValue];
        while (newArr.length > 30) {
            newArr.shift();
        }
        dispatch?.({ type: 'rpmDataList', payload: newArr });
        //410C133E
        timer.current = setTimeout(getRpm, _context.current.heartBeatGap)
    }
    return <></>
}
function convertMillisecondsToMinutesSeconds(milliseconds) {
    const totalSeconds = Math.floor(milliseconds / 1000);
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;

    return { minutes, seconds };
}