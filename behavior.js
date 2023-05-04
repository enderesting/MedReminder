// var calendar = document.getElementById("calendar");
// var reminders = document.getElementById("reminders-list");
// var controls = document.getElementById("controls");
// var header = document.getElementById("header");
// var datename = document.querySelector('.datename');
// var ul = document.getElementById("ul");
// var cButton = document.getElementById("calendarButton");

// function calendarToggle() {

//     cButton.classList.toggle('rotate');
//     if (calendar.style.display == "block") {
//         calendar.style.display = "none";
//         reminders.style.display = "block";
//     } else {
//         calendar.style.display = "block";
//         reminders.style.display = "none";
//     }
//     // alert("AAA");
// }

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
    window.location.href = `main.html?str=${str}`; //come back tag
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
    if (confirm("You are going to delete all instances of this reminder. Are you sure?")) {
        localStorage.clear();
        window.location.href = "main.html";
    }
}

function cancel_reminder() {
    window.location.href = "main.html";
}


function pop_reminder() {
    let reminder = ul.firstChild;
    if (reminder == null) {
        alert("No reminders.");
    } else
        // if (confirm("Take reminder:\n" + reminder.querySelector("#text")))
        if (confirm("Reminder:\n" + "9:00   Take Prozac"))
            reminder.firstChild.firstChild.checked = true;
            console.log(reminder);
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
