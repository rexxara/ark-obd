import React, { useContext, useEffect, useRef } from "react";
import { GlobalContext } from "../../Context/global";
import * as echarts from 'echarts';
import { RedoOutlined } from "@ant-design/icons";
interface IProps {

}
export default function RPMChart(props: IProps) {
    const { context, dispatch } = useContext(GlobalContext);
    const chartRef = useRef<any>();
    useEffect(() => {
        chartRef.current = echarts.init(document.getElementById('rpmChatRoot'));
        chartRef.current.setOption({
            animation: false,
            xAxis: {
                type: 'category',
                data: [],
                show: false
            },
            grid: {
                x: 0,
                y: 0,
                x2: 0,
                y2: 0,
                containLabel: true
            },
            yAxis: {
                type: 'value'
            },
            series: [
                {
                    data: [],
                    type: 'bar',
                    areaStyle: {},
                    smooth: true,
                    lineStyle: {
                        width: 0
                    },
                    showSymbol: false,
                    color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                        { offset: 1, color: '#80FFA5' },
                        { offset: 0.85, color: '#00DDFF' },
                        { offset: 0.7, color: '#37A2FF' },
                        { offset: 0.5, color: '#FF0087' },
                        { offset: 0, color: '#FFBF00' }
                    ])
                }
            ]
        })
    }, []);
    useEffect(() => {
        if (chartRef.current) {
            chartRef.current.setOption({
                xAxis: {
                    data: context.rpmDataList.map(v => "" + v.date.minutes + ":" + v.date.seconds)
                },
                series: [
                    {
                        data: context.rpmDataList.map(v => v.value)
                    }
                ]
            });
        }
    }, [context.rpmDataList])
    const lastItem = context.rpmDataList[context.rpmDataList.length - 1];
    return <div>
        <div style={{ width: '45vw', display: 'flex', justifyContent: 'space-between', alignItems: "center" }}>
            <h2></h2>
            <h2><RedoOutlined />:{lastItem && lastItem.value}r/min</h2>
        </div>
        <div id="rpmChatRoot"></div>
    </div>
}