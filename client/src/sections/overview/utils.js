export const windDirectionValueToAngle = {
    'N': 0,
    'NE': 45,
    'E': 90,
    'SE': 135,
    'S': 180,
    'SW':  225,
    'W': 270,
    'NW': 315
};

export function calculateBattery(battery){

    if(battery){
        const targetDate = new Date(battery); 
        const today = new Date();
    
    
        // 날짜만 비교하기 위해 시간을 0시 0분 0초로 설정
        targetDate.setHours(0, 0, 0, 0);
        today.setHours(0, 0, 0, 0);
    
        const diffTime = targetDate - today;         // 두 날짜의 차이(밀리초 단위)
        const diffDays = diffTime / (1000 * 60 * 60 * 24); // 밀리초를 일수로 변환
    
        const daysDiff = Math.round(diffDays); // - 값으로 나와서
        const batteryPercent = daysDiff > 10 ? 0: (100 + daysDiff*10);
        
        return batteryPercent;  
    }
    return '0';
}

export function changeBatteryDate(batteryDate){
    
    if(batteryDate){
        const date = new Date(batteryDate);
        date.setDate(date.getDate() + 9);
        const newDateString = date.toISOString().split('T')[0];

        return newDateString;
    }
    return '';
    
}
  