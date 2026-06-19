import { useRef } from "react"
function Setting({isSetting,setIsSetting,settings,setSettings,tabmenu,setTabmenu,weekDays}) {
    const formValuesRef = useRef({
        ...settings
    })
    return(
    <>
    <div 
        className={`setting-area ${isSetting ? 'open' : ''}`}
        onClick={()=>setIsSetting(false)}
    >
        <div 
            className={`setting-wrapper ${isSetting ? 'view' : ''}`}
            onClick={(e)=>e.stopPropagation()}
        >
            <div className='tabmenu-btn-area'>
                <button 
                    className={`tabmenu-btn ${tabmenu === 'general' ? 'select':''}`}
                    onClick={()=>{
                        setTabmenu('general')
                    }}
                >
                    基本設定
                </button>
                <button 
                    className={`tabmenu-btn ${tabmenu === 'departure' ? 'select':''}`}
                    onClick={()=>{
                        setTabmenu('departure')
                    }}
                >
                    出発時間
                </button>
            </div>
            {(tabmenu === 'departure') && <div className="input-departure setting-input">
                <p>出発時間</p>
                <div className="week-wrapper">
                    {formValuesRef.current.departure.map((item,index)=>{
                        return <div className="date-wrapper">
                            <p>{weekDays[index]}</p>
                            <div className="time-wrapper">
                                <div className="input-wrapper">
                                    <input 
                                        type="number" 
                                        min={0}
                                        max={23}
                                        placeholder="9"
                                        defaultValue={item.split(':')[0]}
                                        onChange={(e)=>{
                                            formValuesRef.current.departure[index] = `${e.target.value}:${item.split(':')[1]}`  
                                        }}
                                        onFocus={(e) => e.target.select()}
                                    />
                                </div>
                                <p>:</p>
                                <div className="input-wrapper">
                                    <input 
                                        type="number" 
                                        min={0}
                                        max={59}
                                        placeholder="00"
                                        defaultValue={item.split(':')[1]}
                                        onChange={(e)=>{
                                            formValuesRef.current.departure[index] = `${item.split(':')[0]}:${e.target.value}`
                                        }}
                                        onFocus={(e) => e.target.select()}
                                    />
                                </div>
                            </div>
                        </div>
                    })}
                </div>
            </div>}
            {(tabmenu === 'general') && <div className="setting-input">
                <div className="input-opening input-cell">
                    <p>始業時間</p>
                    <div className="time-wrapper">
                        <div className="input-wrapper">
                            <input 
                                type="number" 
                                min={0}
                                max={23}
                                placeholder="9"
                                defaultValue={formValuesRef.current.start.split(':')[0]}
                                onChange={(e)=>{
                                    formValuesRef.current.start = `${e.target.value}:${formValuesRef.start.split(':')[1]}`    
                                }}
                                onFocus={(e) => e.target.select()}
                            />
                        </div>
                        <p>:</p>
                        <div className="input-wrapper">
                            <input 
                                type="number" 
                                min={0}
                                max={59}
                                placeholder="15"
                                defaultValue={formValuesRef.current.start.split(':')[1]}
                                onChange={(e)=>{
                                    formValuesRef.current.start = `${formValuesRef.start.split(':')[0]}:${e.target.value}`
                                }}
                                onFocus={(e) => e.target.select()}
                            />
                        </div>
                    </div>
                </div>
                <div className="input-lecturetime input-cell">
                    <p>1コマの長さ</p>
                    <div className="time-wrapper">
                        <div className="input-wrapper">
                            <input 
                                type="number"
                                min={50}
                                max={150}
                                defaultValue={formValuesRef.current.lectureTime}
                                onChange={(e)=>{
                                    formValuesRef.current.lectureTime = Number(e.target.value)
                                }}
                                onFocus={(e) => e.target.select()}
                            />
                        </div>
                        <p>分</p>
                    </div>
                </div>
                <div className="input-breaktime input-cell">
                    <p>休憩時間の長さ</p>
                    <div className="time-wrapper">
                        <div className="input-wrapper">
                            <input 
                                type="number"
                                min={0}
                                max={30}
                                defaultValue={formValuesRef.current.breakTime}
                                onChange={(e)=>{
                                    formValuesRef.current.breakTime = Number(e.target.value)    
                                }}
                                onFocus={(e) => e.target.select()}
                            />
                        </div>
                        <p>分</p>
                    </div>
                </div>
                <div className="input-whenlunch input-cell">
                    
                    <p>昼休みのタイミング</p>
                    <div className="time-wrapper">
                        <div className="input-wrapper">
                            <input 
                                type="number"
                                min={1}
                                max={settings.periods}
                                defaultValue={formValuesRef.current.whenLunch}
                                onChange={(e)=>{
                                    formValuesRef.current.whenLunch = Number(e.target.value)    
                                }}
                                onFocus={(e) => e.target.select()}
                            />
                        </div>
                        <p>限の後に昼休憩</p>
                    </div>
                </div>
                <div className="input-lunchbreak input-cell">
                    <p>昼休憩の長さ</p>
                    <div className="time-wrapper">
                        <div className="input-wrapper">
                            <input 
                                type="number"
                                min={30}
                                max={90}
                                defaultValue={formValuesRef.current.lunchBreak}
                                onChange={(e)=>{
                                    formValuesRef.current.lunchBreak = Number(e.target.value)    
                                }}
                                onFocus={(e) => e.target.select()}
                            />
                        </div>
                        <p>分</p>    
                    </div>
                </div>
                <div className="input-periods input-cell">
                    <p>講義数</p>
                    <div className="time-wrapper">
                        <div className="input-wrapper">
                            <input 
                                type="number"
                                min={1}
                                defaultValue={formValuesRef.current.periods}
                                onChange={(e)=>{
                                    formValuesRef.current.periods = Number(e.target.value)    
                                }}
                                onFocus={(e) => e.target.select()}
                            />
                        </div>
                        <p>限まで</p>
                    </div>
                </div>
                <div className="input-canabsent input-cell">
                        <p>休んでいい回数</p>
                        <div className="time-wrapper">
                            <div className="input-wrapper">
                                <input 
                                    type="number"
                                    min={0}
                                    max={10}
                                    defaultValue={formValuesRef.current.canAbsent} 
                                    onChange={(e)=>{
                                        formValuesRef.current.canAbsent = Number(e.target.value)    
                                    }}   
                                    onFocus={(e) => e.target.select()}
                                />
                            </div>
                            回
                        </div>
                </div>
            </div>}
            <button 
                className="submit-btn"
                onClick={()=>{
                    setSettings(formValuesRef.current)
                    setIsSetting(false)
                }}
            >
                keep settings
            </button>
        </div>
    </div>
    </>)
}
export default Setting