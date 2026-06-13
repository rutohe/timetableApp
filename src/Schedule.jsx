import Column from "./Column"
import SettingIcon from "./SettingIcon"
import Setting from "./Setting"
import Date from "./Date"
import Class from "./Class"
function Schedule({schedule,setSchedule,viewMode,setViewMode,settings,lectureSlot,isSetting,setIsSetting,weekDays,selectDate,setSelectDate,setSelectClass,selectClass}) {
    return (
    <>
        <div className="schedule-wrapper">
            <SettingIcon
                size={50}
                color="white"
                className="setting-icon"
                isSetting={isSetting}
                setIsSetting={setIsSetting}
            />
            <div className={`schedule week-view ${viewMode.show ? 'active' : ''}`}>
                <div className="schedule-content week-content">
                    <div className="lectures-wrapper">
                        <Column
                            lectures={[]}
                            settings={settings}
                            lectureSlot={lectureSlot}
                            weekDay={""}
                            isStub={true}
                            setIsSetting={setIsSetting}
                        />
                        {schedule.map((item,index)=>{
                            return <Column
                                lectures={item}
                                settings={settings}
                                lectureSlot={lectureSlot}
                                weekDay={weekDays[index]}
                                isStub={false}
                                setSelectDate={setSelectDate}
                                setViewMode={setViewMode}
                                setSelectClass={setSelectClass}
                                key={index}
                            />
                        })}
                    </div>
                </div>
            </div>
            {viewMode.date && <div className={`schedule date-view ${viewMode.date ? 'active' : ''}`}>
                <button 
                    className="prev-btn"
                    onClick={()=>{
                        setViewMode({...viewMode,date:false,class:false})
                    }}    
                >
                    {'<'}
                </button>
                <div className="schedule-content date-content">
                    <Date
                        settings={settings}
                        weekDays={weekDays}
                        schedule={schedule}
                        selectDate={selectDate}
                        setSelectDate={setSelectDate}
                        lectureSlot={lectureSlot}
                        setSelectClass={setSelectClass}
                        setViewMode={setViewMode}
                    />
                </div>
            </div>}
            {viewMode.class && <div className={`schedule class-view ${viewMode.class ? 'active' : ''}`}>
                <button 
                    className="prev-btn"
                    onClick={()=>{
                        setViewMode({...viewMode,date:true,class:false})
                    }}    
                >
                    {'<'}
                </button>
                <div className="schedule-content class-content">
                    <Class
                        schedule={schedule}
                        setSchedule={setSchedule}
                        selectDate={selectDate}
                        setselectDate={setSelectDate}
                        selectClass={selectClass}
                        setSelectClass={setSelectClass}
                        lectureSlot={lectureSlot}
                        settings={settings}
                        weekDays={weekDays}
                    />
                </div>
            </div>}
        </div>
    </>
  )
}

export default Schedule