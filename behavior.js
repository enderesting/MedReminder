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

function selectDate(num){
    //loop through the list elements
    const dayList = document.querySelector('.days');
    const days = dayList.querySelectorAll('li');
    let datename = document.querySelector('.datename');
    console.log(dayList);
    for(var i = 0; i < days.length; i++){
        const li = days[i];
        const span = li.querySelector('span');
        if (li.textContent == '8'){
            var pickUpDay = span;
            // console.log('pickty',pickUpDay);
        }
        if (li.textContent == '4'){
            var presentDay = span;
            // console.log('presy',presentDay);
        }
    }

    if (presentDay && num==4) {
        // console.log('Present day:', presentDay);
        presentDay.classList.add('active');
        pickUpDay.classList.remove('active');
        datename.textContent='Monday 3rd of April';
        // console.log('Present day:', presentDay);
      }
      
    if (pickUpDay && num==8) {
        // console.log('Pick up day:', pickUpDay);
        presentDay.classList.remove('active');
        pickUpDay.classList.add('active');
        datename.textContent='Saturday 8th of April';
        // console.log('Pick up day:', pickUpDay);
    }
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
