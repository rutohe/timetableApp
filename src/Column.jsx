import { timeAdd } from "../functions/timeAdd"
function Column({schedule,setSchedule,lectures,settings,setSettings,lectureSlot,weekDays,weekDay,isStub,setSelectDate,setViewMode,setSelectClass,editMode}) {
    const periodAry = Array.from({length:settings.periods})
    const currentIndex = weekDays.indexOf(weekDay)
    return(
        <>
            <div className="lecture-wrapper">
                <div 
                    className={`column-header-cell ${isStub ? '' : 'weekday'}`}
                    onClick={()=>{
                        if(isStub) return
                        setSelectDate(weekDay)
                        setViewMode({show:true,date:true,class:false})
                    }}
                >
                    {isStub ? "" : weekDay}
                </div>
                {isStub && periodAry.map((_,index)=>{
                            const startTime = lectureSlot[index]
                            const endTime = timeAdd(startTime,settings.lectureTime)
                            return <div className="time-cell" key={index}>
                                <div className="period">{index + 1}限</div>
                                <div className="duration">
                                    <p>{startTime}</p>
                                    <p>~</p>
                                    <p>{endTime}</p>
                                </div>
                            </div>
                        })
                }
                {!isStub && lectures.map((item,index)=>{
                            return <div 
                                className="lecture-cell"    
                                key={index}
                                onClick={()=>{
                                    setSelectDate(weekDay)
                                    setSelectClass(index)
                                    setViewMode({show:true,date:true,class:true})
                                }}
                            >
                                {!editMode && <div className="lecture-name">{item.name}</div>}
                                {editMode && <div className="week-input-wrapper"><input 
                                    type="text"
                                    value={item.name}
                                    onClick={(e)=>e.stopPropagation()}
                                    onChange={(e)=>{
                                        setSchedule(schedule.map((it,idx)=>{
                                                return (idx === currentIndex) 
                                                ? it.map((i,id)=>{
                                                    return (id === index) ? {...i,name:e.target.value} : i
                                                }) : it
                                        }))
                                    }}
                                /></div>}
                                <div className="lecture-btn-area">
                                    <button 
                                        className="lecture-absent"
                                        onClick={(e)=>{
                                            e.stopPropagation()
                                            setSchedule(schedule.map((it,idx)=>{
                                                return (idx === currentIndex) 
                                                ? it.map((i,id)=>{
                                                    return (id === index) ? {...i,absent:Math.min(i.absent + 1,10)} : i
                                                }) : it
                                            }))
                                        }}
                                    >
                                        {`欠席数:${item.absent}`}
                                    </button>
                                    <button 
                                        className="lecture-lateness"
                                        onClick={(e)=>{
                                            e.stopPropagation()
                                            setSchedule(schedule.map((it,idx)=>{
                                                return (idx === currentIndex) 
                                                ? it.map((i,id)=>{
                                                    return (id === index) ? {...i,lateness:Math.min(i.lateness + 1,10)} : i
                                                }) : it
                                            }))
                                        }}
                                    >
                                        {`遅刻数:${item.lateness}`}
                                    </button>
                                </div>
                            </div>
                    })
                }
            </div>
        </>
    )
}
export default Column