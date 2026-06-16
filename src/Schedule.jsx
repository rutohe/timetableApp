import Column from "./Column"
import SettingIcon from "./SettingIcon"
import Setting from "./Setting"
import Date from "./Date"
import Class from "./Class"
function Schedule({schedule,setSchedule,viewMode,setViewMode,settings,lectureSlot,isSetting,setIsSetting,weekDays,selectDate,setSelectDate,setSelectClass,selectClass,editMode,setEditMode}) {
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
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="edit-icon"
                    onClick={()=>{setEditMode(!editMode)}}
                >
                    {!editMode && <path d="M3 17.25V21H6.75L17.81 9.94L14.06 6.19L3 17.25ZM20.71 7.04C21.1 6.65 21.1 6.02 20.71 5.63L18.37 3.29C17.98 2.9 17.35 2.9 16.96 3.29L15.13 5.12L18.88 8.87L20.71 7.04V7.04Z" fill="white"/>}
                    {editMode && <path d="M19 6.41L17.59 5L12 10.59L6.41 5L5 6.41L10.59 12L5 17.59L6.41 19L12 13.41L17.59 19L19 17.59L13.41 12L19 6.41Z" fill="white"/>}
                </svg>

                    <div className="lectures-wrapper">
                        <Column
                            lectures={[]}
                            settings={settings}
                            lectureSlot={lectureSlot}
                            weekDay={""}
                            weekDays={weekDays}
                            isStub={true}
                            setIsSetting={setIsSetting}
                        />
                        {schedule.map((item,index)=>{
                            return <Column
                                schedule={schedule}
                                setSchedule={setSchedule}
                                lectures={item}
                                settings={settings}
                                lectureSlot={lectureSlot}
                                weekDays={weekDays}
                                weekDay={weekDays[index]}
                                isStub={false}
                                setSelectDate={setSelectDate}
                                setViewMode={setViewMode}
                                setSelectClass={setSelectClass}
                                editMode={editMode}
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