import { timeAdd } from "../functions/timeAdd";

function Date({ settings, weekDays, schedule, selectDate, setSelectDate, lectureSlot ,setSelectClass,setViewMode}) {
    const currentIndex = weekDays.indexOf(selectDate);
    return (
        <>
            <div className="week-navigation">
                <button 
                    className="week-progress-btn"
                    onClick={() => {
                        if (currentIndex !== -1) {
                            const prevIndex = (currentIndex - 1 + weekDays.length) % weekDays.length;
                            setSelectDate(weekDays[prevIndex]);
                        }
                    }}
                >
                    <p className="prev">{'<'}</p>
                </button>
                <p className="current-date-label">{selectDate}</p>
                <button 
                    className="week-progress-btn"
                    onClick={() => {
                        if (currentIndex !== -1) {
                            const nextIndex = (currentIndex + 1) % weekDays.length;
                            setSelectDate(weekDays[nextIndex]);
                        }
                    }}
                >
                    <p className="next">{'>'}</p>
                </button>
            </div>

            <div className="date-area">
                {currentIndex !== -1 && schedule[currentIndex] ? (
                    schedule[currentIndex].map((item, index) => {
                        const startTime = lectureSlot[index] 

                        return (
                            <div 
                                className="each-date"
                                key={index}
                                onClick={()=>{
                                    setSelectClass(index)
                                    setViewMode({show:true,date:true,class:true})
                                }}
                            >
                                
                                <div className="time-area">
                                    <div>{startTime}</div>
                                    <p>~</p>
                                    <div>{timeAdd(startTime, settings.lectureTime)}</div>
                                    <div>{item.name}</div>
                                </div>
                                <div className="memo-area">
                                    <p>{`メモ：${item.memo}`}</p>
                                </div>
                            </div>
                        );
                    })
                ) : (
                    <div className="no-data-alert">Loading terminal data...</div>
                )}
            </div>
        </>
    );
}

export default Date;