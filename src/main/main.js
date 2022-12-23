const main = document.querySelector("main");

const inquiries = [];

// FORM
const formDisplay = (() => {

    // close btn
    function _createXBtn(form) {
      const btn = document.createElement("button");
      btn.textContent = "Close";
      btn.classList.add("form__btn--close", "p-form__btn--close");
      btn.setAttribute("type", "button");
      btn.addEventListener("click", () => {
        form.remove();
      });
      form.appendChild(btn);
    }


   // creates alert modal
   function _createAlert(text) {
    const div = document.createElement("div");
    div.classList.add("alert-div", "p-alert-div");
    const p = document.createElement("p");
    p.textContent = text;
    div.appendChild(p);
    _createXBtn(div);
    window.addEventListener("click", (event) => {
      // deletes alert-div if you click outside of it
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
      const inputs = document.querySelectorAll(`.${classText} input`);
      let name;
      let email;
      let inquiry;
  
      inputs.forEach((input) => {
        switch (input.getAttribute("name")) {
          case "name":
            name = input.value;
            break;
          case "email":
            if (input.checkValidity()) {
              email = input.value;
            }
            break;
          case "inquiry":
            inquiry = input.value;
            break;
          default:
        }
      });
      if (email) {
        const obj = {"name": name, "email": email, "inquiry": inquiry}
        // check to see if the email input was properly filled out.
        inquiries.push(obj);
        form.remove();
      } else if (!document.querySelector(".alert-div"))
        _createAlert("Please provide a valid email");
    }
  

    // submit btn
    function _createBtn(form, classText) {
      const btn = document.createElement("button");
      btn.textContent = "Submit";
      btn.setAttribute("type", "button");
      btn.classList.add("form__btn--submit", "block__btn");
      btn.addEventListener("click", () => {
        _InquiryFromForm(form, classText);
      });
      form.appendChild(btn);
    }
  



 

 

  // creates the form and submit and close btns
  function _createForm(classText) {
    const form = document.createElement("form");
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
  // creates an input from an obj
  function _createInput(obj) {
    const input = document.createElement("input");
    input.setAttribute("type", obj.type);
    input.setAttribute("name", obj.name);
    input.setAttribute("id", obj.id);
    return input;
  }
  // creates label from an obj
  function _createLabel(obj) {
    const label = document.createElement("label");
    label.setAttribute("for", obj.id);
    label.textContent = obj.text;
    return label;
  }
  // creates and appends input and label to form
  function _appendInputLabel(form, obj) {
    const label = _createLabel(obj);
    const input = _createInput(obj);
    form.appendChild(label);
    form.appendChild(input);
  }
  // creates and appends all input and label
  function appendInputsLabels(obj) {
    const form = _createForm(obj.form);
    obj.inputs.forEach((element) => {
      _appendInputLabel(form, element);
    });
    return form;
  }

  return {
    appendInputsLabels,
  };
})();


// Creates input information objects for the form
class Input {
  constructor(type, name, id, text) {
    this.type = type;
    this.name = name;
    this.id = id;
    this.text = text;
  }
}
// Obj that holds all the input information objs, and the form's class name
const startProjectForm = {
  inputs: [
    new Input("text", "name", "name", "Name:"),
    new Input("email", "email", "email", "Email Address:"),
    new Input("text", "inquiry", "inquiry", "Inquiry:"),
  ],
  form: ["start-project-div__form", "p-start-project-div__form"],
};

// start project btn--form
const formBtn = document.querySelector(".btn--form");

// check if form already exists, if not create the form
formBtn.addEventListener("click", () => {
  if (!document.querySelector(".start-project-div__form")) {
    main.appendChild(formDisplay.appendInputsLabels(startProjectForm));
}});

// latest-div btn

const latestBtn = document.querySelector(".latest-div__btn-more");
const blocksMinimize = document.querySelectorAll(
  ".latest-div__block--minimize"
);

latestBtn.addEventListener("click", () => {
  blocksMinimize.forEach((block) => {
    block.setAttribute("style", "display: block");
  });
  latestBtn.setAttribute("style", "display: none");
});
