import React, { useContext, useEffect, useRef } from "react";
import { GlobalContext } from "../Context/global";
import * as echarts from 'echarts';
interface IProps {

}
export default function BLeList(props: IProps) {
    const { context, dispatch } = useContext(GlobalContext);
    const chartRef = useRef<any>();
    useEffect(() => {
        chartRef.current = echarts.init(document.getElementById('echRoot'));
        chartRef.current.setOption({
            xAxis: {
                type: 'category',
                data: []
            },
            yAxis: {
                type: 'value'
            },
            series: [
                {
                    data: [],
                    type: 'line',
                    smooth: true
                }
            ]
        })
    }, []);
    useEffect(() => {
        if (chartRef.current) {
            chartRef.current.setOption({
                xAxis: {
                    data: context.rpmDataList.map(v => v.date)
                },
                series: [
                    {
                        data: context.rpmDataList.map(v => v.value)
                    }
                ]
            });
        }
    }, [context.rpmDataList])
    return <div id="echRoot">

    </div>
}