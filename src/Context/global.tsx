import React from 'react';

export interface GlobalContextType {
    infoList: BleInfo[],
    current: string;
    rpmDataList: RPMData[]
}
export interface RPMData {
    value: number,
    date: number
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
    rpmDataList: []
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