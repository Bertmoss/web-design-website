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



//latest-div btn

let latestBtn = document.querySelector(".latest-div__btn-more");
let blocksMinimize = document.querySelectorAll(".latest-div__block--minimize")

latestBtn.addEventListener("click", () => {
  blocksMinimize.forEach(block => {
    block.setAttribute("style", "display: block");
  })
  latestBtn.setAttribute("style", "display: none");
})

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFBQTtBQUNBO0FBQ0E7QUFDQTs7OztBQUlBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQzs7Ozs7Ozs7Ozs7Ozs7QUNYRDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsTUFBTTtBQUNOO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE1BQU07QUFDTjtBQUNBO0FBQ0E7QUFDQTs7QUFFQSxXQUFXO0FBQ1gsQ0FBQzs7QUFFRDs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0gsQ0FBQzs7QUFFRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7QUFHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLCtDQUErQyxXQUFXO0FBQzFEO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQSxNQUFNO0FBQ047QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUCxNQUFNO0FBQ047QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLENBQUM7O0FBRUQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQzs7OztBQUlEOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0EsQ0FBQzs7Ozs7O1VDNVNEO1VBQ0E7O1VBRUE7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7O1VBRUE7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7Ozs7O1dDdEJBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQSxpQ0FBaUMsV0FBVztXQUM1QztXQUNBOzs7OztXQ1BBO1dBQ0E7V0FDQTtXQUNBO1dBQ0EseUNBQXlDLHdDQUF3QztXQUNqRjtXQUNBO1dBQ0E7Ozs7O1dDUEE7Ozs7O1dDQUE7V0FDQTtXQUNBO1dBQ0EsdURBQXVELGlCQUFpQjtXQUN4RTtXQUNBLGdEQUFnRCxhQUFhO1dBQzdEOzs7Ozs7Ozs7Ozs7Ozs7O0FDTndCIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vd2ViLWRlc2lnbi13ZWJzaXRlLy4vc3JjL2hlYWRlci9oZWFkZXIuanMiLCJ3ZWJwYWNrOi8vd2ViLWRlc2lnbi13ZWJzaXRlLy4vc3JjL21haW4vbWFpbi5qcyIsIndlYnBhY2s6Ly93ZWItZGVzaWduLXdlYnNpdGUvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vd2ViLWRlc2lnbi13ZWJzaXRlL3dlYnBhY2svcnVudGltZS9jb21wYXQgZ2V0IGRlZmF1bHQgZXhwb3J0Iiwid2VicGFjazovL3dlYi1kZXNpZ24td2Vic2l0ZS93ZWJwYWNrL3J1bnRpbWUvZGVmaW5lIHByb3BlcnR5IGdldHRlcnMiLCJ3ZWJwYWNrOi8vd2ViLWRlc2lnbi13ZWJzaXRlL3dlYnBhY2svcnVudGltZS9oYXNPd25Qcm9wZXJ0eSBzaG9ydGhhbmQiLCJ3ZWJwYWNrOi8vd2ViLWRlc2lnbi13ZWJzaXRlL3dlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8vd2ViLWRlc2lnbi13ZWJzaXRlLy4vc3JjL2luZGV4LmpzIl0sInNvdXJjZXNDb250ZW50IjpbIi8vSGFtYnVyZ2VyIE1lbnUgQnRuLyogXG5sZXQgYnRuID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5oZWFkZXItZGl2X19idG5cIik7XG5sZXQgbmF2ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5oZWFkZXJfX25hdlwiKTtcbmxldCByb290ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIjpyb290XCIpO1xuXG5cblxuYnRuLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoKSA9PiB7XG4gIGJ0bi5jbGFzc0xpc3QudG9nZ2xlKFwib3BlblwiKTtcbiAgbmF2LmNsYXNzTGlzdC50b2dnbGUoXCJoaWRkZW4tbmF2XCIpO1xuICByb290LmNsYXNzTGlzdC50b2dnbGUoXCJkYXJrXCIpO1xufSkgXG5cblxuXG4iLCJsZXQgbWFpbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCJtYWluXCIpO1xuXG5sZXQgc2hvd3JlZWxEaXNwbGF5ID0gKGZ1bmN0aW9uICgpIHtcbiAgZnVuY3Rpb24gX2NyZWF0ZURpdihjbGFzc05hbWUpIHtcbiAgICBsZXQgZGl2ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgICBkaXYuY2xhc3NMaXN0LmFkZChjbGFzc05hbWUpO1xuICAgIHJldHVybiBkaXY7XG4gIH1cblxuICBmdW5jdGlvbiBfdG9nSGlkZShlbGVtZW50KSB7XG4gICAgZWxlbWVudC5jbGFzc0xpc3QudG9nZ2xlKFwiaGlkZGVuXCIpO1xuICB9XG5cbiAgZnVuY3Rpb24gX291dGVySGlkZUNoZWNrKCkge1xuICAgIGRpdk91dGVyLmNsYXNzTGlzdC5jb250YWlucyhcImhpZGRlblwiKSA/IF90b2dIaWRlKGRpdk91dGVyKSA6IGZhbHNlO1xuICB9XG5cblxuICBmdW5jdGlvbiBfY3JlYXRlT3V0ZXJJbm5lckRpdihraW5kKSB7XG4gICAgbGV0IGRpdiA9IF9jcmVhdGVEaXYoXCJtYWluX19zaG93cmVlbC0tXCIgKyBraW5kKTtcbiAgICBpZiAoa2luZCA9PSBcIm91dGVyXCIpIHtcbiAgICAgIF90b2dIaWRlKGRpdik7XG4gICAgICBkaXYuY2xhc3NMaXN0LmFkZChcInAtbWFpbl9fc2hvd3JlZWwtLW91dGVyXCIpO1xuICAgICAgbWFpbi5hcHBlbmRDaGlsZChkaXYpO1xuICAgIH0gZWxzZSBpZiAoa2luZCA9PSBcImlubmVyXCIpIHtcbiAgICAgIGRpdk91dGVyLmFwcGVuZENoaWxkKGRpdik7XG4gICAgfVxuICAgIHJldHVybiBkaXY7XG4gIH1cblxuICBmdW5jdGlvbiBfY3JlYXRlSW1nKCkge1xuICAgIGxldCBpbWcgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiaW1nXCIpO1xuICAgIGltZy5jbGFzc0xpc3QuYWRkKFwicC1zaG93cmVlbF9faW1nXCIpO1xuICAgIGRpdklubmVyLmFwcGVuZENoaWxkKGltZyk7XG4gICAgcmV0dXJuIGltZztcbiAgfVxuXG4gIGZ1bmN0aW9uIF9jcmVhdGVUaXRsZSgpIHtcbiAgICBsZXQgdGl0bGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiaDJcIik7XG4gICAgdGl0bGUuY2xhc3NMaXN0LmFkZChcInNob3dyZWVsX190aXRsZVwiLCBcInAtc2hvd3JlZWxfX3RpdGxlXCIpO1xuICAgIGRpdklubmVyLmFwcGVuZENoaWxkKHRpdGxlKTtcbiAgICByZXR1cm4gdGl0bGU7XG4gIH1cblxuICBmdW5jdGlvbiBfcmVzZXREaXNwbGF5KGludGVydmFsKSB7XG4gICAgY2xlYXJJbnRlcnZhbChpbnRlcnZhbCk7XG4gICAgX3RvZ0hpZGUoZGl2T3V0ZXIpO1xuICAgIGNvdW50ID0gMDtcbiAgfVxuXG4gIGZ1bmN0aW9uIF9zZXRJbWFnZSgpIHtcbiAgICBpbWcuc2V0QXR0cmlidXRlKFwic3JjXCIsIHByb2plY3RzW2NvdW50XS5pbWFnZSk7XG4gICAgaW1nLnNldEF0dHJpYnV0ZShcImFsdFwiLCBwcm9qZWN0c1tjb3VudF0uYWx0KTtcbiAgfVxuXG4gIGZ1bmN0aW9uIF9pbmNyZW1lbnRDb3VudCgpIHtcbiAgICBjb3VudCsrO1xuICB9XG5cbiAgZnVuY3Rpb24gX3NldFRpdGxlKCkge1xuICAgIHRpdGxlLnRleHRDb250ZW50ID0gcHJvamVjdHNbY291bnRdLnRpdGxlO1xuICB9XG5cbiAgZnVuY3Rpb24gX3NldFNob3dyZWVsQmxvY2soKSB7XG4gICAgX3NldEltYWdlKCk7XG4gICAgX3NldFRpdGxlKCk7XG4gIH1cblxuICBsZXQgY291bnQgPSAwO1xuICBsZXQgZGl2T3V0ZXIgPSBfY3JlYXRlT3V0ZXJJbm5lckRpdihcIm91dGVyXCIpO1xuICBsZXQgZGl2SW5uZXIgPSBfY3JlYXRlT3V0ZXJJbm5lckRpdihcImlubmVyXCIpO1xuICBsZXQgaW1nID0gX2NyZWF0ZUltZygpO1xuICBsZXQgdGl0bGUgPSBfY3JlYXRlVGl0bGUoKTtcblxuICBcbiAgZnVuY3Rpb24gY2hlY2soaW50ZXJ2YWwpIHtcbiAgICBfb3V0ZXJIaWRlQ2hlY2soKTtcbiAgICBpZiAoY291bnQgPT09IHByb2plY3RzLmxlbmd0aCkge1xuICAgICAgX3Jlc2V0RGlzcGxheShpbnRlcnZhbCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIF9zZXRTaG93cmVlbEJsb2NrKCk7XG4gICAgICBfaW5jcmVtZW50Q291bnQoKTtcbiAgICB9XG4gIH1cblxuICByZXR1cm4geyBjaGVjayB9O1xufSkoKTtcblxubGV0IGJ0blNob3dyZWVsID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5idG4tLXNob3dyZWVsXCIpO1xuXG5idG5TaG93cmVlbC5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKCkgPT4ge1xuICBsZXQgaW50ZXJ2YWwgPSBzZXRJbnRlcnZhbChmdW5jdGlvbiAoKSB7XG4gICAgc2hvd3JlZWxEaXNwbGF5LmNoZWNrKGludGVydmFsKTtcbiAgfSwgMTAwMCk7XG59KTtcblxuY2xhc3MgUHJvamVjdCB7XG4gIGNvbnN0cnVjdG9yKHRpdGxlLCBpbWFnZSwgYWx0KSB7XG4gICAgdGhpcy50aXRsZSA9IHRpdGxlO1xuICAgIHRoaXMuaW1hZ2UgPSBpbWFnZTtcbiAgICB0aGlzLmFsdCA9IGFsdDtcbiAgfVxufVxuXG5sZXQgcHJvamVjdHMgPSBbXG4gIG5ldyBQcm9qZWN0KFxuICAgIFwiRmFzaGlvbiBNYWdhemluZVwiLFxuICAgIFwiL2ltYWdlcy9zdG9jay0xLS10YWxsLmpwZ1wiLFxuICAgIFwiUGVyc29uIHNpdHRpbmcgaW4gZmFzaGlvbmFibGUgY2xvdGhlc1wiXG4gICksXG4gIG5ldyBQcm9qZWN0KFxuICAgIFwiU3BvcnQgQnJhbmRcIixcbiAgICBcIi9pbWFnZXMvc3RvY2stMi0tdGFsbC5qcGdcIixcbiAgICBcIlBlcnNvbiBzaXR0aW5nIGluIGZhc2hpb25hYmxlIGNsb3RoZXNcIlxuICApLFxuICBuZXcgUHJvamVjdChcbiAgICBcIkZvb2QgUHJvZHVjdFwiLFxuICAgIFwiL2ltYWdlcy9zdG9jay0zLS10YWxsLmpwZ1wiLFxuICAgIFwiUGVyc29uIHNpdHRpbmcgaW4gZmFzaGlvbmFibGUgY2xvdGhlc1wiXG4gICksXG5dO1xuXG5cbi8vRk9STVxubGV0IGZvcm1EaXNwbGF5ID0gKGZ1bmN0aW9uICgpIHtcbiAgLy9jcmVhdGVzIGFsZXJ0IG1vZGFsXG4gIGZ1bmN0aW9uIF9jcmVhdGVBbGVydCh0ZXh0KSB7XG4gICAgbGV0IGRpdiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gICAgZGl2LmNsYXNzTGlzdC5hZGQoXCJhbGVydC1kaXZcIiwgXCJwLWFsZXJ0LWRpdlwiKTtcbiAgICBsZXQgcCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJwXCIpO1xuICAgIHAudGV4dENvbnRlbnQgPSB0ZXh0O1xuICAgIGRpdi5hcHBlbmRDaGlsZChwKTtcbiAgICBfY3JlYXRlWEJ0bihkaXYpO1xuICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKCkgPT4ge1xuICAgICAgLy9kZWxldGVzIGFsZXJ0LWRpdiBpZiB5b3UgY2xpY2sgb3V0c2lkZSBvZiBpdFxuICAgICAgY29uc3QgaXNPdXRzaWRlID1cbiAgICAgICAgIWV2ZW50LnRhcmdldC5jbG9zZXN0KFwiLmFsZXJ0LWRpdlwiKSAmJiAhZXZlbnQudGFyZ2V0LmNsb3Nlc3QoXCJidXR0b25cIik7XG4gICAgICBpZiAoaXNPdXRzaWRlKSB7XG4gICAgICAgIGRpdi5yZW1vdmUoKTtcbiAgICAgIH1cbiAgICB9KTtcbiAgICBtYWluLmFwcGVuZENoaWxkKGRpdik7XG4gIH1cblxuICAvLyB0YWtlcyBpbmZvIGZyb20gdGhlIGZvcm0gaW5wdXRzIGFuZCBhZGRzIGl0IGFzIGFuIG9iaiB0byB0aGUgaW5xdWlyaWVzIGFyclxuICBmdW5jdGlvbiBfSW5xdWlyeUZyb21Gb3JtKGZvcm0sIGNsYXNzVGV4dCkge1xuICAgIGxldCBpbnB1dHMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKGAuJHtjbGFzc1RleHR9IGlucHV0YCksXG4gICAgICBuYW1lLFxuICAgICAgZW1haWwsXG4gICAgICBpbnF1aXJ5O1xuXG4gICAgaW5wdXRzLmZvckVhY2goKGlucHV0KSA9PiB7XG4gICAgICBzd2l0Y2ggKGlucHV0LmdldEF0dHJpYnV0ZShcIm5hbWVcIikpIHtcbiAgICAgICAgY2FzZSBcIm5hbWVcIjpcbiAgICAgICAgICBuYW1lID0gaW5wdXQudmFsdWU7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgXCJlbWFpbFwiOlxuICAgICAgICAgIGlucHV0LmNoZWNrVmFsaWRpdHkoKSA/IChlbWFpbCA9IGlucHV0LnZhbHVlKSA6IGZhbHNlO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlIFwiaW5xdWlyeVwiOlxuICAgICAgICAgIGlucXVpcnkgPSBpbnB1dC52YWx1ZTtcbiAgICAgICAgICBicmVhaztcbiAgICAgIH1cbiAgICB9KTtcbiAgICBpZiAoZW1haWwpIHtcbiAgICAgIC8vY2hlY2sgdG8gc2VlIGlmIHRoZSBlbWFpbCBpbnB1dCB3YXMgcHJvcGVybHkgZmlsbGVkIG91dC5cbiAgICAgIGlucXVpcmllcy5wdXNoKG5ldyBJbnF1aXJ5KG5hbWUsIGVtYWlsLCBpbnF1aXJ5KSk7XG4gICAgICBmb3JtLnJlbW92ZSgpO1xuICAgIH0gZWxzZSB7XG4gICAgICBpZiAoIWRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuYWxlcnQtZGl2XCIpKVxuICAgICAgICBfY3JlYXRlQWxlcnQoXCJQbGVhc2UgcHJvdmlkZSBhIHZhbGlkIGVtYWlsXCIpO1xuICAgIH1cbiAgfVxuXG4gIC8vc3VibWl0IGJ0blxuICBmdW5jdGlvbiBfY3JlYXRlQnRuKGZvcm0sIGNsYXNzVGV4dCkge1xuICAgIGxldCBidG4gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiYnV0dG9uXCIpO1xuICAgIGJ0bi50ZXh0Q29udGVudCA9IFwiU3VibWl0XCI7XG4gICAgYnRuLnNldEF0dHJpYnV0ZShcInR5cGVcIiwgXCJidXR0b25cIik7XG4gICAgYnRuLmNsYXNzTGlzdC5hZGQoXCJmb3JtX19idG4tLXN1Ym1pdFwiLCBcImJsb2NrX19idG5cIik7XG4gICAgYnRuLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoKSA9PiB7XG4gICAgICBfSW5xdWlyeUZyb21Gb3JtKGZvcm0sIGNsYXNzVGV4dCk7XG4gICAgfSk7XG4gICAgZm9ybS5hcHBlbmRDaGlsZChidG4pO1xuICB9XG5cbiAgLy9jbG9zZSBidG5cbiAgZnVuY3Rpb24gX2NyZWF0ZVhCdG4oZm9ybSkge1xuICAgIGxldCBidG4gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiYnV0dG9uXCIpO1xuICAgIGJ0bi50ZXh0Q29udGVudCA9IFwiQ2xvc2VcIjtcbiAgICBidG4uY2xhc3NMaXN0LmFkZChcImZvcm1fX2J0bi0tY2xvc2VcIiwgXCJwLWZvcm1fX2J0bi0tY2xvc2VcIik7XG4gICAgYnRuLnNldEF0dHJpYnV0ZShcInR5cGVcIiwgXCJidXR0b25cIik7XG4gICAgYnRuLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoKSA9PiB7XG4gICAgICBmb3JtLnJlbW92ZSgpO1xuICAgIH0pO1xuICAgIGZvcm0uYXBwZW5kQ2hpbGQoYnRuKTtcbiAgfVxuICAvL2NyZWF0ZXMgdGhlIGZvcm0gYW5kIHN1Ym1pdCBhbmQgY2xvc2UgYnRuc1xuICBmdW5jdGlvbiBfY3JlYXRlRm9ybShjbGFzc1RleHQpIHtcbiAgICBsZXQgZm9ybSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJmb3JtXCIpO1xuICAgIGlmIChBcnJheS5pc0FycmF5KGNsYXNzVGV4dCkpIHtcbiAgICAgIGNsYXNzVGV4dC5mb3JFYWNoKChlbGVtZW50KSA9PiB7XG4gICAgICAgIGZvcm0uY2xhc3NMaXN0LmFkZChlbGVtZW50KTtcbiAgICAgIH0pO1xuICAgIH0gZWxzZSB7XG4gICAgICBmb3JtLmNsYXNzTGlzdC5hZGQoY2xhc3NUZXh0KTtcbiAgICB9XG5cbiAgICBfY3JlYXRlWEJ0bihmb3JtKTtcbiAgICBfY3JlYXRlQnRuKGZvcm0sIGNsYXNzVGV4dCk7XG4gICAgcmV0dXJuIGZvcm07XG4gIH1cbiAgLy9jcmVhdGVzIGFuIGlucHV0IGZyb20gYW4gb2JqXG4gIGZ1bmN0aW9uIF9jcmVhdGVJbnB1dChvYmopIHtcbiAgICBsZXQgaW5wdXQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiaW5wdXRcIik7XG4gICAgaW5wdXQuc2V0QXR0cmlidXRlKFwidHlwZVwiLCBvYmoudHlwZSk7XG4gICAgaW5wdXQuc2V0QXR0cmlidXRlKFwibmFtZVwiLCBvYmoubmFtZSk7XG4gICAgaW5wdXQuc2V0QXR0cmlidXRlKFwiaWRcIiwgb2JqLmlkKTtcbiAgICByZXR1cm4gaW5wdXQ7XG4gIH1cbiAgLy9jcmVhdGVzIGxhYmVsIGZyb20gYW4gb2JqXG4gIGZ1bmN0aW9uIF9jcmVhdGVMYWJlbChvYmopIHtcbiAgICBsZXQgbGFiZWwgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwibGFiZWxcIik7XG4gICAgbGFiZWwuc2V0QXR0cmlidXRlKFwiZm9yXCIsIG9iai5pZCk7XG4gICAgbGFiZWwudGV4dENvbnRlbnQgPSBvYmoudGV4dDtcbiAgICByZXR1cm4gbGFiZWw7XG4gIH1cbiAgLy9jcmVhdGVzIGFuZCBhcHBlbmRzIGlucHV0IGFuZCBsYWJlbCB0byBmb3JtXG4gIGZ1bmN0aW9uIF9hcHBlbmRJbnB1dExhYmVsKGZvcm0sIG9iaikge1xuICAgIGxldCBsYWJlbCA9IF9jcmVhdGVMYWJlbChvYmopO1xuICAgIGxldCBpbnB1dCA9IF9jcmVhdGVJbnB1dChvYmopO1xuICAgIGZvcm0uYXBwZW5kQ2hpbGQobGFiZWwpO1xuICAgIGZvcm0uYXBwZW5kQ2hpbGQoaW5wdXQpO1xuICB9XG4gIC8vY3JlYXRlcyBhbmQgYXBwZW5kcyBhbGwgaW5wdXQgYW5kIGxhYmVsXG4gIGZ1bmN0aW9uIGFwcGVuZElucHV0c0xhYmVscyhvYmopIHtcbiAgICBsZXQgZm9ybSA9IF9jcmVhdGVGb3JtKG9iai5mb3JtKTtcbiAgICBvYmouaW5wdXRzLmZvckVhY2goKGVsZW1lbnQpID0+IHtcbiAgICAgIF9hcHBlbmRJbnB1dExhYmVsKGZvcm0sIGVsZW1lbnQpO1xuICAgIH0pO1xuICAgIHJldHVybiBmb3JtO1xuICB9XG5cbiAgcmV0dXJuIHtcbiAgICBhcHBlbmRJbnB1dHNMYWJlbHMsXG4gIH07XG59KSgpO1xuXG4vL0NyZWF0ZXMgaW5xdWlyeSBvYmplY3RzIGZyb20gdGhlIGRhdGEgdGFrZW4gZnJvbSB0aGUgZm9ybSBpbnB1dHNcbmNsYXNzIElucXVpcnkge1xuICBjb25zdHJ1Y3RvcihuYW1lLCBlbWFpbCwgdGV4dCkge1xuICAgIHRoaXMubmFtZSA9IG5hbWU7XG4gICAgdGhpcy5lbWFpbCA9IGVtYWlsO1xuICAgIHRoaXMudGV4dCA9IHRleHQ7XG4gIH1cbn1cblxubGV0IGlucXVpcmllcyA9IFtdO1xuXG4vL0NyZWF0ZXMgaW5wdXQgaW5mb3JtYXRpb24gb2JqZWN0cyBmb3IgdGhlIGZvcm1cbmNsYXNzIElucHV0IHtcbiAgY29uc3RydWN0b3IodHlwZSwgbmFtZSwgaWQsIHRleHQpIHtcbiAgICB0aGlzLnR5cGUgPSB0eXBlO1xuICAgIHRoaXMubmFtZSA9IG5hbWU7XG4gICAgdGhpcy5pZCA9IGlkO1xuICAgIHRoaXMudGV4dCA9IHRleHQ7XG4gIH1cbn1cbi8vT2JqIHRoYXQgaG9sZHMgYWxsIHRoZSBpbnB1dCBpbmZvcm1hdGlvbiBvYmpzLCBhbmQgdGhlIGZvcm0ncyBjbGFzcyBuYW1lXG5sZXQgc3RhcnRQcm9qZWN0Rm9ybSA9IHtcbiAgaW5wdXRzOiBbXG4gICAgbmV3IElucHV0KFwidGV4dFwiLCBcIm5hbWVcIiwgXCJuYW1lXCIsIFwiTmFtZTpcIiksXG4gICAgbmV3IElucHV0KFwiZW1haWxcIiwgXCJlbWFpbFwiLCBcImVtYWlsXCIsIFwiRW1haWwgQWRkcmVzczpcIiksXG4gICAgbmV3IElucHV0KFwidGV4dFwiLCBcImlucXVpcnlcIiwgXCJpbnF1aXJ5XCIsIFwiSW5xdWlyeTpcIiksXG4gIF0sXG4gIGZvcm06IFtcInN0YXJ0LXByb2plY3QtZGl2X19mb3JtXCIsIFwicC1zdGFydC1wcm9qZWN0LWRpdl9fZm9ybVwiXSxcbn07XG5cbi8vc3RhcnQgcHJvamVjdCBidG4tLWZvcm1cbmxldCBmb3JtQnRuID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5idG4tLWZvcm1cIik7XG5cbi8vY2hlY2sgaWYgZm9ybSBhbHJlYWR5IGV4aXN0cywgaWYgbm90IGNyZWF0ZSB0aGUgZm9ybVxuZm9ybUJ0bi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKCkgPT4ge1xuICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLnN0YXJ0LXByb2plY3QtZGl2X19mb3JtXCIpXG4gICAgPyB0cnVlXG4gICAgOiBtYWluLmFwcGVuZENoaWxkKGZvcm1EaXNwbGF5LmFwcGVuZElucHV0c0xhYmVscyhzdGFydFByb2plY3RGb3JtKSk7XG59KTtcblxuXG5cbi8vbGF0ZXN0LWRpdiBidG5cblxubGV0IGxhdGVzdEJ0biA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIubGF0ZXN0LWRpdl9fYnRuLW1vcmVcIik7XG5sZXQgYmxvY2tzTWluaW1pemUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKFwiLmxhdGVzdC1kaXZfX2Jsb2NrLS1taW5pbWl6ZVwiKVxuXG5sYXRlc3RCdG4uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsICgpID0+IHtcbiAgYmxvY2tzTWluaW1pemUuZm9yRWFjaChibG9jayA9PiB7XG4gICAgYmxvY2suc2V0QXR0cmlidXRlKFwic3R5bGVcIiwgXCJkaXNwbGF5OiBibG9ja1wiKTtcbiAgfSlcbiAgbGF0ZXN0QnRuLnNldEF0dHJpYnV0ZShcInN0eWxlXCIsIFwiZGlzcGxheTogbm9uZVwiKTtcbn0pIiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXShtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsIi8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSAobW9kdWxlKSA9PiB7XG5cdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuXHRcdCgpID0+IChtb2R1bGVbJ2RlZmF1bHQnXSkgOlxuXHRcdCgpID0+IChtb2R1bGUpO1xuXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCB7IGE6IGdldHRlciB9KTtcblx0cmV0dXJuIGdldHRlcjtcbn07IiwiLy8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gKGV4cG9ydHMsIGRlZmluaXRpb24pID0+IHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5vID0gKG9iaiwgcHJvcCkgPT4gKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApKSIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IChleHBvcnRzKSA9PiB7XG5cdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsImltcG9ydCBcIi4vaGVhZGVyL2hlYWRlclwiXG5pbXBvcnQgXCIuL21haW4vbWFpblwiIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9