import React, { useEffect } from "react"
import './style.css'
import { Bokeh1Background } from './bokeh1.cdn.min.js'
import logo from 'threejs-components/build/assets/bokeh-particles2.png'
export default function Main() {
    useEffect(() => {
        const bokeh1Background = Bokeh1Background(document.getElementById('webgl-canvas'));
        bokeh1Background.loadMap(logo)
        bokeh1Background.setColors([0x6d4862, 0xfd826c, 0x22ccc1])
    }, [])
    return <div id="app">
        <canvas id="webgl-canvas"></canvas>
    </div>
}