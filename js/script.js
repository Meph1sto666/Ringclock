/**
 * Circleclock
 *
 * © Meph1sto666 2022.3
 * 
 * V.1.0.2
**/

// ===ATTRIBUTES===
var settings = {
    GRADIENT: false,
    GRADIENT_RADIUS_0: 1.5,
    GRADIENT_RADIUS_0: 1.5,
    MILLISECONDS_COLOR: "#002222",
    SECONDS_COLOR: "#004444",
    MINUTES_COLOR: "#006666",
    HOURS_COLOR: "#008888",
    WEEKDAY_COLOR: "#00AAAA",
    DATE_COLOR: "#00CCCC",
    MONTH_COLOR: "#00FFFF",
    YEAR_COLOR: "#110000",
    CIRCLE_LINE_WIDTH: 5,
    MILLISECONDS_COUNTER_CLOCKWISE: !Math.round(Math.random()),
    SECONDS_COUNTER_CLOCKWISE: !Math.round(Math.random()),
    MINUTES_COUNTER_CLOCKWISE: !Math.round(Math.random()),
    HOURS_COUNTER_CLOCKWISE: !Math.round(Math.random()),
    WEEKDAY_COUNTER_CLOCKWISE: !Math.round(Math.random()),
    DATE_COUNTER_CLOCKWISE: !Math.round(Math.random()),
    MONTH_COUNTER_CLOCKWISE: !Math.round(Math.random()),
    MILLISECONDS_ROTATION: Math.PI * 1.5,
    SECONDS_ROTATION: Math.PI * 1.5,
    WEEKDAY_ROTATION: Math.PI * 1.5,
    MINUTES_ROTATION: Math.PI * 1.5,
    HOURS_ROTATION: Math.PI * 1.5,
    DATE_ROTATION: Math.PI * 1.5,
    MONTH_ROTATION: Math.PI * 1.5,
    MILLISECONDS_RADIUS: 20,
    SECONDS_RADIUS: 30,
    MINUTES_RADIUS: 40,
    HOURS_RADIUS: 50,
    WEEKDAY_RADIUS: 50,
    DATE_RADIUS: 50,
    MONTH_RADIUS: 50,
    CORRECTION: 5,
    RADIUS_CHANGE: -45,
    MILLISECONDS_RADIUS_CHANGE: -45,
    SECONDS_RADIUS_CHANGE: -45,
    MINUTES_RADIUS_CHANGE: -45,
    HOURS_RADIUS_CHANGE: -45,
    WEEKDAY_RADIUS_CHANGE: -45,
    DATE_RADIUS_CHANGE: -45,
    MONTH_RADIUS_CHANGE: -45,
    AUTO_SIZE: true,
    
    SHOW_TIME: true,
    SHOW_MILLISECONDS: false,
    SHOW_MILLISECONDS_STRING: true,
    SHOW_SECONDS: true,
    SHOW_SECONDS_STRING: true,
    SHOW_MINUTES: true,
    SHOW_MINUTES_STRING: true,
    SHOW_HOURS: true,
    SHOW_HOURS_STRING: true,
    SHOW_WEEKDAY: true,
    SHOW_WEEKDAY_STRING: true,
    SHOW_DATE: true,
    SHOW_DATE_STRING: true,
    SHOW_MONTHS: true,
    SHOW_MONTHS_STRING: true,
    SHOW_YEAR_STRING: true,
    
    START_LINE: true,
    
    AUDIO_REACTIVE: false,
}
var startLineRadius = settings.MILLISECONDS_RADIUS;
var TIME_ARRAY_OLD = [0, 0, 0, 0, 0, 0, 0, 0];

// ===LIVELY EVENT LISTENERS===
function livelyPropertyListener(property, val) {
    switch (property) {
        case "showMilliseconds": settings.SHOW_MILLISECONDS = val; break;
        case "showMillisecondsString": settings.SHOW_MILLISECONDS_STRING = val; break;
        case "millisecondsColor": settings.MILLISECONDS_COLOR = val; break;
        case "millisecondsRadius":
            settings.MILLISECONDS_RADIUS = val;
            setClockSize();
            break;
        case "showSeconds": settings.SHOW_SECONDS = val; break;
        case "showSecondsString": settings.SHOW_SECONDS_STRING = val; break;
        case "secondsColor": settings.SECONDS_COLOR = val; break;
        case "secondsRadius": 
            settings.SECONDS_RADIUS = val;
            setClockSize();
            break;
        case "showMinutes": settings.SHOW_MINUTES = val; break;
        case "showMinutesString": settings.SHOW_MINUTES_STRING = val; break;
        case "minutesColor": settings.MINUTES_COLOR = val; break;
        case "minutesRadius": 
            settings.MINUTES_RADIUS = val;
            setClockSize();
            break;
        case "showHours": settings.SHOW_HOURS = val; break;
        case "showHoursString": settings.SHOW_HOURS_STRING = val; break;
        case "hoursColor": settings.HOURS_COLOR = val; break;
        case "hoursRadius": 
            settings.HOURS_RADIUS = val;
            setClockSize();
            break;
        case "showWeekday": settings.SHOW_WEEKDAY = val; break;
        case "showWeekdayString": settings.SHOW_WEEKDAY_STRING = val; break;
        case "weekdayColor": settings.WEEKDAY_COLOR = val; break;
        case "weekdayRadius": 
            settings.WEEKDAY_RADIUS = val;
            setClockSize();
            break;
        case "showDate": settings.SHOW_DATE = val; break;
        case "showDateString": settings.SHOW_DATE_STRING = val; break;
        case "dateColor": settings.DATE_COLOR = val; break;
        case "dateRadius": 
            settings.DATE_RADIUS = val;
            setClockSize();
            break;
        case "showMonths": settings.SHOW_MONTHS = val; break;
        case "showMonthsString": settings.SHOW_MONTHS_STRING = val; break;
        case "monthsColor": settings.MONTH_COLOR = val; break;
        case "monthsRadius": 
            settings.MONTH_RADIUS = val;
            setClockSize();
            break;
        case "showTime": settings.SHOW_TIME = val; break;
        case "yearColor": settings.YEAR_COLOR = val; break;
        case "startLine": settings.START_LINE = val; break;
        
        case "autoSize": settings.AUTO_SIZE = val; break;
        
        case "gradient": settings.GRADIENT = val; break;
        case "gradientRadius0": settings.GRADIENT_RADIUS_0 = val; break;
        case "gradientRadius1": settings.GRADIENT_RADIUS_1 = val; break;
        case "circleLineWidth": settings.CIRCLE_LINE_WIDTH = val; break;
    }
    if (settings.AUTO_SIZE) setClockSize();
}

// ===TIME===
function setUp() {
    for (var i = 0; i < 12; i++) {
        let btn = document.createElement("input");
        btn.type = "button";
        btn.value = "0";
        btn.id = i;
        btn.classList.add("number");
        if ([2, 5, 8].includes(i)) btn.classList.add("colon");
        else if (i < 3) btn.classList.add("hours");
        else if (i < 6) btn.classList.add("minutes");
        else if (i < 9) btn.classList.add("seconds");
        else btn.classList.add("milliseconds");
        document.getElementById("numbers_container").appendChild(btn);
    }
    setClockSize();
    setInterval(f => flashTime(getTime()), 32);
}
function getTime() {return new Date()}
function flashTime(time) {
    // let timeArr = [0, 0, 0, 0, 0, 0, 7, 0];
    let timeArr = [time.getMilliseconds(), time.getSeconds(), time.getMinutes(), time.getHours(), time.getDay(), time.getDate(), time.getMonth(), time.getFullYear()];
    clock = document.getElementById("clock");
    clockData = clock.getContext("2d");
    clockData.clearRect(0, 0, clock.width, clock.height);
    clockData.lineWidth = 3;
    
    posX = clock.width / 2;
    posY = clock.height / 2;
    // month
    if (settings.SHOW_MONTHS) {
        let dateAdd = interpolate(timeArr[4], 0, 12, 0, (Math.PI * 2 / 60));
        if (TIME_ARRAY_OLD[6] > timeArr[6]) settings.MONTH_COUNTER_CLOCKWISE = !settings.MONTH_COUNTER_CLOCKWISE;
        drawTimeToCtx(posX, posY, settings.MONTH_RADIUS, settings.MONTH_ROTATION, timeArr, 6, dateAdd, settings.MONTH_COUNTER_CLOCKWISE, settings.MONTH_COLOR, settings.CIRCLE_LINE_WIDTH);
        startLineRadius = settings.MONTH_RADIUS;
    }
    // date
    if (settings.SHOW_DATE) {
        let h = interpolate(timeArr[3], 0, 24, 0, (Math.PI * 2 / monthToMonthDays(timeArr[6])));
        if (TIME_ARRAY_OLD[5] > timeArr[5]) settings.DATE_COUNTER_CLOCKWISE = !settings.DATE_COUNTER_CLOCKWISE;
        drawTimeToCtx(posX, posY, settings.DATE_RADIUS, settings.DATE_ROTATION, timeArr, 5, h, settings.DATE_COUNTER_CLOCKWISE, settings.DATE_COLOR, settings.CIRCLE_LINE_WIDTH);
        startLineRadius = settings.DATE_RADIUS;
    }
    // weekday
    if (settings.SHOW_WEEKDAY) {
        let h = interpolate(timeArr[3], 0, 24, 0, (Math.PI * 2 / 7));
        if (TIME_ARRAY_OLD[4] > timeArr[4]) settings.WEEKDAY_COUNTER_CLOCKWISE = !settings.WEEKDAY_COUNTER_CLOCKWISE;
        drawTimeToCtx(posX, posY, settings.WEEKDAY_RADIUS, settings.WEEKDAY_ROTATION, timeArr, 4, h, settings.WEEKDAY_COUNTER_CLOCKWISE, settings.WEEKDAY_COLOR, settings.CIRCLE_LINE_WIDTH);
        startLineRadius = settings.WEEKDAY_RADIUS;
    }
    // hours
    if (settings.SHOW_HOURS) {
        let m = interpolate(timeArr[2], 0, 60, 0, (Math.PI * 2 / 12));
        if (TIME_ARRAY_OLD[3] > timeArr[3]) settings.HOURS_COUNTER_CLOCKWISE = !settings.HOURS_COUNTER_CLOCKWISE;
        drawTimeToCtx(posX, posY, settings.HOURS_RADIUS, settings.HOURS_ROTATION, timeArr, 3, m, settings.HOURS_COUNTER_CLOCKWISE, settings.HOURS_COLOR, settings.CIRCLE_LINE_WIDTH);
        startLineRadius = settings.HOURS_RADIUS;
    }
    // minutes
    if (settings.SHOW_MINUTES) {
        let s = interpolate(timeArr[1], 0, 60, 0, (Math.PI * 2  / 60));
        if (TIME_ARRAY_OLD[2] > timeArr[2]) settings.MINUTES_COUNTER_CLOCKWISE = !settings.MINUTES_COUNTER_CLOCKWISE;
        drawTimeToCtx(posX, posY, settings.MINUTES_RADIUS, settings.MINUTES_ROTATION, timeArr, 2, s, settings.MINUTES_COUNTER_CLOCKWISE, settings.MINUTES_COLOR, settings.CIRCLE_LINE_WIDTH);
        startLineRadius = settings.MINUTES_RADIUS;
    }
    // seconds
    if (settings.SHOW_SECONDS) {
        let ms = interpolate(timeArr[0], 0, 1000, 0, (Math.PI * 2  / 60));
        if (TIME_ARRAY_OLD[1] > timeArr[1]) settings.SECONDS_COUNTER_CLOCKWISE = !settings.SECONDS_COUNTER_CLOCKWISE;
        drawTimeToCtx(posX, posY, settings.SECONDS_RADIUS, settings.SECONDS_ROTATION, timeArr, 1, ms, settings.SECONDS_COUNTER_CLOCKWISE, settings.SECONDS_COLOR, settings.CIRCLE_LINE_WIDTH);
        startLineRadius = settings.SECONDS_RADIUS;
    }
    // milliseconds
    if (settings.SHOW_MILLISECONDS) {
        if (TIME_ARRAY_OLD[0] > timeArr[0]) settings.MILLISECONDS_COUNTER_CLOCKWISE = !settings.MILLISECONDS_COUNTER_CLOCKWISE;
        drawTimeToCtx(posX, posY, settings.MILLISECONDS_RADIUS, settings.MILLISECONDS_ROTATION, timeArr, 0, 0, settings.MILLISECONDS_COUNTER_CLOCKWISE, settings.MILLISECONDS_COLOR, settings.CIRCLE_LINE_WIDTH);
        startLineRadius = settings.MILLISECONDS_RADIUS;
    }
    TIME_ARRAY_OLD = timeArr;
    
    // date & time as text
    let timeString = `${String(timeArr[3]).padStart(2, 0)}:${String(timeArr[2]).padStart(2, 0)}:${String(timeArr[1]).padStart(2, 0)}:${String(timeArr[0]).padStart(3, 0)}`;
    let numberCells = document.getElementById("numbers_container").children;
    document.getElementsByClassName("number")
    for (var i = 0; i < numberCells.length; i++) numberCells[i].value = timeString[i];
    settings.SHOW_TIME && settings.SHOW_MILLISECONDS_STRING ? setStyle("--millisecondsColor", settings.MILLISECONDS_COLOR) : setStyle("--millisecondsColor", "transparent");
    settings.SHOW_TIME && settings.SHOW_SECONDS_STRING ? setStyle("--secondsColor", settings.SECONDS_COLOR) : setStyle("--secondsColor", "transparent");
    settings.SHOW_TIME && settings.SHOW_MINUTES_STRING ? setStyle("--minutesColor", settings.MINUTES_COLOR) : setStyle("--minutesColor", "transparent");
    settings.SHOW_TIME && settings.SHOW_HOURS_STRING ? setStyle("--hoursColor", settings.HOURS_COLOR) : setStyle("--hoursColor", "transparent");
    settings.SHOW_TIME && settings.SHOW_WEEKDAY_STRING ? setStyle("--weekdayColor", settings.WEEKDAY_COLOR) : setStyle("--weekdayColor", "transparent");
    settings.SHOW_TIME && settings.SHOW_DATE_STRING ? setStyle("--dateColor", settings.DATE_COLOR) : setStyle("--dateColor", "transparent");
    settings.SHOW_TIME && settings.SHOW_MONTHS_STRING ? setStyle("--monthsColor", settings.MONTH_COLOR) : setStyle("--monthsColor", "transparent");
    settings.SHOW_TIME && settings.SHOW_YEAR_STRING ? setStyle("--yearColor", settings.YEAR_COLOR) : setStyle("--yearColor", "transparent");
    
    document.getElementById("weekday").value = weekdayToWeekdayString(timeArr[4]);
    document.getElementById("date").value = timeArr[5];
    document.getElementById("month").value = monthToMonthString(timeArr[6]);
    document.getElementById("year").value = timeArr[7];
}
function drawTimeToCtx(posX, posY, radius, rotation, timeArr, colon, add, counterClockwise, color, lineWidth) {
    clock = document.getElementById("clock");
    clockData = clock.getContext("2d");
    clockData.beginPath();
    if (settings.START_LINE) clockData.moveTo(posX, posY - startLineRadius);
    clockData.lineWidth = lineWidth;
    if (settings.GRADIENT) {
        grd = clockData.createRadialGradient(posX, posY, startLineRadius / settings.GRADIENT_RADIUS_0, posX, posY, clock.height / settings.GRADIENT_RADIUS_1);
        grd.addColorStop(0, settings.MILLISECONDS_COLOR);
        grd.addColorStop(1, settings.MONTH_COLOR);
        clockData.strokeStyle = grd;
    } else clockData.strokeStyle = color;
    switch (colon) {
        case 0: clockData.arc(posX, posY, radius, rotation, (((Math.PI * 2  / 1000) * timeArr[colon]) - Math.PI / 2) + add, counterClockwise); break;
        case 3: clockData.arc(posX, posY, radius, rotation, (((Math.PI * 2  / 12) * timeArr[colon]) - Math.PI / 2) + add, counterClockwise); break;
        case 4: clockData.arc(posX, posY, radius, rotation, (((Math.PI * 2  / 7) * timeArr[colon]) - Math.PI / 2) + add, counterClockwise); break;
        case 5: clockData.arc(posX, posY, radius, rotation, (((Math.PI * 2  / monthToMonthDays(7)) * timeArr[colon]) - Math.PI / 2) + add, counterClockwise); break;
        case 6: clockData.arc(posX, posY, radius, rotation, (((Math.PI * 2  / 12) * timeArr[colon]) - Math.PI / 2) + add, counterClockwise); break;
        default: clockData.arc(posX, posY, radius, rotation, (((Math.PI * 2  / 60) * timeArr[colon]) - Math.PI / 2) + add, counterClockwise);
    }
    clockData.stroke();
}

// ===BASE===
function interpolate(x, x1, x2, y1, y2) {
    return y1 + (x - x1) * ((y2 - y1) / (x2 - x1));
}
function monthToMonthString(month) {
    switch (month) {
        case 0: return "January";
        case 1: return "February";
        case 2: return "March";
        case 3: return "April";
        case 4: return "May";
        case 5: return "June";
        case 6: return "July";
        case 7: return "August";
        case 8: return "September";
        case 9: return "October";
        case 10: return "November";
        case 11: return "December";
    }
}
function monthToMonthDays(month) {
    isLeapYear = !((getTime().getFullYear() - 2020 ) % 4);
    switch (month) {
        case 0: return 31;
        case 1: 
            if (isLeapYear) return 29;
            return 28;
        case 2: return 31;
        case 3: return 30;
        case 4: return 31;
        case 5: return 30;
        case 6: return 31;
        case 7: return 31;
        case 8: return 30;
        case 9: return 31;
        case 10: return 30;
        case 11: return 31;
    }
}
function weekdayToWeekdayString(weekday) {
    switch (weekday) {
        case 0: return "Sunday";
        case 1: return "Monday";
        case 2: return "Tuesday";
        case 3: return "Wednesday";
        case 4: return "Thursday";
        case 5: return "Friday";
        case 6: return "Saturday";
    }
}

// ===STYLE===
function setStyle(cssVar, val) {
    document.querySelector(":root").style.setProperty(cssVar, val);
}
function setClockSize() {
    if (!settings.AUTO_SIZE) return;
    clock = document.getElementById("clock");
    clock.width = screen.width - 1;
    clock.height = screen.height - 1;
    settings.MONTH_RADIUS = clock.height / 2 - settings.CORRECTION;
    settings.DATE_RADIUS = settings.MONTH_RADIUS + settings.DATE_RADIUS_CHANGE;
    settings.WEEKDAY_RADIUS = settings.DATE_RADIUS + settings.WEEKDAY_RADIUS_CHANGE;
    settings.HOURS_RADIUS = settings.WEEKDAY_RADIUS + settings.HOURS_RADIUS_CHANGE;
    settings.MINUTES_RADIUS = settings.HOURS_RADIUS + settings.MINUTES_RADIUS_CHANGE;
    settings.SECONDS_RADIUS = settings.MINUTES_RADIUS + settings.SECONDS_RADIUS_CHANGE;
    settings.MILLISECONDS_RADIUS = settings.SECONDS_RADIUS + settings.MILLISECONDS_RADIUS_CHANGE;
}