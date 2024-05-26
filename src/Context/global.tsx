import React from 'react';
import { CommandType } from './Model';

export interface GlobalContextType {
    type: "setting" | "main"
    infoList: BleInfo[],
    current: string;
    rpmDataList: RPMOrSpeedData[],
    speedDataList: RPMOrSpeedData[],
    requestTimerMap: TimerMap,
    lastUpdateMap: TimerMap,
    timeFrameGap: number,
    carInfo: {
        vin: string;
    }
}
export interface TimerMap {
    [CommandType.RPM]: number,
    [CommandType.SPEED]: number,
    [CommandType.VIN]: number,
}
export interface RPMOrSpeedData {
    value: number,
    date: {
        seconds: number;
        minutes: number;
    }
}
export interface BleInfo {
    Name: string;
    Location: string;
    Alias: string;
    DeviceState: number;
    Type: number;
}
export const GlobalContextDefaultValue: GlobalContextType = {
    infoList: [],
    current: "OBDII",
    rpmDataList: [],
    type: 'main',
    timeFrameGap: 200,
    requestTimerMap: {
        [CommandType.RPM]: 400,
        [CommandType.SPEED]: 400,
        [CommandType.VIN]: 1000 * 60 * 60 * 24 * 30, //30day
    },
    lastUpdateMap: {
        [CommandType.RPM]: 0,
        [CommandType.SPEED]: 0,
        [CommandType.VIN]: 0,
    },
    carInfo: {
        vin: ''
    },
    speedDataList: []
};
export const GlobalContext = React.createContext<{
    context: GlobalContextType;
    dispatch?: (action: { type: keyof GlobalContextType, payload: any }) => void
}>({ context: GlobalContextDefaultValue });

function reducer(state: GlobalContextType, action: {
    type: keyof GlobalContextType;
    payload: any;
}): GlobalContextType {
    return { ...state, [action.type]: action.payload };
}

export const GlobalContextProvider = (props: any) => {
    const [value, dispatch] = React.useReducer(reducer, GlobalContextDefaultValue);
    return <GlobalContext.Provider value={{ context: value, dispatch: dispatch }}>
        {props.children}
    </GlobalContext.Provider>;
};