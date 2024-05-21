import React, { useEffect, useContext } from 'react'
import VConsole from 'vconsole';
import Services from './Components/service'
const vConsole = new VConsole();
import { GlobalContext } from "./Context/global";
import { FloatButton } from 'antd';
import { SettingOutlined } from '@ant-design/icons';
import SettingPage from './Components/SettingPage';
import DashBoard from './Components/DashBoard';
import HeartBeat from './Components/heartBeat';
function App() {
    const { context, dispatch } = useContext(GlobalContext);
    const { type } = context;
    useEffect(() => {
        Services.getBleList().then(data => {
            dispatch?.({ type: 'infoList', payload: data })
        })
    }, [])

    const currentItem = context.infoList.find(v => v.Name === context.current);
    return <div style={{ width: "100vw", height: '100vh', overflow: 'hidden' }}>
        {currentItem && <HeartBeat currentItem={currentItem} />}
        {type === "main" && <DashBoard />}
        {type === "setting" && <SettingPage />}
        <FloatButton
            shape="circle"
            type="primary"
            onClick={toggleSetting}
            style={{ right: 0, bottom: 60 }}
            icon={<SettingOutlined />}
        />
    </div>;

    function toggleSetting(): void {
        dispatch?.({ type: 'type', payload: type === 'setting' ? "main" : "setting" })
    }
}

export default App
