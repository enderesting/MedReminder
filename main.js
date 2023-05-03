urlParams = new URLSearchParams(window.location.search);

window.onload = function () {
  if (urlParams.has("str")) {
    add_reminder(urlParams.get("str"));
  }
  load_list();
}

// function calendarToggle() {
//     if (calendar.style.display == "block") {
//         calendar.style.display = "none";
//         reminders.style.display = "block";
//     } else {
//         calendar.style.display = "block";
//         reminders.style.display = "none";
//     }
//     // alert("AAA");
// }

// function load_list() {
//     if (datename.textContent == 'Saturday 8th of April'){
//         document.getElementById("ul").innerHTML = localStorage.getItem("future_list");
//     }else{
//         document.getElementById("ul").innerHTML = localStorage.getItem("list");
//     }
// }

// function clean_checked() {
//     for (li of ul.childNodes) {
//         if (li.firstChild.firstChild.checked) {
//             ul.removeChild(li);
//           }
//     }
// }
