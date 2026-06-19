import { useState,useEffect,useRef } from "react";
import nearestTime from '../functions/nearestTime'
function HeaderTimer({lectureSlot}) {
    const currentRef = useRef(null)
    const pause = useRef(false)
    const [displayText,setDisplayText] = useState('計算中...')
    const rafIdRef = useRef(null)
    useEffect(()=>{
        if (!lectureSlot || lectureSlot.length === 0) return
        currentRef.current = null
        const startLecture = lectureSlot.map((item) => {
            const [h, m] = item.start.split(":").map((i)=>{return Number(i)})
            return { hour: h, minute: m ,sec: 0}
        })
        const endLecture = lectureSlot.map((item) => {
            const [h, m] = item.end.split(":").map((i)=>{return Number(i)})
            return { hour: h, minute: m ,sec: 0}
        })
        const timer = (ts) => {
            if(pause.current) return;
            const now = new Date();
            const date = now.getDay();
            if (date === 0 || date === 6) {
                setDisplayText("本日は休日です。");
                return;
            }
            if(currentRef.current === null) {currentRef.current = ts}
            const eps = ts - currentRef.current
            if(eps >= 1000){
                currentRef.current = ts
                const now = new Date()
                const hour = now.getHours()
                const minute = now.getMinutes()
                const sec = now.getSeconds()
                const nowObj = {hour:hour,minute:minute,sec:sec}
                const nearest = nearestTime(nowObj,startLecture,endLecture)
                console.log(nearest.statu);
               setDisplayText(nearest.text)
            }
            rafIdRef.current = requestAnimationFrame(timer)
        }
        rafIdRef.current = requestAnimationFrame(timer)
        return () => {
            if(rafIdRef.current){
                cancelAnimationFrame(rafIdRef.current)
            }
        }
    },[lectureSlot])
    return(
        <div className="header-timer">
            <p>{displayText}</p>
        </div>
    )
}
export default HeaderTimer