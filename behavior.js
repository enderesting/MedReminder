var calendar = document.getElementById("calendar");
var reminders = document.getElementById("reminders-list");
var controls = document.getElementById("controls");
var header = document.getElementById("header");
var datename = document.querySelector('.datename');
window.onload = function () {
    if (!("first" in localStorage) && window.location.href == "main.html") {
        localStorage.removeItem("list");
        localStorage.setItem("first");
    }
}
window.onload = load_list();

function calendarToggle() {
    if (calendar.style.display == "block") {
        calendar.style.display = "none";
        reminders.style.display = "block";
    } else {
        calendar.style.display = "block";
        reminders.style.display = "none";
    }
    // alert("AAA");
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

function load_list() {
    if (datename.textContent == 'Saturday 8th of April'){
        document.getElementById("ul").innerHTML = localStorage.getItem("future_list");
    }else{
        document.getElementById("ul").innerHTML = localStorage.getItem("list");
    }
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
    add_reminder(str);
    window.location.href = "main.html";
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
let daysIndex = 1;
let monthsIndex = 1;
showSlides(daysIndex, "days");
showSlides(monthsIndex, "month");

// Next/previous controls
function plusSlides(n,elemName) {
    // let num = getAssociatedIndex(elemName);
    // num += n;
    // showSlides(num,elemName);
    if (elemName == "days"){
        showSlides(daysIndex+=n,elemName);
    }
    if (elemName == "month"){
        // alert(monthsIndex);
        showSlides(monthsIndex+=n,elemName);
    }
}

// Thumbnail image controls
function currentSlide(n,elemName) {
    if (elemName == "days"){
        showSlides(daysIndex=n,elemName);
    }
    if (elemName == "month"){
        // alert(monthsIndex);
        showSlides(monthsIndex=n,elemName);
    }
}

function getAssociatedIndex (elemName){
    if (elemName == "days"){
        return daysIndex;
    }
    if (elemName == "month"){
        // alert(monthsIndex);
        return monthsIndex;
    }
}

function showSlides(n,elemName) {
    const indexMap = {
        days: daysIndex,
        month: monthsIndex
    };
    let currentIndex = indexMap[elemName];
    let i;
    let slidesFull = document.getElementsByClassName(elemName);
    let slides = Array.from(slidesFull);
    let months = document.getElementsByClassName("month");
    console.log(monthsIndex);
    let mon = months[(monthsIndex-1)%12].textContent;
    console.log(mon);
    const smallMonths = [4,6,9,11];
    if(monthsIndex == 2){
        slides = slides.slice(0,28);
        console.log("days in this month: 28");
    }else if(smallMonths.includes(monthsIndex)){
        slides = slides.slice(0,30);
        console.log("days in this month: 30");
    }else{
        // let slides = slidesFull;
        console.log("days in this month: 31");
    }
    //31: 1 3 5 7 8 10 12
    //30: 4 6 9 11
    //28: 2 


    //   let dots = document.getElementsByClassName("dot");
    if (n > slides.length) {
        currentIndex = 1;
        // plusSlides(1,"month");
    }
    if (n < 1) {
        currentIndex = slides.length;
        // plusSlides(-1,"month");
    }
    for (i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
    }
    slides[currentIndex-1].style.display = "block";

    if (elemName == "days"){ //update the actual stuff
        daysIndex = currentIndex;
    }
    if (elemName == "month"){
        monthsIndex= currentIndex;
    }

    // console.log(currentIndex);
    // console.log(daysIndex);
} 