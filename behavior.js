
function calendarToggle(){
    var calendar = document.getElementById("calendar");
    var reminders =  document.getElementById("reminders-list");
    if (calendar.style.display == "none"){
        calendar.style.display = "block";
        reminders.style.display = "none";
    }else{
        calendar.style.display = "none";
        reminders.style.display = "block";
    }
    // alert("AAA");
}