var calendar = document.getElementById("calendar");
var reminders = document.getElementById("reminders-list");
var controls = document.getElementById("controls");
var header = document.getElementById("header");
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

function load_list() {
    if (datename.textContent == 'Saturday 8th of April'){
        document.getElementById("ul").innerHTML = localStorage.getItem("future_list");
    }else{
        document.getElementById("ul").innerHTML = localStorage.getItem("list");
    }
}

function clean_checked() {
    for (li of ul.childNodes) {
        if (li.firstChild.firstChild.checked) {
            ul.removeChild(li);
          }
    }
}


function selectDate(num) {
    //loop through the list elements
    const dayList = document.querySelector('.days');
    const days = dayList.querySelectorAll('li');
    // let datename = document.querySelector('.datename');
    // console.log(dayList);
    for (var i = 0; i < days.length; i++) {
        const li = days[i];
        const span = li.querySelector('span');
        if (li.textContent == '8') {
            var pickUpDay = span;
            // console.log('pickty',pickUpDay);
        }
        if (li.textContent == '4') {
            var presentDay = span;
            // console.log('presy',presentDay);
        }
    }

    if (presentDay && num == 4) {
        // console.log('Present day:', presentDay);
        presentDay.classList.add('active');
        pickUpDay.classList.remove('active');
        datename.textContent = 'Monday 4th of April';
        // console.log('Present day:', presentDay);
    }

    if (pickUpDay && num == 8) {
        // console.log('Pick up day:', pickUpDay);
        presentDay.classList.remove('active');
        pickUpDay.classList.add('active');
        datename.textContent = 'Saturday 8th of April';
        // console.log('Pick up day:', pickUpDay);
    }
    load_list();
}

function scanner() {
    let scanner = document.getElementById("scanner");
    if (scanner.style.display == "block") {
        scanner.style.display = "none";
        header.style.display = "block";
        reminders.style.display = "block";
        controls.style.display = "block";
    } else {
        scanner.style.display = "block";
        header.style.display = "none";
        reminders.style.display = "none";
        controls.style.display = "none";
    }
}

function go_to_scanner() {
    localStorage.setItem("list", document.getElementById("ul").innerHTML);
    window.location.href = "scanning.html";
}


// function load_future_list() {
//     add_reminder('Refill Prozac');
//     document.getElementById("ul").innerHTML = localStorage.getItem("list");
// }

function go_to_info() {
    localStorage.setItem("list", document.getElementById("ul").innerHTML);
    window.location.href = "info.html";
}

function go_to_main() {
    window.location.href = "main.html";
}

function add_med_reminder(str){
    window.location.href = `main.html?str=${str}`;
}

function add_reminder(str) {

    let reminders_list = localStorage.getItem("list");

    // let text = document.createTextNode("Take Prozac");
    let text = document.createTextNode(str);
    let input = document.createElement("INPUT");
    input.setAttribute("type", "checkbox");
    let i = document.createElement("i");
    i.setAttribute("class", "fa fa-info-circle");
    let button = document.createElement("button");
    button.setAttribute("onclick", "go_to_info()");
    button.appendChild(i);

    let label = document.createElement("label");
    label.appendChild(input);
    label.appendChild(text);
    label.appendChild(button);
    label.setAttribute("class", "reminder");

    let li = document.createElement("li");
    li.appendChild(label);

    let ul = document.createElement("ul");
    ul.appendChild(li);
    let final = reminders_list + ul.innerHTML;

    localStorage.setItem("list", final);
    // window.location.href = "main.html";
}

function clear_list(){
    if (confirm("You are about to delete all reminders. Are you sure?")) {
        localStorage.clear();
        load_list();
    }
}

function cancel_reminder() {
    window.location.href = "main.html";
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
    updateLocalSt();
}

function updateDatename(){
    let slides = document.getElementsByClassName("month");
    weekIndex = getDayFromDate(daysIndex,monthsIndex-1,yearIndex);
    weekDay = getWeekDayStr(weekIndex);
    console.log("weekday is: " + weekDay);
    console.log (slides[monthsIndex-1].textContent + " " + daysIndex + " " + weekDay);
    datename = slides[monthsIndex-1].textContent + " " + daysIndex + " " + weekDay;
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
    slides[currentIndex-1].style.display = "block"; //turn current index on

    //the month changed, update how many days there are in the current month
    dayList = calculateDays(currentIndex);

    //if current day is outside of dayList range, change it to one
    if(daysIndex > dayList.length || daysIndex < 0){
        daysIndex = 1;
        fuckthis(daysIndex);
    }
}

//directly changing days to 1 when months are touched
function fuckthis(n){
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

function pop_reminder() {
    let reminder = ul.firstChild;
    if (reminder == null) {
        alert("No reminders.");
    } else
        // if (confirm("Take reminder:\n" + reminder.querySelector("#text")))
        if (confirm("Reminder:\n" + "9:00   Take Prozac"))
            reminder.firstChild.firstChild.checked = true;
}


function updateDate() {
    let stDate = localStorage.getItem("day");
    if (stDate == null) {
        localStorage.setItem("day", Number(daysIndex));
        localStorage.setItem("month", Number(monthsIndex));
        localStorage.setItem("year", Number(yearIndex));
    }
    else {
        daysIndex = Number(localStorage.getItem("day"));
        monthsIndex = Number(localStorage.getItem("month"));
        yearIndex = Number(localStorage.getItem("year"));
    }
}

function getMonthStr(int) {
    let months = ['February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December', 'January'];
    return months[int];
}

function updateLocalSt() {
    localStorage.setItem("day", Number(daysIndex));
    localStorage.setItem("month", Number(monthsIndex));
    localStorage.setItem("year", Number(yearIndex));
    console.log( "" +daysIndex + "//" + monthsIndex + "//" + yearIndex)
}
