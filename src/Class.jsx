function Class({schedule,setSchedule,selectDate,setselectDate,selectClass,setSelectClass,lectureSlot,settings,weekDays}){
    const currentIndex = weekDays.indexOf(selectDate);
    const nextClass = (dateIndex, classIndex, addNum, weekLength, dateLength) => {
        const currentTotalIndex = dateIndex * dateLength + classIndex;
        const totalLength = weekLength * dateLength;
        const nextTotalIndex = (currentTotalIndex + addNum + totalLength) % totalLength;
        const nextDateIndex = Math.floor(nextTotalIndex / dateLength);
        const nextClassIndex = nextTotalIndex % dateLength;
        
        return { date: nextDateIndex, class: nextClassIndex };
    };
    return(
        <>
            <div className="class-navigation">
                <button 
                    className="date-progress-btn"
                    onClick={() => {
                        if (currentIndex !== -1) {
                            const prevIndex = nextClass(selectDate,selectClass,-1,settings.departure.length,settings.periods)
                            setSelectClass(prevIndex)
                        }
                    }}
                >
                    <p className="prev">{'<'}</p>
                </button>
                <p className="current-class-label">{schedule[selectDate][selectClass].name}</p>
                <button 
                    className="date-progress-btn"
                    onClick={() => {
                        if (currentIndex !== -1) {
                            const nextIndex = nextClass(selectDate,selectClass,1,settings.departure.length,settings.periods)
                            setSelectClass(nextIndex)
                        }
                    }}
                >
                    <p className="next">{'>'}</p>
                </button>
            </div>
        </>
    )
}
export default Class