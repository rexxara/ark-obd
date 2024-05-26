import React, { useContext } from "react";
import { GlobalContext } from "../../Context/global";

interface IProps {

}
const divideTime = 50;
const containerStyle: React.CSSProperties = { width: "4vw", height: '95vh', position: 'absolute', left: '0.5vw', top: '2.5vh' };
const barStyle: React.CSSProperties = { width: "4vw", background: "#F0F0F0", height: '1.4vh', marginBottom: '0.5vh' };
export default function SpeedBar(props: IProps) {
    const { context } = useContext(GlobalContext);
    const lastItem = context.speedDataList[context.speedDataList.length - 1];
    const percent = Math.floor(Math.min((lastItem?.value || 0) / 160 * 100, 100));
    //const percent = 100;
    const blockNum = Math.floor(divideTime * percent / 100);
    const bg = getGradientColor(percent);
    return <>{lastItem ? <div style={containerStyle}>
        {new Array(divideTime).fill(1).map((v, index) => {
            const _index = divideTime - index;
            let addonStyle: React.CSSProperties = {}
            if (_index === 25) {
                addonStyle = {
                    background: 'red',
                }
                return <div key={index} style={{ ...barStyle, ...addonStyle }}></div>
            }
            if (_index > blockNum) {
                return <div key={index} style={barStyle}></div>
            }
            return <div key={index} style={{ ...barStyle, background: bg }}></div>
        })}
    </div> : ""}</>
}
function getGradientColor(percentage: number) {
    // 确保百分比在 0-100 之间
    percentage = Math.max(0, Math.min(100, percentage));

    // 计算 Hue 值
    const hue = (1 - percentage / 100) * 120; // 从绿色(120度)过渡到红色(0度)

    // 固定饱和度和亮度
    const saturation = 100;
    const lightness = 50;

    // 返回 HSL 颜色字符串
    return `hsl(${hue}, ${saturation}%, ${lightness}%)`;
}