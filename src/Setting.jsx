function Setting({isSetting,setIsSetting,settings,setSettings}) {
    <div className="setting-area">
        <div className="departure">
            <p>出発時間：</p>
            <div className="time-wrapper">
                <div className="input-wrapper">
                    <input 
                        type="number" 
                        min={0}
                        max={23}
                        placeholder="9"
                    />
                </div>
                <div className="input-wrapper">
                    <input 
                        type="number" 
                        min={0}
                        max={59}
                        placeholder="15"
                    />
                </div>
            </div>
        </div>
        <div className="opening">
            <p>始業時間：</p>
            <div className="time-wrapper">
                <div className="input-wrapper">
                    <input 
                        type="number" 
                        min={0}
                        max={23}
                        placeholder="9"
                    />
                </div>
                <div className="input-wrapper">
                    <input 
                        type="number" 
                        min={0}
                        max={59}
                        placeholder="15"
                    />
                </div>
            </div>
        </div>
        
    </div>
}
export default Setting