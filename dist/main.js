/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./src/header/header.js":
/*!******************************!*\
  !*** ./src/header/header.js ***!
  \******************************/
/***/ (() => {

// Hamburger Menu Btn

const btn = document.querySelector(".header-div__btn");
const nav = document.querySelector(".header__nav");
const root = document.querySelector(":root");

btn.addEventListener("click", () => {
  btn.classList.toggle("open");
  nav.classList.toggle("hidden-nav");
  root.classList.toggle('dark');
});


/***/ }),

/***/ "./src/main/main.js":
/*!**************************!*\
  !*** ./src/main/main.js ***!
  \**************************/
/***/ (() => {

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


/***/ }),

/***/ "./src/main/project-showreel.js":
/*!**************************************!*\
  !*** ./src/main/project-showreel.js ***!
  \**************************************/
/***/ (() => {

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
/* harmony import */ var _main_project_showreel__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./main/project-showreel */ "./src/main/project-showreel.js");
/* harmony import */ var _main_project_showreel__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_main_project_showreel__WEBPACK_IMPORTED_MODULE_2__);



})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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NUM7V0FDQTs7Ozs7V0NQQTtXQUNBO1dBQ0E7V0FDQTtXQUNBLHlDQUF5Qyx3Q0FBd0M7V0FDakY7V0FDQTtXQUNBOzs7OztXQ1BBOzs7OztXQ0FBO1dBQ0E7V0FDQTtXQUNBLHVEQUF1RCxpQkFBaUI7V0FDeEU7V0FDQSxnREFBZ0QsYUFBYTtXQUM3RDs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDTndCO0FBQ0oiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly93ZWItZGVzaWduLXdlYnNpdGUvLi9zcmMvaGVhZGVyL2hlYWRlci5qcyIsIndlYnBhY2s6Ly93ZWItZGVzaWduLXdlYnNpdGUvLi9zcmMvbWFpbi9tYWluLmpzIiwid2VicGFjazovL3dlYi1kZXNpZ24td2Vic2l0ZS8uL3NyYy9tYWluL3Byb2plY3Qtc2hvd3JlZWwuanMiLCJ3ZWJwYWNrOi8vd2ViLWRlc2lnbi13ZWJzaXRlL3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL3dlYi1kZXNpZ24td2Vic2l0ZS93ZWJwYWNrL3J1bnRpbWUvY29tcGF0IGdldCBkZWZhdWx0IGV4cG9ydCIsIndlYnBhY2s6Ly93ZWItZGVzaWduLXdlYnNpdGUvd2VicGFjay9ydW50aW1lL2RlZmluZSBwcm9wZXJ0eSBnZXR0ZXJzIiwid2VicGFjazovL3dlYi1kZXNpZ24td2Vic2l0ZS93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovL3dlYi1kZXNpZ24td2Vic2l0ZS93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovL3dlYi1kZXNpZ24td2Vic2l0ZS8uL3NyYy9pbmRleC5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyIvLyBIYW1idXJnZXIgTWVudSBCdG5cblxuY29uc3QgYnRuID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5oZWFkZXItZGl2X19idG5cIik7XG5jb25zdCBuYXYgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmhlYWRlcl9fbmF2XCIpO1xuY29uc3Qgcm9vdCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCI6cm9vdFwiKTtcblxuYnRuLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoKSA9PiB7XG4gIGJ0bi5jbGFzc0xpc3QudG9nZ2xlKFwib3BlblwiKTtcbiAgbmF2LmNsYXNzTGlzdC50b2dnbGUoXCJoaWRkZW4tbmF2XCIpO1xuICByb290LmNsYXNzTGlzdC50b2dnbGUoJ2RhcmsnKTtcbn0pO1xuIiwiY29uc3QgbWFpbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCJtYWluXCIpO1xuXG5jb25zdCBpbnF1aXJpZXMgPSBbXTtcblxuLy8gRk9STVxuY29uc3QgZm9ybURpc3BsYXkgPSAoKCkgPT4ge1xuXG4gICAgLy8gY2xvc2UgYnRuXG4gICAgZnVuY3Rpb24gX2NyZWF0ZVhCdG4oZm9ybSkge1xuICAgICAgY29uc3QgYnRuID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImJ1dHRvblwiKTtcbiAgICAgIGJ0bi50ZXh0Q29udGVudCA9IFwiQ2xvc2VcIjtcbiAgICAgIGJ0bi5jbGFzc0xpc3QuYWRkKFwiZm9ybV9fYnRuLS1jbG9zZVwiLCBcInAtZm9ybV9fYnRuLS1jbG9zZVwiKTtcbiAgICAgIGJ0bi5zZXRBdHRyaWJ1dGUoXCJ0eXBlXCIsIFwiYnV0dG9uXCIpO1xuICAgICAgYnRuLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoKSA9PiB7XG4gICAgICAgIGZvcm0ucmVtb3ZlKCk7XG4gICAgICB9KTtcbiAgICAgIGZvcm0uYXBwZW5kQ2hpbGQoYnRuKTtcbiAgICB9XG5cblxuICAgLy8gY3JlYXRlcyBhbGVydCBtb2RhbFxuICAgZnVuY3Rpb24gX2NyZWF0ZUFsZXJ0KHRleHQpIHtcbiAgICBjb25zdCBkaXYgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICAgIGRpdi5jbGFzc0xpc3QuYWRkKFwiYWxlcnQtZGl2XCIsIFwicC1hbGVydC1kaXZcIik7XG4gICAgY29uc3QgcCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJwXCIpO1xuICAgIHAudGV4dENvbnRlbnQgPSB0ZXh0O1xuICAgIGRpdi5hcHBlbmRDaGlsZChwKTtcbiAgICBfY3JlYXRlWEJ0bihkaXYpO1xuICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKGV2ZW50KSA9PiB7XG4gICAgICAvLyBkZWxldGVzIGFsZXJ0LWRpdiBpZiB5b3UgY2xpY2sgb3V0c2lkZSBvZiBpdFxuICAgICAgY29uc3QgaXNPdXRzaWRlID1cbiAgICAgICAgIWV2ZW50LnRhcmdldC5jbG9zZXN0KFwiLmFsZXJ0LWRpdlwiKSAmJiAhZXZlbnQudGFyZ2V0LmNsb3Nlc3QoXCJidXR0b25cIik7XG4gICAgICBpZiAoaXNPdXRzaWRlKSB7XG4gICAgICAgIGRpdi5yZW1vdmUoKTtcbiAgICAgIH1cbiAgICB9KTtcbiAgICBtYWluLmFwcGVuZENoaWxkKGRpdik7XG4gIH1cblxuXG5cbiAgICAgLy8gdGFrZXMgaW5mbyBmcm9tIHRoZSBmb3JtIGlucHV0cyBhbmQgYWRkcyBpdCBhcyBhbiBvYmogdG8gdGhlIGlucXVpcmllcyBhcnJcbiAgICAgZnVuY3Rpb24gX0lucXVpcnlGcm9tRm9ybShmb3JtLCBjbGFzc1RleHQpIHtcbiAgICAgIGNvbnN0IGlucHV0cyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoYC4ke2NsYXNzVGV4dH0gaW5wdXRgKTtcbiAgICAgIGxldCBuYW1lO1xuICAgICAgbGV0IGVtYWlsO1xuICAgICAgbGV0IGlucXVpcnk7XG4gIFxuICAgICAgaW5wdXRzLmZvckVhY2goKGlucHV0KSA9PiB7XG4gICAgICAgIHN3aXRjaCAoaW5wdXQuZ2V0QXR0cmlidXRlKFwibmFtZVwiKSkge1xuICAgICAgICAgIGNhc2UgXCJuYW1lXCI6XG4gICAgICAgICAgICBuYW1lID0gaW5wdXQudmFsdWU7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgICBjYXNlIFwiZW1haWxcIjpcbiAgICAgICAgICAgIGlmIChpbnB1dC5jaGVja1ZhbGlkaXR5KCkpIHtcbiAgICAgICAgICAgICAgZW1haWwgPSBpbnB1dC52YWx1ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgIGNhc2UgXCJpbnF1aXJ5XCI6XG4gICAgICAgICAgICBpbnF1aXJ5ID0gaW5wdXQudmFsdWU7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICB9XG4gICAgICB9KTtcbiAgICAgIGlmIChlbWFpbCkge1xuICAgICAgICBjb25zdCBvYmogPSB7XCJuYW1lXCI6IG5hbWUsIFwiZW1haWxcIjogZW1haWwsIFwiaW5xdWlyeVwiOiBpbnF1aXJ5fVxuICAgICAgICAvLyBjaGVjayB0byBzZWUgaWYgdGhlIGVtYWlsIGlucHV0IHdhcyBwcm9wZXJseSBmaWxsZWQgb3V0LlxuICAgICAgICBpbnF1aXJpZXMucHVzaChvYmopO1xuICAgICAgICBmb3JtLnJlbW92ZSgpO1xuICAgICAgfSBlbHNlIGlmICghZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5hbGVydC1kaXZcIikpXG4gICAgICAgIF9jcmVhdGVBbGVydChcIlBsZWFzZSBwcm92aWRlIGEgdmFsaWQgZW1haWxcIik7XG4gICAgfVxuICBcblxuICAgIC8vIHN1Ym1pdCBidG5cbiAgICBmdW5jdGlvbiBfY3JlYXRlQnRuKGZvcm0sIGNsYXNzVGV4dCkge1xuICAgICAgY29uc3QgYnRuID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImJ1dHRvblwiKTtcbiAgICAgIGJ0bi50ZXh0Q29udGVudCA9IFwiU3VibWl0XCI7XG4gICAgICBidG4uc2V0QXR0cmlidXRlKFwidHlwZVwiLCBcImJ1dHRvblwiKTtcbiAgICAgIGJ0bi5jbGFzc0xpc3QuYWRkKFwiZm9ybV9fYnRuLS1zdWJtaXRcIiwgXCJibG9ja19fYnRuXCIpO1xuICAgICAgYnRuLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoKSA9PiB7XG4gICAgICAgIF9JbnF1aXJ5RnJvbUZvcm0oZm9ybSwgY2xhc3NUZXh0KTtcbiAgICAgIH0pO1xuICAgICAgZm9ybS5hcHBlbmRDaGlsZChidG4pO1xuICAgIH1cbiAgXG5cblxuXG4gXG5cbiBcblxuICAvLyBjcmVhdGVzIHRoZSBmb3JtIGFuZCBzdWJtaXQgYW5kIGNsb3NlIGJ0bnNcbiAgZnVuY3Rpb24gX2NyZWF0ZUZvcm0oY2xhc3NUZXh0KSB7XG4gICAgY29uc3QgZm9ybSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJmb3JtXCIpO1xuICAgIGlmIChBcnJheS5pc0FycmF5KGNsYXNzVGV4dCkpIHtcbiAgICAgIGNsYXNzVGV4dC5mb3JFYWNoKChlbGVtZW50KSA9PiB7XG4gICAgICAgIGZvcm0uY2xhc3NMaXN0LmFkZChlbGVtZW50KTtcbiAgICAgIH0pO1xuICAgIH0gZWxzZSB7XG4gICAgICBmb3JtLmNsYXNzTGlzdC5hZGQoY2xhc3NUZXh0KTtcbiAgICB9XG5cbiAgICBfY3JlYXRlWEJ0bihmb3JtKTtcbiAgICBfY3JlYXRlQnRuKGZvcm0sIGNsYXNzVGV4dCk7XG4gICAgcmV0dXJuIGZvcm07XG4gIH1cbiAgLy8gY3JlYXRlcyBhbiBpbnB1dCBmcm9tIGFuIG9ialxuICBmdW5jdGlvbiBfY3JlYXRlSW5wdXQob2JqKSB7XG4gICAgY29uc3QgaW5wdXQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiaW5wdXRcIik7XG4gICAgaW5wdXQuc2V0QXR0cmlidXRlKFwidHlwZVwiLCBvYmoudHlwZSk7XG4gICAgaW5wdXQuc2V0QXR0cmlidXRlKFwibmFtZVwiLCBvYmoubmFtZSk7XG4gICAgaW5wdXQuc2V0QXR0cmlidXRlKFwiaWRcIiwgb2JqLmlkKTtcbiAgICByZXR1cm4gaW5wdXQ7XG4gIH1cbiAgLy8gY3JlYXRlcyBsYWJlbCBmcm9tIGFuIG9ialxuICBmdW5jdGlvbiBfY3JlYXRlTGFiZWwob2JqKSB7XG4gICAgY29uc3QgbGFiZWwgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwibGFiZWxcIik7XG4gICAgbGFiZWwuc2V0QXR0cmlidXRlKFwiZm9yXCIsIG9iai5pZCk7XG4gICAgbGFiZWwudGV4dENvbnRlbnQgPSBvYmoudGV4dDtcbiAgICByZXR1cm4gbGFiZWw7XG4gIH1cbiAgLy8gY3JlYXRlcyBhbmQgYXBwZW5kcyBpbnB1dCBhbmQgbGFiZWwgdG8gZm9ybVxuICBmdW5jdGlvbiBfYXBwZW5kSW5wdXRMYWJlbChmb3JtLCBvYmopIHtcbiAgICBjb25zdCBsYWJlbCA9IF9jcmVhdGVMYWJlbChvYmopO1xuICAgIGNvbnN0IGlucHV0ID0gX2NyZWF0ZUlucHV0KG9iaik7XG4gICAgZm9ybS5hcHBlbmRDaGlsZChsYWJlbCk7XG4gICAgZm9ybS5hcHBlbmRDaGlsZChpbnB1dCk7XG4gIH1cbiAgLy8gY3JlYXRlcyBhbmQgYXBwZW5kcyBhbGwgaW5wdXQgYW5kIGxhYmVsXG4gIGZ1bmN0aW9uIGFwcGVuZElucHV0c0xhYmVscyhvYmopIHtcbiAgICBjb25zdCBmb3JtID0gX2NyZWF0ZUZvcm0ob2JqLmZvcm0pO1xuICAgIG9iai5pbnB1dHMuZm9yRWFjaCgoZWxlbWVudCkgPT4ge1xuICAgICAgX2FwcGVuZElucHV0TGFiZWwoZm9ybSwgZWxlbWVudCk7XG4gICAgfSk7XG4gICAgcmV0dXJuIGZvcm07XG4gIH1cblxuICByZXR1cm4ge1xuICAgIGFwcGVuZElucHV0c0xhYmVscyxcbiAgfTtcbn0pKCk7XG5cblxuLy8gQ3JlYXRlcyBpbnB1dCBpbmZvcm1hdGlvbiBvYmplY3RzIGZvciB0aGUgZm9ybVxuY2xhc3MgSW5wdXQge1xuICBjb25zdHJ1Y3Rvcih0eXBlLCBuYW1lLCBpZCwgdGV4dCkge1xuICAgIHRoaXMudHlwZSA9IHR5cGU7XG4gICAgdGhpcy5uYW1lID0gbmFtZTtcbiAgICB0aGlzLmlkID0gaWQ7XG4gICAgdGhpcy50ZXh0ID0gdGV4dDtcbiAgfVxufVxuLy8gT2JqIHRoYXQgaG9sZHMgYWxsIHRoZSBpbnB1dCBpbmZvcm1hdGlvbiBvYmpzLCBhbmQgdGhlIGZvcm0ncyBjbGFzcyBuYW1lXG5jb25zdCBzdGFydFByb2plY3RGb3JtID0ge1xuICBpbnB1dHM6IFtcbiAgICBuZXcgSW5wdXQoXCJ0ZXh0XCIsIFwibmFtZVwiLCBcIm5hbWVcIiwgXCJOYW1lOlwiKSxcbiAgICBuZXcgSW5wdXQoXCJlbWFpbFwiLCBcImVtYWlsXCIsIFwiZW1haWxcIiwgXCJFbWFpbCBBZGRyZXNzOlwiKSxcbiAgICBuZXcgSW5wdXQoXCJ0ZXh0XCIsIFwiaW5xdWlyeVwiLCBcImlucXVpcnlcIiwgXCJJbnF1aXJ5OlwiKSxcbiAgXSxcbiAgZm9ybTogW1wic3RhcnQtcHJvamVjdC1kaXZfX2Zvcm1cIiwgXCJwLXN0YXJ0LXByb2plY3QtZGl2X19mb3JtXCJdLFxufTtcblxuLy8gc3RhcnQgcHJvamVjdCBidG4tLWZvcm1cbmNvbnN0IGZvcm1CdG4gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmJ0bi0tZm9ybVwiKTtcblxuLy8gY2hlY2sgaWYgZm9ybSBhbHJlYWR5IGV4aXN0cywgaWYgbm90IGNyZWF0ZSB0aGUgZm9ybVxuZm9ybUJ0bi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKCkgPT4ge1xuICBpZiAoIWRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuc3RhcnQtcHJvamVjdC1kaXZfX2Zvcm1cIikpIHtcbiAgICBtYWluLmFwcGVuZENoaWxkKGZvcm1EaXNwbGF5LmFwcGVuZElucHV0c0xhYmVscyhzdGFydFByb2plY3RGb3JtKSk7XG59fSk7XG5cbi8vIGxhdGVzdC1kaXYgYnRuXG5cbmNvbnN0IGxhdGVzdEJ0biA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIubGF0ZXN0LWRpdl9fYnRuLW1vcmVcIik7XG5jb25zdCBibG9ja3NNaW5pbWl6ZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoXG4gIFwiLmxhdGVzdC1kaXZfX2Jsb2NrLS1taW5pbWl6ZVwiXG4pO1xuXG5sYXRlc3RCdG4uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsICgpID0+IHtcbiAgYmxvY2tzTWluaW1pemUuZm9yRWFjaCgoYmxvY2spID0+IHtcbiAgICBibG9jay5zZXRBdHRyaWJ1dGUoXCJzdHlsZVwiLCBcImRpc3BsYXk6IGJsb2NrXCIpO1xuICB9KTtcbiAgbGF0ZXN0QnRuLnNldEF0dHJpYnV0ZShcInN0eWxlXCIsIFwiZGlzcGxheTogbm9uZVwiKTtcbn0pO1xuIiwiY29uc3QgbWFpbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCJtYWluXCIpO1xuXG5jbGFzcyBQcm9qZWN0IHtcbiAgY29uc3RydWN0b3IodGl0bGUsIGltYWdlLCBhbHQpIHtcbiAgICB0aGlzLnRpdGxlID0gdGl0bGU7XG4gICAgdGhpcy5pbWFnZSA9IGltYWdlO1xuICAgIHRoaXMuYWx0ID0gYWx0O1xuICB9XG59XG5cbmNvbnN0IHByb2plY3RzID0gW1xuICBuZXcgUHJvamVjdChcbiAgICBcIkZhc2hpb24gTWFnYXppbmVcIixcbiAgICBcIi9pbWFnZXMvc3RvY2stMS0tdGFsbC5qcGdcIixcbiAgICBcIlBlcnNvbiBzaXR0aW5nIGluIGZhc2hpb25hYmxlIGNsb3RoZXNcIlxuICApLFxuICBuZXcgUHJvamVjdChcbiAgICBcIlNwb3J0IEJyYW5kXCIsXG4gICAgXCIvaW1hZ2VzL3N0b2NrLTItLXRhbGwuanBnXCIsXG4gICAgXCJQZXJzb24gc2l0dGluZyBpbiBmYXNoaW9uYWJsZSBjbG90aGVzXCJcbiAgKSxcbiAgbmV3IFByb2plY3QoXG4gICAgXCJGb29kIFByb2R1Y3RcIixcbiAgICBcIi9pbWFnZXMvc3RvY2stMy0tdGFsbC5qcGdcIixcbiAgICBcIlBlcnNvbiBzaXR0aW5nIGluIGZhc2hpb25hYmxlIGNsb3RoZXNcIlxuICApLFxuXTtcblxuXG5jb25zdCBzaG93cmVlbERpc3BsYXkgPSAoKCkgPT4ge1xuXG5cbiAgbGV0IGNvdW50O1xuICBsZXQgZGl2T3V0ZXI7IFxuICBsZXQgZGl2SW5uZXI7XG4gIGxldCBpbWc7XG4gIGxldCB0aXRsZTtcblxuICBmdW5jdGlvbiBfY3JlYXRlRGl2KGNsYXNzTmFtZSkge1xuICAgIGNvbnN0IGRpdiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gICAgZGl2LmNsYXNzTGlzdC5hZGQoY2xhc3NOYW1lKTtcbiAgICByZXR1cm4gZGl2O1xuICB9XG5cbiAgZnVuY3Rpb24gX3RvZ0hpZGUoZWxlbWVudCkge1xuICAgIGVsZW1lbnQuY2xhc3NMaXN0LnRvZ2dsZShcImhpZGRlblwiKTtcbiAgfVxuXG4gIGZ1bmN0aW9uIF9vdXRlckhpZGVDaGVjaygpIHtcbiAgIHJldHVybiBkaXZPdXRlci5jbGFzc0xpc3QuY29udGFpbnMoXCJoaWRkZW5cIikgPyBfdG9nSGlkZShkaXZPdXRlcikgOiBmYWxzZTtcbiAgfVxuXG4gIGZ1bmN0aW9uIF9jcmVhdGVPdXRlcklubmVyRGl2KGtpbmQpIHtcbiAgICBjb25zdCBkaXYgPSBfY3JlYXRlRGl2KGBtYWluX19zaG93cmVlbC0tJHtraW5kfWApO1xuICAgIGlmIChraW5kID09PSBcIm91dGVyXCIpIHtcbiAgICAgIF90b2dIaWRlKGRpdik7XG4gICAgICBkaXYuY2xhc3NMaXN0LmFkZChcInAtbWFpbl9fc2hvd3JlZWwtLW91dGVyXCIpO1xuICAgICAgbWFpbi5hcHBlbmRDaGlsZChkaXYpO1xuICAgIH0gZWxzZSBpZiAoa2luZCA9PT0gXCJpbm5lclwiKSB7XG4gICAgICBkaXZPdXRlci5hcHBlbmRDaGlsZChkaXYpO1xuICAgIH1cbiAgICByZXR1cm4gZGl2O1xuICB9XG5cbiAgZnVuY3Rpb24gX2NyZWF0ZUltZygpIHtcbiAgICBjb25zdCBpbWFnZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJpbWdcIik7XG4gICAgaW1hZ2UuY2xhc3NMaXN0LmFkZChcInAtc2hvd3JlZWxfX2ltZ1wiKTtcbiAgICBkaXZJbm5lci5hcHBlbmRDaGlsZChpbWFnZSk7XG4gICAgcmV0dXJuIGltYWdlO1xuICB9XG5cbiAgZnVuY3Rpb24gX2NyZWF0ZVRpdGxlKCkge1xuICAgIGNvbnN0IGhlYWRpbmcgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiaDJcIik7XG4gICAgaGVhZGluZy5jbGFzc0xpc3QuYWRkKFwic2hvd3JlZWxfX3RpdGxlXCIsIFwicC1zaG93cmVlbF9fdGl0bGVcIik7XG4gICAgZGl2SW5uZXIuYXBwZW5kQ2hpbGQoaGVhZGluZyk7XG4gICAgcmV0dXJuIGhlYWRpbmc7XG4gIH1cblxuICBmdW5jdGlvbiBfcmVzZXREaXNwbGF5KGludGVydmFsKSB7XG4gICAgY2xlYXJJbnRlcnZhbChpbnRlcnZhbCk7XG4gICAgX3RvZ0hpZGUoZGl2T3V0ZXIpO1xuICAgIGNvdW50ID0gMDtcbiAgfVxuXG4gIGZ1bmN0aW9uIF9zZXRJbWFnZSgpIHtcbiAgICBpbWcuc2V0QXR0cmlidXRlKFwic3JjXCIsIHByb2plY3RzW2NvdW50XS5pbWFnZSk7XG4gICAgaW1nLnNldEF0dHJpYnV0ZShcImFsdFwiLCBwcm9qZWN0c1tjb3VudF0uYWx0KTtcbiAgfVxuXG4gIGZ1bmN0aW9uIF9pbmNyZW1lbnRDb3VudCgpIHtcbiAgICBjb3VudCArPSAxO1xuICB9XG5cbiAgZnVuY3Rpb24gX3NldFRpdGxlKCkge1xuICAgIHRpdGxlLnRleHRDb250ZW50ID0gcHJvamVjdHNbY291bnRdLnRpdGxlO1xuICB9XG5cbiAgZnVuY3Rpb24gX3NldFNob3dyZWVsQmxvY2soKSB7XG4gICAgX3NldEltYWdlKCk7XG4gICAgX3NldFRpdGxlKCk7XG4gIH1cblxuICBjb3VudCA9IDA7XG4gIGRpdk91dGVyID0gX2NyZWF0ZU91dGVySW5uZXJEaXYoXCJvdXRlclwiKTtcbiAgZGl2SW5uZXIgPSBfY3JlYXRlT3V0ZXJJbm5lckRpdihcImlubmVyXCIpO1xuICBpbWcgPSBfY3JlYXRlSW1nKCk7XG4gIHRpdGxlID0gX2NyZWF0ZVRpdGxlKCk7XG5cbiAgZnVuY3Rpb24gY2hlY2soaW50ZXJ2YWwpIHtcbiAgICBfb3V0ZXJIaWRlQ2hlY2soKTtcbiAgICBpZiAoY291bnQgPT09IHByb2plY3RzLmxlbmd0aCkge1xuICAgICAgX3Jlc2V0RGlzcGxheShpbnRlcnZhbCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIF9zZXRTaG93cmVlbEJsb2NrKCk7XG4gICAgICBfaW5jcmVtZW50Q291bnQoKTtcbiAgICB9XG4gIH1cblxuICByZXR1cm4geyBjaGVjayB9O1xufSkoKTtcblxuY29uc3QgYnRuU2hvd3JlZWwgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmJ0bi0tc2hvd3JlZWxcIik7XG5cbmJ0blNob3dyZWVsLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoKSA9PiB7XG4gIGNvbnN0IGludGVydmFsID0gc2V0SW50ZXJ2YWwoKCkgPT4ge1xuICAgIHNob3dyZWVsRGlzcGxheS5jaGVjayhpbnRlcnZhbCk7XG4gIH0sIDEwMDApO1xufSk7XG5cblxuIiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXShtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsIi8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSAobW9kdWxlKSA9PiB7XG5cdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuXHRcdCgpID0+IChtb2R1bGVbJ2RlZmF1bHQnXSkgOlxuXHRcdCgpID0+IChtb2R1bGUpO1xuXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCB7IGE6IGdldHRlciB9KTtcblx0cmV0dXJuIGdldHRlcjtcbn07IiwiLy8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gKGV4cG9ydHMsIGRlZmluaXRpb24pID0+IHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5vID0gKG9iaiwgcHJvcCkgPT4gKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApKSIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IChleHBvcnRzKSA9PiB7XG5cdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsImltcG9ydCBcIi4vaGVhZGVyL2hlYWRlclwiXG5pbXBvcnQgXCIuL21haW4vbWFpblwiXG5pbXBvcnQgXCIuL21haW4vcHJvamVjdC1zaG93cmVlbFwiIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9