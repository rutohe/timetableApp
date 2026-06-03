import { timeAdd } from "../functions/timeAdd"
function Column({lectures,settings,lectureSlot,weekDay,isStub}) {
    const periodAry = Array.from({length:settings.periods})
    return(
        <>
            <div className="lecture-wrapper">
                <div className={`column-header-cell ${isStub ? '' : 'weekday'}`}>
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
                            return <div className="lecture-cell" key={index}>
                                <div className="lecuture-name">{item.name}</div>
                                <div className="lecuture-absent">欠席数:{item.absent}</div>
                                <div className="lecture-lateness">遅刻数:{item.lateness}</div>
                            </div>
                    })
                }
            </div>
        </>
    )
}
export default Column