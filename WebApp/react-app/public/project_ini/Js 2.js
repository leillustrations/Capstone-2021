function openInterest(evt, interestName) {
  var i, tabcontent, tablinks;
  tabcontent = document.getElementsByClassName("tabcontent");
  for (i = 0; i < tabcontent.length; i++) {
    tabcontent[i].style.display = "none";
  }
  tablinks = document.getElementsByClassName("tablinks");
  for (i = 0; i < tablinks.length; i++) {
    tablinks[i].setAttribute("class", "tablinks");
  }
  document.getElementById(interestName).style.display = "block";
  evt.currentTarget.classList.add("active");
}
window.onload = function () {
  var list = document.getElementsByClassName("check-item");
  for (var i in list) {
    list[i].onclick = function () {
      console.log(this);
      this.getElementsByTagName("span")[0].classList.add("active");
    }
  }
}