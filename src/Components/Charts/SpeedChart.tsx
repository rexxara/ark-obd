import React, { useContext, useEffect, useRef } from "react";
import { GlobalContext } from "../../Context/global";
import * as echarts from 'echarts';
import { FieldTimeOutlined, RiseOutlined } from "@ant-design/icons";
interface IProps {

}
export default function SpeedChart(props: IProps) {
    const { context, dispatch } = useContext(GlobalContext);
    const chartRef = useRef<any>();
    useEffect(() => {
        chartRef.current = echarts.init(document.getElementById('speedChatRoot'));
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
                    type: 'line',
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
                    data: context.speedDataList.map(v => "" + v.date.minutes + ":" + v.date.seconds)
                },
                series: [
                    {
                        data: context.speedDataList.map(v => v.value)
                    }
                ]
            });
        }
    }, [context.speedDataList])
    const lastItem = context.speedDataList[context.speedDataList.length - 1];
    return <div>
        <div style={{ width: '45vw', display: 'flex', justifyContent: 'space-between', alignItems: "center" }}>
            <h2><RiseOutlined />:{lastItem && lastItem.value}km/h</h2>
            <h2><FieldTimeOutlined />:{lastItem && (lastItem.date.minutes + "m" + lastItem.date.seconds + "s")}</h2>
        </div>
        <div id="speedChatRoot"></div>
    </div>
}