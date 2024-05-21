import React, { useEffect } from "react"
import style from './styles.module.css';
interface IProps {
    children: any
}
export default function GlassContainer(props: IProps) {
    return <div className={style.GlassContainer}>{props.children}</div>
}