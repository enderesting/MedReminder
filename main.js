urlParams = new URLSearchParams(window.location.search);

window.onload = function () {
  if (urlParams.has("str")) {
    add_reminder(urlParams.get("str"));
  }
  load_list();
  updateDate();
}
