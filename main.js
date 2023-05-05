var calendar = document.getElementById("calendar");
var reminders = document.getElementById("reminders-list");
var controls = document.getElementById("controls");
var header = document.getElementById("header");
// var datenames = document.getElementsByClassName("datename");
// var datename = datenames[0];
var datename = document.querySelector('.datename');
var ul = document.getElementById("ul");
var cButton = document.getElementById("calendarButton");

function calendarToggle() {

    cButton.classList.toggle('rotate');
    if (calendar.style.display == "block") {
        calendar.style.display = "none";
        reminders.style.display = "block";
    } else {
        calendar.style.display = "block";
        reminders.style.display = "none";
    }
    // alert("AAA");
}
urlParams = new URLSearchParams(window.location.search);

window.onload = function () {
  updateDate();
  updateDays();
  if (urlParams.has("str")) {
    add_reminder(urlParams.get("str"));
  }
  load_list();
}

function calendarToggle() {

    cButton.classList.toggle('rotate');
    if (calendar.style.display == "block") {
        calendar.style.display = "none";
        reminders.style.display = "block";
    } else {
        calendar.style.display = "block";
        reminders.style.display = "none";
    }
    // alert("AAA");
}

// NEW CALENDAR
let daysIndex = 4; // note that these start with 1
let monthsIndex = 4; // both these
let yearIndex = 2023;
let weekIndex = getDayFromDate(daysIndex,monthsIndex-1,yearIndex); //starts with sunday: 0
let dayList = calculateDays(1);
updateDays(daysIndex);
updateMonths(monthsIndex);

function getDayFromDate(day, month, year) {
    const date = new Date(year, month, day);
    const weekDay = date.getDay();
    // console.log("the date is " + date);
    // console.log("the day is " + weekDay);
    return weekDay;
}

function getWeekDayStr(weekDay){
    const daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    return daysOfWeek[weekDay];
}

// Next/previous controls
function plusSlides(n,elemName) {
    if (elemName == "days"){
        updateDays(daysIndex+=n);
    }
    if (elemName == "month"){
        updateMonths(monthsIndex+=n);
    }
    updateDatename();
    hide();
}

function updateDatename(){
    let slides = document.getElementsByClassName("month");
    if(slides.length > 0){
        weekIndex = getDayFromDate(daysIndex,monthsIndex-1,yearIndex);
        weekDay = getWeekDayStr(weekIndex);
        // console.log("weekday is: " + weekDay);
        // console.log (slides[monthsIndex-1].textContent + " " + daysIndex + " " + weekDay);
        datename.innerHTML = weekDay +" " + slides[monthsIndex-1].textContent + " " + daysIndex;
        // datename = "hi :)";
        console.log(datename.innerHTML);
    }
}

function updateDays(n) {
    let i;
    let currentIndex = daysIndex;

    for (i = 0; i < dayList.length; i++) { //hide all
        dayList[i].style.display = "none";
    }

    //check days of the current month, switch to next/prev months depending on daysList.length
    if (n > dayList.length) {
        // console.log("next month!");
        plusSlides(1,"month");
        currentIndex = 1;
    }else if (n < 1) {
        // console.log("previous month!");
        plusSlides(-1,"month");
        currentIndex = (dayList.length);
    }

    //currentIndext might've changed. update daysIndex
    daysIndex = currentIndex;
    dayList[daysIndex-1].style.display = "block";
} 

function updateMonths(n){
    let i;
    let currentIndex = monthsIndex;
    let slides = document.getElementsByClassName("month");
    // console.log("YEP HERE GO" + slides.length);
    if(slides.length > 0){
        for (i = 0; i < slides.length; i++) { // turn all slides off
            slides[i].style.display = "none";
        }
        
        if (n > slides.length) {
            currentIndex = 1;
        }else if (n < 1) {
            currentIndex = slides.length;
        }
    
        //update various states
        monthsIndex = currentIndex;
        // console.log("currentIndex:" + currentIndex);
        slides[currentIndex-1].style.display = "block"; //turn current index on
    
        //the month changed, update how many days there are in the current month
        dayList = calculateDays(currentIndex);
    
        //if current day is outside of dayList range, change it to one
        if(daysIndex > dayList.length || daysIndex < 0){
            daysIndex = 1;
            directDaysUpdate(daysIndex);
        }
    }
}

//directly changing days to 1 when months are touched
function directDaysUpdate(n){
    let i;
    let currentIndex = n;
    let days = document.getElementsByClassName("days");
    
    for (i = 0; i < days.length; i++) { //hide all
        days[i].style.display = "none";
    }
    daysIndex = currentIndex;
    dayList[daysIndex-1].style.display = "block";
}


function calculateDays(monthsIndex){
    let daysTotal = document.getElementsByClassName("days");
    let days = Array.from(daysTotal);
    const smallMonths = [4,6,9,11];
    if(monthsIndex == 2){
        days = days.slice(0,28);
        // console.log("days in this month: 28");
    }else if(smallMonths.includes(monthsIndex)){
        days = days.slice(0,30);
        // console.log("days in this month: 30");
    }else{
        // console.log("days in this month: 31");
    }
    //31: 1 3 5 7 8 10 12
    //30: 4 6 9 11
    //28: 2 
    return days;
}

function hide() {
    return ((daysIndex == 4 || daysIndex == 5 || daysIndex == 6 || daysIndex == 7) &&
            monthsIndex == 4 &&
            yearIndex == 2023)
}

function startTime() {
    var today = new Date();
    var h = today.getHours();
    var m = today.getMinutes();
    var s = today.getSeconds();
    h = checkTime(h);
    m = checkTime(m);
    // s = checkTime(s);
    document.getElementById('realtime').innerHTML = h + ":" + m;
    // console.log(meep);
    // var t = setTimeout(startTime, 500);
}
function checkTime(i) {
    if (i < 10) {i = "0" + i};  // add zero in front of numbers < 10
    return i;
}

setInterval(startTime,10);