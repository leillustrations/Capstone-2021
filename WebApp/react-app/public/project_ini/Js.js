window.onload = function () {
  var list = document.getElementsByClassName("check-item");
  for (var i in list) {
    list[i].onclick = function () {
      if (this.getElementsByTagName("span")[0].classList.contains('active')) {
        this.getElementsByTagName("span")[0].classList.remove("active");
      } else {
        this.getElementsByTagName("span")[0].classList.add("active");
      }
    }
  }

  document.getElementById("back_home").onclick = function () {
    var i, tabcontent, key, tablinks;
    tabcontent = document.getElementsByClassName("tabcontent");
    for (i = 0; i < tabcontent.length; i++) {
      if (tabcontent[i].style.display === "block") {
        key = i;
      }
      tabcontent[i].style.display = "none";
    }
    tablinks = document.getElementsByClassName("tablinks");
    for (i = 0; i < tablinks.length; i++) {
      tablinks[i].setAttribute("class", "tablinks");
    }
    if (key === tabcontent.length - 1) {
      window.location.href = "/"
    } else {
      tabcontent[key + 1].style.display = "block";
      tablinks[key + 1].classList.add("active");
      if (key === tabcontent.length - 2) {
        document.getElementById("back_home").innerHTML = "Done";
      }
    }
  }
}

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

  if (evt.currentTarget.innerHTML === "Structure") {
    document.getElementById("back_home").innerHTML = "Done";
  } else {
    document.getElementById("back_home").innerHTML = "Next";
  }
}