// Hamburger Menu Btn

const btn = document.querySelector(".header-div__btn");
const nav = document.querySelector(".header__nav");
const root = document.querySelector(":root");

btn.addEventListener("click", () => {
  btn.classList.toggle("open");
  nav.classList.toggle("hidden-nav");
  root.classList.toggle('dark');
});
