//Hamburger Menu Btn/* 
let btn = document.querySelector(".header-div__btn");
let nav = document.querySelector(".header__nav");
let root = document.querySelector(":root");



btn.addEventListener("click", () => {
  btn.classList.toggle("open");
  nav.classList.toggle("hidden");
  root.classList.toggle("dark");
}) 


