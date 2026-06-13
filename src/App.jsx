import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import './App.css'
import Schedule from './Schedule'
import Setting from './Setting'
import { timeAdd } from '../functions/timeAdd'
const generateTestData = (periods) => {
  const res = []
  for (let d = 0; d < 5; d++) {
  const lec = []
  const testObj = {
    name : `${d}`, //講義名
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
  const [settings,setSettings] = useState({
        start : '9:15', //始業時間
        lectureTime : 90, //1コマの時間(分)
        periods : 6, //何限まであるか
        breakTime : 15, //休憩時間(分)
        lunchBreak : 60, //昼休みの時間(分)
        whenLunch : 2, //何限の後に昼休みがあるか
        canAbsent : 4, //何回休めるか
        departure : Array.from({length:5},()=>'9:00'), //出発時間
    })
  const [lectures,setLectures] = useState([])
  const [schedule,setSchedule] = useState(generateTestData(settings.periods))
  const [viewMode,setViewMode] = useState({
    show : true,
    date:false,
    class:false
  })
  const [isSetting,setIsSetting] = useState(false)
  const [tabmenu,setTabmenu] = useState('general')
  const [selectDate,setSelectDate] = useState('月')
  const [selectClass,setSelectClass] = useState(-1)
  const [memo,setMemo] = useState('')
  const calcLectureSlot = []
    for(let i = 0; i < settings.periods;i++){
      if(i === 0) calcLectureSlot.push(settings.start)
      else{
        const prevTime = calcLectureSlot[i - 1]
        let addMinute = settings.lectureTime
        addMinute += (i === settings.whenLunch) ? settings.lunchBreak : settings.breakTime
        calcLectureSlot.push(timeAdd(prevTime,addMinute))
      }
    }
    

  return (
    <>
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
