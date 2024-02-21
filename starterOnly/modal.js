function editNav() {
  var x = document.getElementById("myTopnav");
  if (x.className === "topnav") {
    x.className += " responsive";
  } else {
    x.className = "topnav";
  }
}

// DOM Elements
const modalbg = document.querySelector(".bground");
const modalbgValidation = document.querySelector(".bground-validation")
const modalBtn = document.querySelectorAll(".modal-btn");
const modalBtnValidation = document.querySelector(".modal-btn-validation")
const formData = document.querySelectorAll(".formData");

modalBtnValidation.addEventListener("click", (event)=>{
    event.preventDefault();
    console.log("hello");
    modalbg.style.display = "none";
    modalbgValidation.style.display ="block";
})

// launch modal event
modalBtn.forEach((btn) => btn.addEventListener("click", launchModal));

// launch modal form
function launchModal() {
  modalbg.style.display = "block";
}


