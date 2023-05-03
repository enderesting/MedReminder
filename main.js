urlParams = new URLSearchParams(window.location.search);

window.onload = function () {
  if (urlParams.has("str")) {
    add_reminder(urlParams.get("str"));
  }
  load_list();
}

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

function load_list() {
    if (datename.textContent == 'Saturday 8th of April'){
        document.getElementById("ul").innerHTML = localStorage.getItem("future_list");
    }else{
        document.getElementById("ul").innerHTML = localStorage.getItem("list");
    }
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

function clean_checked() {
    for (li of ul.childNodes) {
        if (li == ul.firstChild) {continue}
        if (li.firstChild.firstChild.checked) {
            ul.removeChild(li);
          }
    }
}
