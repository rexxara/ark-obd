import React from 'react'
import { useState } from 'react'
import VConsole from 'vconsole';
import echoTest from './js/plugins/echo';
import { Button } from 'antd';
const vConsole = new VConsole();

function App() {
    const [count, setCount] = useState(0)

    return (
        <>
            <div className="card">
                <Button onClick={() => setCount((count) => count + 1)}>
                    count is {count}
                </Button>
                <p>
                    Edit <code>src/App.tsx</code> and save to test HMR
                </p>
            </div>
            <Button onClick={echoTest}>echoTest
            </Button>
        </>
    )
}

export default App
