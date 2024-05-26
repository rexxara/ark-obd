import React, { useContext } from "react"
import GlassContainer from "./GlassContainer"
import RPMChart from "../Charts/RPMChart"
import SpeedBar from "../SpeedBar"
import { GlobalContext } from "../../Context/global";
import SpeedChart from "../Charts/SpeedChart";
export default function DashBoard() {
    const { context } = useContext(GlobalContext);
    return <div className="dashBoardMain">
        <div style={{ textAlign: 'center' }}>VIN:{context.carInfo.vin}</div>
        <SpeedBar />
        <GlassContainer>
            <div style={{ display: 'flex' }}>
                <SpeedChart />
                <RPMChart />
            </div>
            {/* <RpmBoard /> */}
        </GlassContainer>
        {/* <Bokeh1Background /> */}
    </div>
}