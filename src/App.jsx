import { useState,useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import './App.css'
import Schedule from './Schedule'
import Setting from './Setting'
import { timeAdd } from '../functions/timeAdd'
import HeaderTimer from './HeaderTimer'
const generateTestData = (periods) => {
  const res = []
  for (let d = 0; d < 5; d++) {
  const lec = []
  const testObj = {
    name : '', //講義名
    normal: 0, //平常点
    test: 100, //テスト
    other: 0, //その他
    absent : 0, //欠席数
    lateness : 0, //遅刻数
    memo:'', //メモ
  }
  for (let p = 0; p < periods; p++) {
    lec.push({ ...testObj }) 
  }
  res.push(lec) 
  }
  return res
}
const weekDays = ["月", "火", "水", "木", "金"]
function App() {
  const savedSettings = localStorage.getItem('settings')
  const savedSchedule = localStorage.getItem('schedule')
  const [settings, setSettings] = useState(()=>{
    const savedSettings = localStorage.getItem('settings')
    return (savedSettings) ? JSON.parse(savedSettings) : {
      start : '9:15', //始業時間
      lectureTime : 90, //1コマの時間(分)
      periods : 6, //何限まであるか
      breakTime : 15, //休憩時間(分)
      lunchBreak : 60, //昼休みの時間(分)
      whenLunch : 2, //何限の後に昼休みがあるか
      canAbsent : 4, //何回休めるか
      departure : Array.from({length:5}, () => '9:00'), //出発時間
    }
  })
  const [schedule, setSchedule] = useState(()=>{
    const savedSchedule = localStorage.getItem('schedule')
    console.log(generateTestData(settings.periods));
    return (savedSchedule) ? JSON.parse(savedSchedule) : generateTestData(settings.periods)
  })
  const [lectures,setLectures] = useState([])
  const [viewMode,setViewMode] = useState({
    show : true,
    date:false,
    class:false
  })
  const [isSetting,setIsSetting] = useState(false)
  const [tabmenu,setTabmenu] = useState('general')
  const [selectDate,setSelectDate] = useState('月')
  const [selectClass,setSelectClass] = useState(-1)
  const [editMode,setEditMode] = useState(false)

  const calcLectureSlot = []
  const calcLectureSlotAll = []
    for(let i = 0; i < settings.periods;i++){
      if(i === 0) {
        calcLectureSlot.push(settings.start)
        calcLectureSlotAll.push({start:settings.start,end:timeAdd(settings.start,settings.lectureTime)})
      }
      else{
        const prevTime = calcLectureSlot[i - 1]
        let addMinute = settings.lectureTime
        addMinute += (i === settings.whenLunch) ? settings.lunchBreak : settings.breakTime
        calcLectureSlot.push(timeAdd(prevTime,addMinute))
        calcLectureSlotAll.push({start:timeAdd(prevTime,addMinute),end:timeAdd(timeAdd(prevTime,addMinute),settings.lectureTime)})
      }
    }
    useEffect (()=>{
      localStorage.setItem('settings',JSON.stringify(settings))
      localStorage.setItem('schedule',JSON.stringify(schedule))
    },[schedule,settings])

  return (
    <>
      <HeaderTimer
        lectureSlot={calcLectureSlotAll}
      />
      <Schedule
        schedule={schedule}
        setSchedule={setSchedule}
        viewMode={viewMode}
        setViewMode={setViewMode}
        settings={settings}
        setSettings={setSettings}
        lectureSlot={calcLectureSlot}
        isSetting={isSetting}
        setIsSetting={setIsSetting}
        weekDays={weekDays}
        selectDate={selectDate}
        setSelectDate={setSelectDate}
        setSelectClass={setSelectClass}
        selectClass={selectClass}
        editMode={editMode}
        setEditMode={setEditMode}
      />
      <Setting
        isSetting={isSetting}
        setIsSetting={setIsSetting}
        settings={settings}
        setSettings={setSettings}
        tabmenu={tabmenu}
        setTabmenu={setTabmenu}
        weekDays={weekDays}
      />

    </>
  )
}

export default App
