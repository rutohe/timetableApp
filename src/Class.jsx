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
    const gradeRatioChange = (key, value) => {
        const nextValue = Number(value);
        setSchedule(
            schedule.map((item, index) => {
                return index === currentIndex
                    ? item.map((it, idx) => {
                        if (idx !== selectClass) return it
                    
                        const otherKey = (key === 'normal') ? 'test' : 'normal'
                        const maxAllowed = 100 - it[otherKey]
                        const finalValue = Math.min(nextValue, maxAllowed)
                        const obj = { 
                            ...it, 
                            [key]: finalValue 
                        };
                        obj.other = 100 - obj.test - obj.normal
                        
                        return obj
                    })
                    : item
            })
        )
    }
    return(
        <>
            <div className="class-navigation">
                <button 
                    className="date-progress-btn"
                    onClick={() => {
                        if (currentIndex !== -1) {
                            const prevIndex = nextClass(currentIndex,selectClass,-1,settings.departure.length,settings.periods)
                            setSelectClass(prevIndex.class)
                            setselectDate(prevIndex.date)
                        }
                    }}
                >
                    <p className="prev">{'<'}</p>
                </button>
                <p className="current-class-label">{schedule[currentIndex][selectClass].name}</p>
                <button 
                    className="date-progress-btn"
                    onClick={() => {
                        if (currentIndex !== -1) {
                            const nextIndex = nextClass(currentIndex,selectClass,1,settings.departure.length,settings.periods)
                            setSelectClass(nextIndex.class)
                            setselectDate(nextIndex.date)
                        }
                    }}
                >
                    <p className="next">{'>'}</p>
                </button>
            </div>
            <div className="class-container">
                <div className="row-container">
                    <div className="grade-ratio">
                        <p>平常点</p>
                        <div className="ratio-row">
                            <input 
                                type="range"
                                min={0}
                                max={100}
                                value={schedule[currentIndex][selectClass].normal}
                                onInput={(e)=>gradeRatioChange('normal',e.target.value)}
                            />
                        </div>
                        <p>{schedule[currentIndex][selectClass].normal}%</p>
                    </div>
                    <div className="grade-ratio">
                        <p>テスト</p>
                        <div className="ratio-row">
                            <input 
                                type="range"
                                min={0}
                                max={100}
                                value={schedule[currentIndex][selectClass].test}
                                onInput={(e)=>gradeRatioChange('test',e.target.value)}
                            />
                        </div>
                        <p>{schedule[currentIndex][selectClass].test}%</p>
                    </div>
                    <div className="grade-ratio">
                        <p>その他</p>
                        <div className="ratio-row">
                            <input 
                                type="range"
                                min={0}
                                max={100}
                                value={schedule[currentIndex][selectClass].other}
                                onInput={(e)=>gradeRatioChange('other',e.target.value)}
                            />
                        </div>
                        <p>{schedule[currentIndex][selectClass].other}%</p>
                    </div>
                </div>
                <div className="memo-wrapper">
                    <input 
                        type="text" 
                        placeholder="備考やメモを追加"
                        value={schedule[currentIndex][selectClass].memo}
                        onChange={(e)=>{
                            setSchedule(schedule.map((item,index)=>{
                                return index === currentIndex 
                                ? item.map((it,idx)=>{
                                    return idx === selectClass 
                                    ? {...it,memo:e.target.value} : it
                                }) : item
                            }))
                        }}
                    />
                </div>
            </div>
        </>
    )
}
export default Class