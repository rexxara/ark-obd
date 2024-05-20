import React, { useEffect, useContext } from 'react'
import VConsole from 'vconsole';
import Services from './Components/service'
import Main from './Components/Tabs';
const vConsole = new VConsole();
import { GlobalContext } from "./Context/global";
function App() {
    const { dispatch } = useContext(GlobalContext);
    useEffect(() => {
        Services.getBleList().then(data => {
            dispatch?.({ type: 'infoList', payload: data })
        })
    }, [])
    return <Main />;
}

export default App
