var calendar = document.getElementById("calendar");
var reminders =  document.getElementById("reminders-list");
var controls =  document.getElementById("controls");
var header =  document.getElementById("header");

function calendarToggle(){
    if (calendar.style.display == "none"){
        calendar.style.display = "block";
        reminders.style.display = "none";
    }else{
        calendar.style.display = "none";
        reminders.style.display = "block";
    }
    // alert("AAA");
}

function selectDate(){
    alert("teehee");
}

function scanner(){
    let scanner = document.getElementById("scanner");
    if (scanner.style.display == "none"){
        scanner.style.display = "block";
        header.style.display = "none";
        reminders.style.display = "none";
        controls.style.display = "none";
    }else{
        scanner.style.display = "none";
        header.style.display = "block";
        reminders.style.display = "block";
        controls.style.display = "block";
    }
}

function add_reminder() {
    scanner();
    let text = document.createTextNode("Go die.");
    let input = document.createElement("INPUT");
    input.setAttribute("type", "checkbox");
    let i = document.createElement("i");
    i.setAttribute("class", "fa fa-info-circle");
    let button = document.createElement("button");
    button.appendChild(i);

    let label = document.createElement("label");
    label.appendChild(input);
    label.appendChild(text);
    label.appendChild(button);
    label.setAttribute("class", "reminder");

    let li = document.createElement("li");
    li.appendChild(label);

    let ul = document.getElementById("ul");
    ul.appendChild(li);
}
