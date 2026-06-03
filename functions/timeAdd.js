export const timeAdd = (timeStr,addMinute) => {
    const time = timeStr.split(':')
    let hour = Number(time[0]) 
    const minute = Number(time[1])
    const sumMinute = minute + addMinute
    hour += Math.floor(sumMinute / 60)
    const resultMinute = sumMinute % 60
    const paddedHour = String(hour).padStart(2, '0');
    const paddedMinute = String(resultMinute).padStart(2, '0');
    return `${paddedHour}:${paddedMinute}`
}