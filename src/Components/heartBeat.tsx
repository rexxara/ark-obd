import React, { useContext, useEffect, useRef } from "react";
import Services from "./service";
import { BleInfo, GlobalContext, GlobalContextType, RPMOrSpeedData, TimerMap } from "../Context/global";
import { CommandType } from "../Context/Model";
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
        timer.current = setTimeout(getRpm, context.timeFrameGap)
    }
    function removeTimer() {
        if (timer.current) {
            clearInterval(timer.current);
        }
        timer.current = null;
    }
    async function getRpm() {
        const now = Date.now().valueOf();
        const context: GlobalContextType = _context.current;
        const toRequsetList: CommandType[] = [];
        Object.keys(CommandType).forEach((key) => {
            const lastUpdateTime = context.lastUpdateMap[key];
            const configTimeGap = context.requestTimerMap[key];
            const timeGap = now - lastUpdateTime;
            if (timeGap > configTimeGap) {
                toRequsetList.push(key as CommandType);
            }
        });
        if (toRequsetList.length !== 0) {
            const res = await Services.heartBeat(props.currentItem.Location, toRequsetList)
            const { RPM, SPEED, VIN } = res;
            const date = convertMillisecondsToMinutesSeconds(Date.now().valueOf() - initTime);
            if (VIN) {
                dispatch?.({ type: 'carInfo', payload: { ...context.carInfo, vin: VIN } });
            }
            if (RPM) {
                const newValue: RPMOrSpeedData = {
                    value: RPM,
                    date: date
                }
                const newArr = [...context.rpmDataList, newValue];
                while (newArr.length > 30) {
                    newArr.shift();
                }
                dispatch?.({ type: 'rpmDataList', payload: newArr });
            }

            if (SPEED) {
                const newValue: RPMOrSpeedData = {
                    value: SPEED,
                    date: date
                }
                const newArr = [...context.speedDataList, newValue];
                while (newArr.length > 30) {
                    newArr.shift();
                }
                dispatch?.({ type: 'speedDataList', payload: newArr });
            }


            const newLastUpdateMap: TimerMap = { ...context.lastUpdateMap };
            toRequsetList.forEach((key) => {
                newLastUpdateMap[key] = now;
            })
            dispatch?.({ type: 'lastUpdateMap', payload: newLastUpdateMap });
        }
        timer.current = setTimeout(getRpm, context.timeFrameGap)
    }
    return <></>
}
function convertMillisecondsToMinutesSeconds(milliseconds) {
    const totalSeconds = Math.floor(milliseconds / 1000);
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;

    return { minutes, seconds };
}