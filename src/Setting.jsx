function Setting({isSetting,setIsSetting,settings,setSettings,tabmenu,setTabmenu}) {
    return(
    <>
    <div className={`setting-area ${isSetting ? 'open' : ''}`}>
        <div className={`setting-wrapper ${isSetting ? 'view' : ''}`}>
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
                    {settings.departure.map((item,index)=>{
                        return <div className="time-wrapper">
                            <div className="input-wrapper">
                                <input 
                                    type="number" 
                                    min={0}
                                    max={23}
                                    placeholder="9"
                                    value={item.split(':')[0]}
                                    onChange={(e)=>{
                                        const ary = item.split(':')
                                        setSettings({...settings,
                                            departure:settings.departure.map((i,idx)=>{
                                                return (index === idx) ? `${(e.target.value === '') ? '9' : e.target.value}:${ary[1]}` : i
                                            })
                                        })    
                                    }}
                                />
                            </div>
                            
                            <div className="input-wrapper">
                                <input 
                                    type="number" 
                                    min={0}
                                    max={59}
                                    placeholder="00"
                                    value={item.split(':')[1]}
                                    onChange={(e)=>{
                                        const ary = item.split(':')
                                        setSettings({...settings,
                                            departure:settings.departure.map((i,idx)=>{
                                                return (index === idx) ? `${ary[0]}:${(e.target.value === '') ? '00' : e.target.value}` : i
                                            })
                                        })    
                                    }}
                                />
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
                                value={settings.start.split(':')[0]}
                                onChange={(e)=>{
                                    const ary = settings.start.split(':')
                                    setSettings({...settings,start:`${(e.target.value === '') ? '9' : e.target.value}:${ary[1]}`})
                                }}
                            />
                        </div>
                        <div className="input-wrapper input-cell">
                            <input 
                                type="number" 
                                min={0}
                                max={59}
                                placeholder="15"
                                value={settings.start.split(':')[1]}
                                onChange={(e)=>{
                                    const ary = settings.start.split(':')
                                    setSettings({...settings,start:`${ary[0]}:${(e.target.value === '') ? '15' : e.target.value}`})
                                }}
                            />
                        </div>
                    </div>
                </div>
                <div className="input-lecturetime input-cell">
                    <p>1コマの長さ</p>
                    <input 
                        type="number"
                        min={50}
                        max={150}
                        onChange={(e)=>{
                            setSettings({...settings,lectureTime:Number(e.target.value)})
                        }}
                    />
                </div>
                <div className="input-breaktime input-cell">
                    <p>休憩時間の長さ</p>
                    <div className="input-minutewrapper">
                        <input 
                            type="number"
                            min={0}
                            max={30}
                            value={settings.breakTime}
                            onChange={(e)=>{
                                return setSettings({...settings,breakTime:Number(e.target.value)})
                            }}
                        />分
                    </div>
                </div>
                <div className="input-whenlunch input-cell">
                    
                    <p>
                        <input 
                            type="number"
                            min={1}
                            max={settings.periods}
                        />
                        限の後に昼休憩
                    </p>
                </div>
                <div className="input-lunchbreak input-cell">
                    <p>昼休憩の長さ</p>
                    <div className="input-minutewrapper">
                        <input 
                            type="number"
                            min={30}
                            max={90}
                            value={settings.lunchBreak}
                            onChange={(e)=>{
                                return setSettings({...settings,lunchBreak:Number(e.target.value)})
                            }}
                        />分
                    </div>
                </div>
                <div className="input-periods input-cell">
                    <p>講義数</p>
                    <input 
                        type="number"
                        min={1}
                        value={settings.periods}
                        onChange={(e)=>{
                            setSettings({...settings,periods:Number(e.target.value)})
                        }}
                    />限まで
                </div>
                <div className="input-canabsent input-cell">
                        <p>休んでいい回数</p>
                        <input 
                            type="number"
                            min={0}
                            max={10}
                            value={settings.canAbsent} 
                            onChange={(e)=>{
                                setSettings({...settings,canAbsent:Number(e.target.value)})
                            }}   
                        />
                </div>
            </div>}
        </div>
    </div>
    </>)
}
export default Setting