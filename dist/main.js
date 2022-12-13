/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./src/header/header.js":
/*!******************************!*\
  !*** ./src/header/header.js ***!
  \******************************/
/***/ (() => {

//Hamburger Menu Btn/* 
let btn = document.querySelector(".header-div__btn");
let nav = document.querySelector(".header__nav");
let root = document.querySelector(":root");



btn.addEventListener("click", () => {
  btn.classList.toggle("open");
  nav.classList.toggle("hidden-nav");
  root.classList.toggle("dark");
}) 





/***/ }),

/***/ "./src/main/main.js":
/*!**************************!*\
  !*** ./src/main/main.js ***!
  \**************************/
/***/ (() => {

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


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be in strict mode.
(() => {
"use strict";
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _header_header__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./header/header */ "./src/header/header.js");
/* harmony import */ var _header_header__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_header_header__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _main_main__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./main/main */ "./src/main/main.js");
/* harmony import */ var _main_main__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_main_main__WEBPACK_IMPORTED_MODULE_1__);


})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QSxnREFBZ0QsYUFBYTtXQUM3RDs7Ozs7Ozs7Ozs7Ozs7OztBQ053QiIsInNvdXJjZXMiOlsid2VicGFjazovL3dlYi1kZXNpZ24td2Vic2l0ZS8uL3NyYy9oZWFkZXIvaGVhZGVyLmpzIiwid2VicGFjazovL3dlYi1kZXNpZ24td2Vic2l0ZS8uL3NyYy9tYWluL21haW4uanMiLCJ3ZWJwYWNrOi8vd2ViLWRlc2lnbi13ZWJzaXRlL3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL3dlYi1kZXNpZ24td2Vic2l0ZS93ZWJwYWNrL3J1bnRpbWUvY29tcGF0IGdldCBkZWZhdWx0IGV4cG9ydCIsIndlYnBhY2s6Ly93ZWItZGVzaWduLXdlYnNpdGUvd2VicGFjay9ydW50aW1lL2RlZmluZSBwcm9wZXJ0eSBnZXR0ZXJzIiwid2VicGFjazovL3dlYi1kZXNpZ24td2Vic2l0ZS93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovL3dlYi1kZXNpZ24td2Vic2l0ZS93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovL3dlYi1kZXNpZ24td2Vic2l0ZS8uL3NyYy9pbmRleC5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyIvL0hhbWJ1cmdlciBNZW51IEJ0bi8qIFxubGV0IGJ0biA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuaGVhZGVyLWRpdl9fYnRuXCIpO1xubGV0IG5hdiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuaGVhZGVyX19uYXZcIik7XG5sZXQgcm9vdCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCI6cm9vdFwiKTtcblxuXG5cbmJ0bi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKCkgPT4ge1xuICBidG4uY2xhc3NMaXN0LnRvZ2dsZShcIm9wZW5cIik7XG4gIG5hdi5jbGFzc0xpc3QudG9nZ2xlKFwiaGlkZGVuLW5hdlwiKTtcbiAgcm9vdC5jbGFzc0xpc3QudG9nZ2xlKFwiZGFya1wiKTtcbn0pIFxuXG5cblxuIiwibGV0IG1haW4gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwibWFpblwiKTtcblxubGV0IHNob3dyZWVsRGlzcGxheSA9IChmdW5jdGlvbiAoKSB7XG4gIGZ1bmN0aW9uIF9jcmVhdGVEaXYoY2xhc3NOYW1lKSB7XG4gICAgbGV0IGRpdiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gICAgZGl2LmNsYXNzTGlzdC5hZGQoY2xhc3NOYW1lKTtcbiAgICByZXR1cm4gZGl2O1xuICB9XG5cbiAgZnVuY3Rpb24gX3RvZ0hpZGUoZWxlbWVudCkge1xuICAgIGVsZW1lbnQuY2xhc3NMaXN0LnRvZ2dsZShcImhpZGRlblwiKTtcbiAgfVxuXG4gIGZ1bmN0aW9uIF9vdXRlckhpZGVDaGVjaygpIHtcbiAgICBkaXZPdXRlci5jbGFzc0xpc3QuY29udGFpbnMoXCJoaWRkZW5cIikgPyBfdG9nSGlkZShkaXZPdXRlcikgOiBmYWxzZTtcbiAgfVxuXG5cbiAgZnVuY3Rpb24gX2NyZWF0ZU91dGVySW5uZXJEaXYoa2luZCkge1xuICAgIGxldCBkaXYgPSBfY3JlYXRlRGl2KFwibWFpbl9fc2hvd3JlZWwtLVwiICsga2luZCk7XG4gICAgaWYgKGtpbmQgPT0gXCJvdXRlclwiKSB7XG4gICAgICBfdG9nSGlkZShkaXYpO1xuICAgICAgZGl2LmNsYXNzTGlzdC5hZGQoXCJwLW1haW5fX3Nob3dyZWVsLS1vdXRlclwiKTtcbiAgICAgIG1haW4uYXBwZW5kQ2hpbGQoZGl2KTtcbiAgICB9IGVsc2UgaWYgKGtpbmQgPT0gXCJpbm5lclwiKSB7XG4gICAgICBkaXZPdXRlci5hcHBlbmRDaGlsZChkaXYpO1xuICAgIH1cbiAgICByZXR1cm4gZGl2O1xuICB9XG5cbiAgZnVuY3Rpb24gX2NyZWF0ZUltZygpIHtcbiAgICBsZXQgaW1nID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImltZ1wiKTtcbiAgICBpbWcuY2xhc3NMaXN0LmFkZChcInAtc2hvd3JlZWxfX2ltZ1wiKTtcbiAgICBkaXZJbm5lci5hcHBlbmRDaGlsZChpbWcpO1xuICAgIHJldHVybiBpbWc7XG4gIH1cblxuICBmdW5jdGlvbiBfY3JlYXRlVGl0bGUoKSB7XG4gICAgbGV0IHRpdGxlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImgyXCIpO1xuICAgIHRpdGxlLmNsYXNzTGlzdC5hZGQoXCJzaG93cmVlbF9fdGl0bGVcIiwgXCJwLXNob3dyZWVsX190aXRsZVwiKTtcbiAgICBkaXZJbm5lci5hcHBlbmRDaGlsZCh0aXRsZSk7XG4gICAgcmV0dXJuIHRpdGxlO1xuICB9XG5cbiAgZnVuY3Rpb24gX3Jlc2V0RGlzcGxheShpbnRlcnZhbCkge1xuICAgIGNsZWFySW50ZXJ2YWwoaW50ZXJ2YWwpO1xuICAgIF90b2dIaWRlKGRpdk91dGVyKTtcbiAgICBjb3VudCA9IDA7XG4gIH1cblxuICBmdW5jdGlvbiBfc2V0SW1hZ2UoKSB7XG4gICAgaW1nLnNldEF0dHJpYnV0ZShcInNyY1wiLCBwcm9qZWN0c1tjb3VudF0uaW1hZ2UpO1xuICAgIGltZy5zZXRBdHRyaWJ1dGUoXCJhbHRcIiwgcHJvamVjdHNbY291bnRdLmFsdCk7XG4gIH1cblxuICBmdW5jdGlvbiBfaW5jcmVtZW50Q291bnQoKSB7XG4gICAgY291bnQrKztcbiAgfVxuXG4gIGZ1bmN0aW9uIF9zZXRUaXRsZSgpIHtcbiAgICB0aXRsZS50ZXh0Q29udGVudCA9IHByb2plY3RzW2NvdW50XS50aXRsZTtcbiAgfVxuXG4gIGZ1bmN0aW9uIF9zZXRTaG93cmVlbEJsb2NrKCkge1xuICAgIF9zZXRJbWFnZSgpO1xuICAgIF9zZXRUaXRsZSgpO1xuICB9XG5cbiAgbGV0IGNvdW50ID0gMDtcbiAgbGV0IGRpdk91dGVyID0gX2NyZWF0ZU91dGVySW5uZXJEaXYoXCJvdXRlclwiKTtcbiAgbGV0IGRpdklubmVyID0gX2NyZWF0ZU91dGVySW5uZXJEaXYoXCJpbm5lclwiKTtcbiAgbGV0IGltZyA9IF9jcmVhdGVJbWcoKTtcbiAgbGV0IHRpdGxlID0gX2NyZWF0ZVRpdGxlKCk7XG5cbiAgXG4gIGZ1bmN0aW9uIGNoZWNrKGludGVydmFsKSB7XG4gICAgX291dGVySGlkZUNoZWNrKCk7XG4gICAgaWYgKGNvdW50ID09PSBwcm9qZWN0cy5sZW5ndGgpIHtcbiAgICAgIF9yZXNldERpc3BsYXkoaW50ZXJ2YWwpO1xuICAgIH0gZWxzZSB7XG4gICAgICBfc2V0U2hvd3JlZWxCbG9jaygpO1xuICAgICAgX2luY3JlbWVudENvdW50KCk7XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIHsgY2hlY2sgfTtcbn0pKCk7XG5cbmxldCBidG5TaG93cmVlbCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuYnRuLS1zaG93cmVlbFwiKTtcblxuYnRuU2hvd3JlZWwuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsICgpID0+IHtcbiAgbGV0IGludGVydmFsID0gc2V0SW50ZXJ2YWwoZnVuY3Rpb24gKCkge1xuICAgIHNob3dyZWVsRGlzcGxheS5jaGVjayhpbnRlcnZhbCk7XG4gIH0sIDEwMDApO1xufSk7XG5cbmNsYXNzIFByb2plY3Qge1xuICBjb25zdHJ1Y3Rvcih0aXRsZSwgaW1hZ2UsIGFsdCkge1xuICAgIHRoaXMudGl0bGUgPSB0aXRsZTtcbiAgICB0aGlzLmltYWdlID0gaW1hZ2U7XG4gICAgdGhpcy5hbHQgPSBhbHQ7XG4gIH1cbn1cblxubGV0IHByb2plY3RzID0gW1xuICBuZXcgUHJvamVjdChcbiAgICBcIkZhc2hpb24gTWFnYXppbmVcIixcbiAgICBcIi9pbWFnZXMvc3RvY2stMS0tdGFsbC5qcGdcIixcbiAgICBcIlBlcnNvbiBzaXR0aW5nIGluIGZhc2hpb25hYmxlIGNsb3RoZXNcIlxuICApLFxuICBuZXcgUHJvamVjdChcbiAgICBcIlNwb3J0IEJyYW5kXCIsXG4gICAgXCIvaW1hZ2VzL3N0b2NrLTItLXRhbGwuanBnXCIsXG4gICAgXCJQZXJzb24gc2l0dGluZyBpbiBmYXNoaW9uYWJsZSBjbG90aGVzXCJcbiAgKSxcbiAgbmV3IFByb2plY3QoXG4gICAgXCJGb29kIFByb2R1Y3RcIixcbiAgICBcIi9pbWFnZXMvc3RvY2stMy0tdGFsbC5qcGdcIixcbiAgICBcIlBlcnNvbiBzaXR0aW5nIGluIGZhc2hpb25hYmxlIGNsb3RoZXNcIlxuICApLFxuXTtcblxuXG4vL0ZPUk1cbmxldCBmb3JtRGlzcGxheSA9IChmdW5jdGlvbiAoKSB7XG4gIC8vY3JlYXRlcyBhbGVydCBtb2RhbFxuICBmdW5jdGlvbiBfY3JlYXRlQWxlcnQodGV4dCkge1xuICAgIGxldCBkaXYgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICAgIGRpdi5jbGFzc0xpc3QuYWRkKFwiYWxlcnQtZGl2XCIsIFwicC1hbGVydC1kaXZcIik7XG4gICAgbGV0IHAgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwicFwiKTtcbiAgICBwLnRleHRDb250ZW50ID0gdGV4dDtcbiAgICBkaXYuYXBwZW5kQ2hpbGQocCk7XG4gICAgX2NyZWF0ZVhCdG4oZGl2KTtcbiAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsICgpID0+IHtcbiAgICAgIC8vZGVsZXRlcyBhbGVydC1kaXYgaWYgeW91IGNsaWNrIG91dHNpZGUgb2YgaXRcbiAgICAgIGNvbnN0IGlzT3V0c2lkZSA9XG4gICAgICAgICFldmVudC50YXJnZXQuY2xvc2VzdChcIi5hbGVydC1kaXZcIikgJiYgIWV2ZW50LnRhcmdldC5jbG9zZXN0KFwiYnV0dG9uXCIpO1xuICAgICAgaWYgKGlzT3V0c2lkZSkge1xuICAgICAgICBkaXYucmVtb3ZlKCk7XG4gICAgICB9XG4gICAgfSk7XG4gICAgbWFpbi5hcHBlbmRDaGlsZChkaXYpO1xuICB9XG5cbiAgLy8gdGFrZXMgaW5mbyBmcm9tIHRoZSBmb3JtIGlucHV0cyBhbmQgYWRkcyBpdCBhcyBhbiBvYmogdG8gdGhlIGlucXVpcmllcyBhcnJcbiAgZnVuY3Rpb24gX0lucXVpcnlGcm9tRm9ybShmb3JtLCBjbGFzc1RleHQpIHtcbiAgICBsZXQgaW5wdXRzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChgLiR7Y2xhc3NUZXh0fSBpbnB1dGApLFxuICAgICAgbmFtZSxcbiAgICAgIGVtYWlsLFxuICAgICAgaW5xdWlyeTtcblxuICAgIGlucHV0cy5mb3JFYWNoKChpbnB1dCkgPT4ge1xuICAgICAgc3dpdGNoIChpbnB1dC5nZXRBdHRyaWJ1dGUoXCJuYW1lXCIpKSB7XG4gICAgICAgIGNhc2UgXCJuYW1lXCI6XG4gICAgICAgICAgbmFtZSA9IGlucHV0LnZhbHVlO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlIFwiZW1haWxcIjpcbiAgICAgICAgICBpbnB1dC5jaGVja1ZhbGlkaXR5KCkgPyAoZW1haWwgPSBpbnB1dC52YWx1ZSkgOiBmYWxzZTtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSBcImlucXVpcnlcIjpcbiAgICAgICAgICBpbnF1aXJ5ID0gaW5wdXQudmFsdWU7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICB9XG4gICAgfSk7XG4gICAgaWYgKGVtYWlsKSB7XG4gICAgICAvL2NoZWNrIHRvIHNlZSBpZiB0aGUgZW1haWwgaW5wdXQgd2FzIHByb3Blcmx5IGZpbGxlZCBvdXQuXG4gICAgICBpbnF1aXJpZXMucHVzaChuZXcgSW5xdWlyeShuYW1lLCBlbWFpbCwgaW5xdWlyeSkpO1xuICAgICAgZm9ybS5yZW1vdmUoKTtcbiAgICB9IGVsc2Uge1xuICAgICAgaWYgKCFkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmFsZXJ0LWRpdlwiKSlcbiAgICAgICAgX2NyZWF0ZUFsZXJ0KFwiUGxlYXNlIHByb3ZpZGUgYSB2YWxpZCBlbWFpbFwiKTtcbiAgICB9XG4gIH1cblxuICAvL3N1Ym1pdCBidG5cbiAgZnVuY3Rpb24gX2NyZWF0ZUJ0bihmb3JtLCBjbGFzc1RleHQpIHtcbiAgICBsZXQgYnRuID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImJ1dHRvblwiKTtcbiAgICBidG4udGV4dENvbnRlbnQgPSBcIlN1Ym1pdFwiO1xuICAgIGJ0bi5zZXRBdHRyaWJ1dGUoXCJ0eXBlXCIsIFwiYnV0dG9uXCIpO1xuICAgIGJ0bi5jbGFzc0xpc3QuYWRkKFwiZm9ybV9fYnRuLS1zdWJtaXRcIiwgXCJibG9ja19fYnRuXCIpO1xuICAgIGJ0bi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKCkgPT4ge1xuICAgICAgX0lucXVpcnlGcm9tRm9ybShmb3JtLCBjbGFzc1RleHQpO1xuICAgIH0pO1xuICAgIGZvcm0uYXBwZW5kQ2hpbGQoYnRuKTtcbiAgfVxuXG4gIC8vY2xvc2UgYnRuXG4gIGZ1bmN0aW9uIF9jcmVhdGVYQnRuKGZvcm0pIHtcbiAgICBsZXQgYnRuID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImJ1dHRvblwiKTtcbiAgICBidG4udGV4dENvbnRlbnQgPSBcIkNsb3NlXCI7XG4gICAgYnRuLmNsYXNzTGlzdC5hZGQoXCJmb3JtX19idG4tLWNsb3NlXCIsIFwicC1mb3JtX19idG4tLWNsb3NlXCIpO1xuICAgIGJ0bi5zZXRBdHRyaWJ1dGUoXCJ0eXBlXCIsIFwiYnV0dG9uXCIpO1xuICAgIGJ0bi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKCkgPT4ge1xuICAgICAgZm9ybS5yZW1vdmUoKTtcbiAgICB9KTtcbiAgICBmb3JtLmFwcGVuZENoaWxkKGJ0bik7XG4gIH1cbiAgLy9jcmVhdGVzIHRoZSBmb3JtIGFuZCBzdWJtaXQgYW5kIGNsb3NlIGJ0bnNcbiAgZnVuY3Rpb24gX2NyZWF0ZUZvcm0oY2xhc3NUZXh0KSB7XG4gICAgbGV0IGZvcm0gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZm9ybVwiKTtcbiAgICBpZiAoQXJyYXkuaXNBcnJheShjbGFzc1RleHQpKSB7XG4gICAgICBjbGFzc1RleHQuZm9yRWFjaCgoZWxlbWVudCkgPT4ge1xuICAgICAgICBmb3JtLmNsYXNzTGlzdC5hZGQoZWxlbWVudCk7XG4gICAgICB9KTtcbiAgICB9IGVsc2Uge1xuICAgICAgZm9ybS5jbGFzc0xpc3QuYWRkKGNsYXNzVGV4dCk7XG4gICAgfVxuXG4gICAgX2NyZWF0ZVhCdG4oZm9ybSk7XG4gICAgX2NyZWF0ZUJ0bihmb3JtLCBjbGFzc1RleHQpO1xuICAgIHJldHVybiBmb3JtO1xuICB9XG4gIC8vY3JlYXRlcyBhbiBpbnB1dCBmcm9tIGFuIG9ialxuICBmdW5jdGlvbiBfY3JlYXRlSW5wdXQob2JqKSB7XG4gICAgbGV0IGlucHV0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImlucHV0XCIpO1xuICAgIGlucHV0LnNldEF0dHJpYnV0ZShcInR5cGVcIiwgb2JqLnR5cGUpO1xuICAgIGlucHV0LnNldEF0dHJpYnV0ZShcIm5hbWVcIiwgb2JqLm5hbWUpO1xuICAgIGlucHV0LnNldEF0dHJpYnV0ZShcImlkXCIsIG9iai5pZCk7XG4gICAgcmV0dXJuIGlucHV0O1xuICB9XG4gIC8vY3JlYXRlcyBsYWJlbCBmcm9tIGFuIG9ialxuICBmdW5jdGlvbiBfY3JlYXRlTGFiZWwob2JqKSB7XG4gICAgbGV0IGxhYmVsID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImxhYmVsXCIpO1xuICAgIGxhYmVsLnNldEF0dHJpYnV0ZShcImZvclwiLCBvYmouaWQpO1xuICAgIGxhYmVsLnRleHRDb250ZW50ID0gb2JqLnRleHQ7XG4gICAgcmV0dXJuIGxhYmVsO1xuICB9XG4gIC8vY3JlYXRlcyBhbmQgYXBwZW5kcyBpbnB1dCBhbmQgbGFiZWwgdG8gZm9ybVxuICBmdW5jdGlvbiBfYXBwZW5kSW5wdXRMYWJlbChmb3JtLCBvYmopIHtcbiAgICBsZXQgbGFiZWwgPSBfY3JlYXRlTGFiZWwob2JqKTtcbiAgICBsZXQgaW5wdXQgPSBfY3JlYXRlSW5wdXQob2JqKTtcbiAgICBmb3JtLmFwcGVuZENoaWxkKGxhYmVsKTtcbiAgICBmb3JtLmFwcGVuZENoaWxkKGlucHV0KTtcbiAgfVxuICAvL2NyZWF0ZXMgYW5kIGFwcGVuZHMgYWxsIGlucHV0IGFuZCBsYWJlbFxuICBmdW5jdGlvbiBhcHBlbmRJbnB1dHNMYWJlbHMob2JqKSB7XG4gICAgbGV0IGZvcm0gPSBfY3JlYXRlRm9ybShvYmouZm9ybSk7XG4gICAgb2JqLmlucHV0cy5mb3JFYWNoKChlbGVtZW50KSA9PiB7XG4gICAgICBfYXBwZW5kSW5wdXRMYWJlbChmb3JtLCBlbGVtZW50KTtcbiAgICB9KTtcbiAgICByZXR1cm4gZm9ybTtcbiAgfVxuXG4gIHJldHVybiB7XG4gICAgYXBwZW5kSW5wdXRzTGFiZWxzLFxuICB9O1xufSkoKTtcblxuLy9DcmVhdGVzIGlucXVpcnkgb2JqZWN0cyBmcm9tIHRoZSBkYXRhIHRha2VuIGZyb20gdGhlIGZvcm0gaW5wdXRzXG5jbGFzcyBJbnF1aXJ5IHtcbiAgY29uc3RydWN0b3IobmFtZSwgZW1haWwsIHRleHQpIHtcbiAgICB0aGlzLm5hbWUgPSBuYW1lO1xuICAgIHRoaXMuZW1haWwgPSBlbWFpbDtcbiAgICB0aGlzLnRleHQgPSB0ZXh0O1xuICB9XG59XG5cbmxldCBpbnF1aXJpZXMgPSBbXTtcblxuLy9DcmVhdGVzIGlucHV0IGluZm9ybWF0aW9uIG9iamVjdHMgZm9yIHRoZSBmb3JtXG5jbGFzcyBJbnB1dCB7XG4gIGNvbnN0cnVjdG9yKHR5cGUsIG5hbWUsIGlkLCB0ZXh0KSB7XG4gICAgdGhpcy50eXBlID0gdHlwZTtcbiAgICB0aGlzLm5hbWUgPSBuYW1lO1xuICAgIHRoaXMuaWQgPSBpZDtcbiAgICB0aGlzLnRleHQgPSB0ZXh0O1xuICB9XG59XG4vL09iaiB0aGF0IGhvbGRzIGFsbCB0aGUgaW5wdXQgaW5mb3JtYXRpb24gb2JqcywgYW5kIHRoZSBmb3JtJ3MgY2xhc3MgbmFtZVxubGV0IHN0YXJ0UHJvamVjdEZvcm0gPSB7XG4gIGlucHV0czogW1xuICAgIG5ldyBJbnB1dChcInRleHRcIiwgXCJuYW1lXCIsIFwibmFtZVwiLCBcIk5hbWU6XCIpLFxuICAgIG5ldyBJbnB1dChcImVtYWlsXCIsIFwiZW1haWxcIiwgXCJlbWFpbFwiLCBcIkVtYWlsIEFkZHJlc3M6XCIpLFxuICAgIG5ldyBJbnB1dChcInRleHRcIiwgXCJpbnF1aXJ5XCIsIFwiaW5xdWlyeVwiLCBcIklucXVpcnk6XCIpLFxuICBdLFxuICBmb3JtOiBbXCJzdGFydC1wcm9qZWN0LWRpdl9fZm9ybVwiLCBcInAtc3RhcnQtcHJvamVjdC1kaXZfX2Zvcm1cIl0sXG59O1xuXG4vL3N0YXJ0IHByb2plY3QgYnRuLS1mb3JtXG5sZXQgZm9ybUJ0biA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuYnRuLS1mb3JtXCIpO1xuXG4vL2NoZWNrIGlmIGZvcm0gYWxyZWFkeSBleGlzdHMsIGlmIG5vdCBjcmVhdGUgdGhlIGZvcm1cbmZvcm1CdG4uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsICgpID0+IHtcbiAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5zdGFydC1wcm9qZWN0LWRpdl9fZm9ybVwiKVxuICAgID8gdHJ1ZVxuICAgIDogbWFpbi5hcHBlbmRDaGlsZChmb3JtRGlzcGxheS5hcHBlbmRJbnB1dHNMYWJlbHMoc3RhcnRQcm9qZWN0Rm9ybSkpO1xufSk7XG4iLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiLy8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbl9fd2VicGFja19yZXF1aXJlX18ubiA9IChtb2R1bGUpID0+IHtcblx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG5cdFx0KCkgPT4gKG1vZHVsZVsnZGVmYXVsdCddKSA6XG5cdFx0KCkgPT4gKG1vZHVsZSk7XG5cdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsIHsgYTogZ2V0dGVyIH0pO1xuXHRyZXR1cm4gZ2V0dGVyO1xufTsiLCIvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9ucyBmb3IgaGFybW9ueSBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSAoZXhwb3J0cywgZGVmaW5pdGlvbikgPT4ge1xuXHRmb3IodmFyIGtleSBpbiBkZWZpbml0aW9uKSB7XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGRlZmluaXRpb24sIGtleSkgJiYgIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBrZXkpKSB7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZGVmaW5pdGlvbltrZXldIH0pO1xuXHRcdH1cblx0fVxufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSAob2JqLCBwcm9wKSA9PiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCkpIiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gKGV4cG9ydHMpID0+IHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwiaW1wb3J0IFwiLi9oZWFkZXIvaGVhZGVyXCJcbmltcG9ydCBcIi4vbWFpbi9tYWluXCIiXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=