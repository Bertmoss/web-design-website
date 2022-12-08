

let displayModule = (function(){
  function _createDiv() {
    return document.createElement("div")
  }

  function _appendChildren(div, array) {
    array.forEach(element => {
      div.appendChild(element);
    });
  }

  function _appendDiv(div) {
    let main = document.querySelector("main");
    main.appendChild(div);
  }
  
  function _createHeading(text) {
    let heading = document.createElement("h2");
    heading.textContent = text;
    return heading
  }

  function _createParagraph(text) {
    let paragraph = document.createElement("p");
    paragraph.textContent = text;
    return paragraph
  }

  function _createImage(imgSrc, alt) {
    let image = document.createElement("img");
    image.src = imgSrc;
    image.setAttribute("alt", alt);
    return image;
  }

  function _createShowBlock(obj) {
    let div =_createDiv();
    let heading = _createHeading(obj.name);
    let description = _createParagraph(obj.description);
    let image = _createImage(obj.image, obj.alt);
    _appendChildren(div, [image, heading, description]);
    return div;
  }
  


  function createShowBlocks(arr) {
    let div = document.createElement("div");
  
    div.classList.add("main__showreel");
    _appendDiv(div);

    for (let i = 0; i < arr.length; i++) {
      function increment() {
        i++;
      }
      
      let project = _createShowBlock(arr[i]);
      div.appendChild(project);
      project.classList.add("elementToFadeInAndOut")
      setTimeout(increment, 3000000000);
    }

    



    /*arr.forEach(element => {
      let project = _createShowBlock(element);
      div.appendChild(project);
      project.classList.add("elementToFadeInAndOut")
      
      
    });*/
    
    /* 
    div.classList.add("elementToFadeInAndOut"); */
    _appendDiv(div);/* 
    setTimeout(div.classList.add("fade-out"), 300000) */
  }
  
  return {
    createShowBlocks
  }
})()


class Project {
  constructor(name, description, image, alt) {
    this.name = name;
    this.description = description;
    this.image = image;
    this.alt = alt;
  }
}

let projects = [new Project("Fashion Magazine", "Lorem ipsum dolor sit amet, consectetur adipiscing elit", "/images/stock-1--tall.jpg", "Person sitting in fashionable clothes"),
new Project("Fashion Magazine", "Lorem ipsum dolor sit amet, consectetur adipiscing elit", "/images/stock-1--tall.jpg", "Person sitting in fashionable clothes"),
new Project("Fashion Magazine", "Lorem ipsum dolor sit amet, consectetur adipiscing elit", "/images/stock-1--tall.jpg", "Person sitting in fashionable clothes"),
];
/* 
displayModule.createShowBlocks(projects); */

/* let showreelBlocks = document.querySelectorAll(".main__showreel div");

showreelBlocks.forEach(element => {
  element.classList.add("elementToFadeInAndOut")
})
 */





let btnShowreel = document.querySelector(".btn--showreel");

btnShowreel.addEventListener("click", () => {

displayModule.createShowBlocks(projects);
 

})



//FORM
let formDisplay = (function() {
//creates alert modal
  function _createAlert(text) {
    let div = document.createElement("div");
    div.classList.add("alert-div", "p-alert-div")
    let p = document.createElement("p");
    p.textContent = text;
    div.appendChild(p);
    _createXBtn(div);
    window.addEventListener("click", () => { //deletes alert-div if you click outside of it
      const isOutside = !event.target.closest(".alert-div") && !event.target.closest("button") 
      if (isOutside) { 
       div.remove();
      }
    })
    main.appendChild(div);
  }

// takes info from the form inputs and adds it as an obj to the inquiries arr
  function _InquiryFromForm( form, classText) {
    let inputs = document.querySelectorAll(`.${classText} input`),
    name,
    email,
    inquiry;

    inputs.forEach(input => {
      switch (input.getAttribute("name")) {
        case "name":
          name = input.value;
          break;
        case "email":
          input.checkValidity() ? email = input.value: false;
          break;
        case "inquiry": 
          inquiry = input.value;
          break;
      }
    })
    if (email) { //check to see if the email input was properly filled out.
      inquiries.push(new Inquiry(name, email, inquiry)) 
      form.remove(); 
    } else {
      if (!document.querySelector(".alert-div"))
      _createAlert("Please provide a valid email")
    }
  }

  //submit btn
  function _createBtn(form, classText) {
    let btn = document.createElement("button");
    btn.textContent = "Submit";
    btn.setAttribute("type", "button");
    btn.classList.add("form__btn--submit",  "block__btn")
    btn.addEventListener("click", () => {
      _InquiryFromForm(form, classText)
    })
    form.appendChild(btn);
  }

  //close btn
  function _createXBtn(form) {
    let btn = document.createElement("button");
    btn.textContent = "Close";
    btn.classList.add("form__btn--close", "p-form__btn--close")
    btn.setAttribute("type", "button")
    btn.addEventListener("click", () => {
      form.remove();
    })
    form.appendChild(btn);
  }
  //creates the form and submit and close btns
  function _createForm(classText) {
    let form = document.createElement("form")
    if (Array.isArray(classText)) {
      classText.forEach(element => {
        form.classList.add(element);
      })
    } else {
      form.classList.add(classText);
    }
    
    
    _createXBtn(form);
    _createBtn(form, classText);
    return form;
  }
  //creates an input from an obj
  function _createInput(obj) {
    let input = document.createElement("input")
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
    let form = _createForm(obj.form)
    obj.inputs.forEach(element => {
      _appendInputLabel(form, element)
    });
    return form;
  }

  return {
    appendInputsLabels
  }
})()

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
  inputs: [new Input("text","name", "name", "Name:"), new Input("email", "email", "email", "Email Address:"), new Input("text", "inquiry", "inquiry", "Inquiry:")],
  form: ["start-project-div__form", "p-start-project-div__form"],
}

//start project btn--form
let formBtn = document.querySelector(".btn--form");
let main = document.querySelector("main");

//check if form already exists, if not create the form
formBtn.addEventListener("click", ()=> {
  (document.querySelector(".start-project-div__form")) ? true: main.appendChild(formDisplay.appendInputsLabels(startProjectForm))
})