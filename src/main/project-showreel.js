const main = document.querySelector("main");

class Project {
  constructor(title, image, alt) {
    this.title = title;
    this.image = image;
    this.alt = alt;
  }
}

const projects = [
  new Project(
    "Fashion Magazine",
    "/images/stock-1--tall.jpg",
    "Person sitting in fashionable clothes"
  ),
  new Project(
    "Sport Brand",
    "/images/stock-2--tall.jpg",
    "Person sitting in fashionable clothes"
  ),
  new Project(
    "Food Product",
    "/images/stock-3--tall.jpg",
    "Person sitting in fashionable clothes"
  ),
];


const showreelDisplay = (() => {


  let count;
  let divOuter; 
  let divInner;
  let img;
  let title;

  function _createDiv(className) {
    const div = document.createElement("div");
    div.classList.add(className);
    return div;
  }

  function _togHide(element) {
    element.classList.toggle("hidden");
  }

  function _outerHideCheck() {
   return divOuter.classList.contains("hidden") ? _togHide(divOuter) : false;
  }

  function _createOuterInnerDiv(kind) {
    const div = _createDiv(`main__showreel--${kind}`);
    if (kind === "outer") {
      _togHide(div);
      div.classList.add("p-main__showreel--outer");
      main.appendChild(div);
    } else if (kind === "inner") {
      divOuter.appendChild(div);
    }
    return div;
  }

  function _createImg() {
    const image = document.createElement("img");
    image.classList.add("p-showreel__img");
    divInner.appendChild(image);
    return image;
  }

  function _createTitle() {
    const heading = document.createElement("h2");
    heading.classList.add("showreel__title", "p-showreel__title");
    divInner.appendChild(heading);
    return heading;
  }

  function _resetDisplay(interval) {
    clearInterval(interval);
    _togHide(divOuter);
    count = 0;
  }

  function _setImage() {
    img.setAttribute("src", projects[count].image);
    img.setAttribute("alt", projects[count].alt);
  }

  function _incrementCount() {
    count += 1;
  }

  function _setTitle() {
    title.textContent = projects[count].title;
  }

  function _setShowreelBlock() {
    _setImage();
    _setTitle();
  }

  count = 0;
  divOuter = _createOuterInnerDiv("outer");
  divInner = _createOuterInnerDiv("inner");
  img = _createImg();
  title = _createTitle();

  function check(interval) {
    _outerHideCheck();
    if (count === projects.length) {
      _resetDisplay(interval);
    } else {
      _setShowreelBlock();
      _incrementCount();
    }
  }

  return { check };
})();

const btnShowreel = document.querySelector(".btn--showreel");

btnShowreel.addEventListener("click", () => {
  const interval = setInterval(() => {
    showreelDisplay.check(interval);
  }, 1000);
});


