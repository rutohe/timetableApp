import Column from "./Column"
import SettingIcon from "./SettingIcon"
import Setting from "./Setting"
import Date from "./Date"
import Class from "./Class"
function Schedule({schedule,setSchedule,viewMode,setViewMode,settings,lectureSlot,isSetting,setIsSetting,weekDays,selectDate,setSelectDate}) {
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
                                key={index}
                            />
                        })}
                    </div>
                </div>
            </div>
            <div className={`schedule date-view ${viewMode.date ? 'active' : ''}`}>
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
                    />
                </div>
            </div>
            <div className={`schedule class-view ${viewMode.class ? 'active' : ''}`}>
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
                        
                    />
                </div>
            </div>
        </div>
    </>
  )
}

export default Schedule