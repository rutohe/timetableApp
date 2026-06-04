import Column from "./Column"
import SettingIcon from "./SettingIcon"
import Setting from "./Setting"
function Schedule({schedule,setSchedule,viewMode,setViewMode,settings,lectureSlot,isSetting,setIsSetting}) {
    const weekDays = ["月", "火", "水", "木", "金"]
    
    const changeScreen = (nextScreen) => {
    if(nextScreen === 'class') setViewMode([true,true,true])
    else if(nextScreen === 'date') setViewMode([true,true,false])
    else if(nextScreen === 'week') setViewMode([true,false,false])
  } 
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
            <div className={`schedule week-view ${viewMode[0] ? 'active' : ''}`}>
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
                                key={index}
                            />
                        })}
                    </div>
                </div>
            </div>
            <div className={`schedule date-view ${viewMode[1] ? 'active' : ''}`}>
                <div className="schedule-content date-content">

                </div>
            </div>
            <div className={`schedule class-view ${viewMode[2] ? 'active' : ''}`}>
                <div className="schedule-content class-content">

                </div>
            </div>
        </div>
    </>
  )
}

export default Schedule