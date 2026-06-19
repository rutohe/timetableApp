const nearestTime = (current,startTime,endTime) => {
    //計算結果がendTimeよりも小さかったらreturn '講義中です'みたいなの返す
    let min = {
        hour : Math.abs(startTime[0].hour - current.hour),
        minute : Math.abs(startTime[0].minute - current.minute),
        sec : Math.abs(startTime[0].sec - current.sec),
        index : 0
    }
    const timeTotal = current.hour * 3600 + current.minute * 60 + current.sec;
    let minDiff = Infinity;
    let minIndex = -1;
    let minTotal;
    const pad = (num) => String(num).padStart(2, "0");
    startTime.forEach((item,index) => {
        const itemTotalSec = (item.hour * 3600) + (item.minute * 60) + item.sec;
        const diff = itemTotalSec - timeTotal;
        if (diff > 0) {
            if (diff < minDiff) {
                minDiff = diff;
                minTotal = itemTotalSec;
                minIndex = index;
            }
        }
    });
    if (minIndex === -1){
        const lastIndex = startTime.length - 1;
        const end = endTime[lastIndex];
        const totalEnd = end.hour * 3600 + end.minute * 60 + end.sec;
        // 最後の講義中
        if(totalEnd > timeTotal){
            const start = startTime[lastIndex];
            const startTotal = start.hour * 3600 + start.minute * 60 + start.sec;
            const elapseTotal = timeTotal - startTotal;
            const h = pad(Math.floor(elapseTotal / 3600));
            const m = pad(Math.floor((elapseTotal % 3600) / 60));
            const s = pad(elapseTotal % 60);
            return {
                statu : 'lecture',
                text : `${lastIndex + 1}限講義中(講義開始から${h}:${m}:${s}経過)`
            }
        }else{
            return {
                statu : 'finish',
                text : '本日の講義は終了しました。'
            };
        }

    } 
    if(minIndex > 0){
        const prevEnd = endTime[minIndex - 1];
        const totalPrev = prevEnd.hour * 3600 + prevEnd.minute * 60 + prevEnd.sec;
        // 講義中
        if(timeTotal < totalPrev){
            const prevStart = startTime[minIndex - 1];
            const prevStartTotal = prevStart.hour * 3600 + prevStart.minute * 60 + prevStart.sec;
            const elapseTotal = timeTotal - prevStartTotal;
            const h = pad(Math.floor(elapseTotal / 3600));
            const m = pad(Math.floor((elapseTotal % 3600) / 60));
            const s = pad(elapseTotal % 60);
            return {
                statu : 'lecture',
                text : `${minIndex}限講義中(講義開始から${h}:${m}:${s}経過)`,                
            }
        }
    }
    // 休み時間と1限前
    const hour = pad(Math.floor(minDiff / 3600));
    const minute = pad(Math.floor((minDiff % 3600) / 60));
    const sec = pad(minDiff % 60);
    return {
        statu : 'break',
        text : `${minIndex + 1}限開始まであと${hour}:${minute}:${sec}`,
    }
    
}
export default nearestTime