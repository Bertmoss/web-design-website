let main = document.querySelector("main");

let showreelDisplay = (function () {
  function _createDiv(className) {
    let div = document.createElement("div");
    div.classList.add(className);
    return div;
  }

  function _togHide(element) {
    element.classList.toggle("hidden");
  }

  function _outerHideCheck() {
    divOuter.classList.contains("hidden") ? _togHide(divOuter) : false;
  }


  function _createOuterInnerDiv(kind) {
    let div = _createDiv("main__showreel--" + kind);
    if (kind == "outer") {
      _togHide(div);
      div.classList.add("p-main__showreel--outer");
      main.appendChild(div);
    } else if (kind == "inner") {
      divOuter.appendChild(div);
    }
    return div;
  }

  function _createImg() {
    let img = document.createElement("img");
    img.classList.add("p-showreel__img");
    divInner.appendChild(img);
    return img;
  }

  function _createTitle() {
    let title = document.createElement("h2");
    title.classList.add("showreel__title", "p-showreel__title");
    divInner.appendChild(title);
    return title;
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
    count++;
  }

  function _setTitle() {
    title.textContent = projects[count].title;
  }

  function _setShowreelBlock() {
    _setImage();
    _setTitle();
  }

  let count = 0;
  let divOuter = _createOuterInnerDiv("outer");
  let divInner = _createOuterInnerDiv("inner");
  let img = _createImg();
  let title = _createTitle();

  
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

let btnShowreel = document.querySelector(".btn--showreel");

btnShowreel.addEventListener("click", () => {
  let interval = setInterval(function () {
    showreelDisplay.check(interval);
  }, 1000);
});

class Project {
  constructor(title, image, alt) {
    this.title = title;
    this.image = image;
    this.alt = alt;
  }
}

let projects = [
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


//FORM
let formDisplay = (function () {
  //creates alert modal
  function _createAlert(text) {
    let div = document.createElement("div");
    div.classList.add("alert-div", "p-alert-div");
    let p = document.createElement("p");
    p.textContent = text;
    div.appendChild(p);
    _createXBtn(div);
    window.addEventListener("click", () => {
      //deletes alert-div if you click outside of it
      const isOutside =
        !event.target.closest(".alert-div") && !event.target.closest("button");
      if (isOutside) {
        div.remove();
      }
    });
    main.appendChild(div);
  }

  // takes info from the form inputs and adds it as an obj to the inquiries arr
  function _InquiryFromForm(form, classText) {
    let inputs = document.querySelectorAll(`.${classText} input`),
      name,
      email,
      inquiry;

    inputs.forEach((input) => {
      switch (input.getAttribute("name")) {
        case "name":
          name = input.value;
          break;
        case "email":
          input.checkValidity() ? (email = input.value) : false;
          break;
        case "inquiry":
          inquiry = input.value;
          break;
      }
    });
    if (email) {
      //check to see if the email input was properly filled out.
      inquiries.push(new Inquiry(name, email, inquiry));
      form.remove();
    } else {
      if (!document.querySelector(".alert-div"))
        _createAlert("Please provide a valid email");
    }
  }

  //submit btn
  function _createBtn(form, classText) {
    let btn = document.createElement("button");
    btn.textContent = "Submit";
    btn.setAttribute("type", "button");
    btn.classList.add("form__btn--submit", "block__btn");
    btn.addEventListener("click", () => {
      _InquiryFromForm(form, classText);
    });
    form.appendChild(btn);
  }

  //close btn
  function _createXBtn(form) {
    let btn = document.createElement("button");
    btn.textContent = "Close";
    btn.classList.add("form__btn--close", "p-form__btn--close");
    btn.setAttribute("type", "button");
    btn.addEventListener("click", () => {
      form.remove();
    });
    form.appendChild(btn);
  }
  //creates the form and submit and close btns
  function _createForm(classText) {
    let form = document.createElement("form");
    if (Array.isArray(classText)) {
      classText.forEach((element) => {
        form.classList.add(element);
      });
    } else {
      form.classList.add(classText);
    }

    _createXBtn(form);
    _createBtn(form, classText);
    return form;
  }
  //creates an input from an obj
  function _createInput(obj) {
    let input = document.createElement("input");
    input.setAttribute("type", obj.type);
    input.setAttribute("name", obj.name);
    input.setAttribute("id", obj.id);
    return input;
  }
  //creates label from an obj
  function _createLabel(obj) {
    let label = document.createElement("label");
    label.setAttribute("for", obj.id);
    label.textContent = obj.text;
    return label;
  }
  //creates and appends input and label to form
  function _appendInputLabel(form, obj) {
    let label = _createLabel(obj);
    let input = _createInput(obj);
    form.appendChild(label);
    form.appendChild(input);
  }
  //creates and appends all input and label
  function appendInputsLabels(obj) {
    let form = _createForm(obj.form);
    obj.inputs.forEach((element) => {
      _appendInputLabel(form, element);
    });
    return form;
  }

  return {
    appendInputsLabels,
  };
})();

//Creates inquiry objects from the data taken from the form inputs
class Inquiry {
  constructor(name, email, text) {
    this.name = name;
    this.email = email;
    this.text = text;
  }
}

let inquiries = [];

//Creates input information objects for the form
class Input {
  constructor(type, name, id, text) {
    this.type = type;
    this.name = name;
    this.id = id;
    this.text = text;
  }
}
//Obj that holds all the input information objs, and the form's class name
let startProjectForm = {
  inputs: [
    new Input("text", "name", "name", "Name:"),
    new Input("email", "email", "email", "Email Address:"),
    new Input("text", "inquiry", "inquiry", "Inquiry:"),
  ],
  form: ["start-project-div__form", "p-start-project-div__form"],
};

//start project btn--form
let formBtn = document.querySelector(".btn--form");

//check if form already exists, if not create the form
formBtn.addEventListener("click", () => {
  document.querySelector(".start-project-div__form")
    ? true
    : main.appendChild(formDisplay.appendInputsLabels(startProjectForm));
});



//latest-div btn

let latestBtn = document.querySelector(".latest-div__btn-more");
let blocksMinimize = document.querySelectorAll(".latest-div__block--minimize")

latestBtn.addEventListener("click", () => {
  blocksMinimize.forEach(block => {
    block.setAttribute("style", "display: block");
  })
  latestBtn.setAttribute("style", "display: none");
})