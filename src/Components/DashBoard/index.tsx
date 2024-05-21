import React from "react"
import Bokeh1Background from "./Bokeh1Background/background"
import GlassContainer from "./GlassContainer"
import RPMChart from "../RPMChart"
export default function DashBoard() {
    return <div className="dashBoardMain">
        <GlassContainer>
            <RPMChart />
            {/* <RpmBoard /> */}
        </GlassContainer>
        {/* <Bokeh1Background /> */}
    </div>
}