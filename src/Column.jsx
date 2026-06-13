import { timeAdd } from "../functions/timeAdd"
function Column({lectures,settings,setSettings,lectureSlot,weekDay,isStub,setSelectDate,setViewMode,setSelectClass}) {
    const periodAry = Array.from({length:settings.periods})
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
                                    {`${startTime}~${endTime}`}    
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
                                <div className="lecuture-name">{item.name}</div>
                                <div className="lecture-btn-area">
                                    <div className="lecture-absent">
                                        <div>欠席数:{item.absent}</div>
                                    </div>
                                    <div className="lecture-lateness">
                                        <div>遅刻数:{item.lateness}</div>
                                    </div>
                                </div>
                            </div>
                    })
                }
            </div>
        </>
    )
}
export default Column