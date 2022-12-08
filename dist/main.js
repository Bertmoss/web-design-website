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
  nav.classList.toggle("hidden");
  root.classList.toggle("dark");
}) 




/***/ }),

/***/ "./src/main/main.js":
/*!**************************!*\
  !*** ./src/main/main.js ***!
  \**************************/
/***/ (() => {



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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFBQTtBQUNBO0FBQ0E7QUFDQTs7OztBQUlBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQzs7Ozs7Ozs7Ozs7Ozs7O0FDVEQ7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSxvQkFBb0IsZ0JBQWdCO0FBQ3BDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7OztBQUlBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUssRUFBRTtBQUNQO0FBQ0E7QUFDQSxnREFBZ0Q7QUFDaEQsb0JBQW9CO0FBQ3BCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUM7OztBQUdEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDBDQUEwQzs7QUFFMUM7O0FBRUE7QUFDQTtBQUNBLENBQUM7QUFDRDs7Ozs7O0FBTUE7O0FBRUE7O0FBRUE7QUFDQTs7QUFFQSxDQUFDOzs7O0FBSUQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSw2Q0FBNkM7QUFDN0M7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsK0NBQStDLFdBQVc7QUFDMUQ7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTCxpQkFBaUI7QUFDakI7QUFDQTtBQUNBLE1BQU07QUFDTjtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQLE1BQU07QUFDTjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsQ0FBQzs7QUFFRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLENBQUM7Ozs7OztVQzNSRDtVQUNBOztVQUVBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBOztVQUVBO1VBQ0E7O1VBRUE7VUFDQTtVQUNBOzs7OztXQ3RCQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0EsaUNBQWlDLFdBQVc7V0FDNUM7V0FDQTs7Ozs7V0NQQTtXQUNBO1dBQ0E7V0FDQTtXQUNBLHlDQUF5Qyx3Q0FBd0M7V0FDakY7V0FDQTtXQUNBOzs7OztXQ1BBOzs7OztXQ0FBO1dBQ0E7V0FDQTtXQUNBLHVEQUF1RCxpQkFBaUI7V0FDeEU7V0FDQSxnREFBZ0QsYUFBYTtXQUM3RDs7Ozs7Ozs7Ozs7Ozs7OztBQ053QiIsInNvdXJjZXMiOlsid2VicGFjazovL3dlYi1kZXNpZ24td2Vic2l0ZS8uL3NyYy9oZWFkZXIvaGVhZGVyLmpzIiwid2VicGFjazovL3dlYi1kZXNpZ24td2Vic2l0ZS8uL3NyYy9tYWluL21haW4uanMiLCJ3ZWJwYWNrOi8vd2ViLWRlc2lnbi13ZWJzaXRlL3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL3dlYi1kZXNpZ24td2Vic2l0ZS93ZWJwYWNrL3J1bnRpbWUvY29tcGF0IGdldCBkZWZhdWx0IGV4cG9ydCIsIndlYnBhY2s6Ly93ZWItZGVzaWduLXdlYnNpdGUvd2VicGFjay9ydW50aW1lL2RlZmluZSBwcm9wZXJ0eSBnZXR0ZXJzIiwid2VicGFjazovL3dlYi1kZXNpZ24td2Vic2l0ZS93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovL3dlYi1kZXNpZ24td2Vic2l0ZS93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovL3dlYi1kZXNpZ24td2Vic2l0ZS8uL3NyYy9pbmRleC5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyIvL0hhbWJ1cmdlciBNZW51IEJ0bi8qIFxubGV0IGJ0biA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuaGVhZGVyLWRpdl9fYnRuXCIpO1xubGV0IG5hdiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuaGVhZGVyX19uYXZcIik7XG5sZXQgcm9vdCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCI6cm9vdFwiKTtcblxuXG5cbmJ0bi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKCkgPT4ge1xuICBidG4uY2xhc3NMaXN0LnRvZ2dsZShcIm9wZW5cIik7XG4gIG5hdi5jbGFzc0xpc3QudG9nZ2xlKFwiaGlkZGVuXCIpO1xuICByb290LmNsYXNzTGlzdC50b2dnbGUoXCJkYXJrXCIpO1xufSkgXG5cblxuIiwiXG5cbmxldCBkaXNwbGF5TW9kdWxlID0gKGZ1bmN0aW9uKCl7XG4gIGZ1bmN0aW9uIF9jcmVhdGVEaXYoKSB7XG4gICAgcmV0dXJuIGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIilcbiAgfVxuXG4gIGZ1bmN0aW9uIF9hcHBlbmRDaGlsZHJlbihkaXYsIGFycmF5KSB7XG4gICAgYXJyYXkuZm9yRWFjaChlbGVtZW50ID0+IHtcbiAgICAgIGRpdi5hcHBlbmRDaGlsZChlbGVtZW50KTtcbiAgICB9KTtcbiAgfVxuXG4gIGZ1bmN0aW9uIF9hcHBlbmREaXYoZGl2KSB7XG4gICAgbGV0IG1haW4gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwibWFpblwiKTtcbiAgICBtYWluLmFwcGVuZENoaWxkKGRpdik7XG4gIH1cbiAgXG4gIGZ1bmN0aW9uIF9jcmVhdGVIZWFkaW5nKHRleHQpIHtcbiAgICBsZXQgaGVhZGluZyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJoMlwiKTtcbiAgICBoZWFkaW5nLnRleHRDb250ZW50ID0gdGV4dDtcbiAgICByZXR1cm4gaGVhZGluZ1xuICB9XG5cbiAgZnVuY3Rpb24gX2NyZWF0ZVBhcmFncmFwaCh0ZXh0KSB7XG4gICAgbGV0IHBhcmFncmFwaCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJwXCIpO1xuICAgIHBhcmFncmFwaC50ZXh0Q29udGVudCA9IHRleHQ7XG4gICAgcmV0dXJuIHBhcmFncmFwaFxuICB9XG5cbiAgZnVuY3Rpb24gX2NyZWF0ZUltYWdlKGltZ1NyYywgYWx0KSB7XG4gICAgbGV0IGltYWdlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImltZ1wiKTtcbiAgICBpbWFnZS5zcmMgPSBpbWdTcmM7XG4gICAgaW1hZ2Uuc2V0QXR0cmlidXRlKFwiYWx0XCIsIGFsdCk7XG4gICAgcmV0dXJuIGltYWdlO1xuICB9XG5cbiAgZnVuY3Rpb24gX2NyZWF0ZVNob3dCbG9jayhvYmopIHtcbiAgICBsZXQgZGl2ID1fY3JlYXRlRGl2KCk7XG4gICAgbGV0IGhlYWRpbmcgPSBfY3JlYXRlSGVhZGluZyhvYmoubmFtZSk7XG4gICAgbGV0IGRlc2NyaXB0aW9uID0gX2NyZWF0ZVBhcmFncmFwaChvYmouZGVzY3JpcHRpb24pO1xuICAgIGxldCBpbWFnZSA9IF9jcmVhdGVJbWFnZShvYmouaW1hZ2UsIG9iai5hbHQpO1xuICAgIF9hcHBlbmRDaGlsZHJlbihkaXYsIFtpbWFnZSwgaGVhZGluZywgZGVzY3JpcHRpb25dKTtcbiAgICByZXR1cm4gZGl2O1xuICB9XG4gIFxuXG5cbiAgZnVuY3Rpb24gY3JlYXRlU2hvd0Jsb2NrcyhhcnIpIHtcbiAgICBsZXQgZGl2ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgXG4gICAgZGl2LmNsYXNzTGlzdC5hZGQoXCJtYWluX19zaG93cmVlbFwiKTtcbiAgICBfYXBwZW5kRGl2KGRpdik7XG5cbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IGFyci5sZW5ndGg7IGkrKykge1xuICAgICAgZnVuY3Rpb24gaW5jcmVtZW50KCkge1xuICAgICAgICBpKys7XG4gICAgICB9XG4gICAgICBcbiAgICAgIGxldCBwcm9qZWN0ID0gX2NyZWF0ZVNob3dCbG9jayhhcnJbaV0pO1xuICAgICAgZGl2LmFwcGVuZENoaWxkKHByb2plY3QpO1xuICAgICAgcHJvamVjdC5jbGFzc0xpc3QuYWRkKFwiZWxlbWVudFRvRmFkZUluQW5kT3V0XCIpXG4gICAgICBzZXRUaW1lb3V0KGluY3JlbWVudCwgMzAwMDAwMDAwMCk7XG4gICAgfVxuXG4gICAgXG5cblxuXG4gICAgLyphcnIuZm9yRWFjaChlbGVtZW50ID0+IHtcbiAgICAgIGxldCBwcm9qZWN0ID0gX2NyZWF0ZVNob3dCbG9jayhlbGVtZW50KTtcbiAgICAgIGRpdi5hcHBlbmRDaGlsZChwcm9qZWN0KTtcbiAgICAgIHByb2plY3QuY2xhc3NMaXN0LmFkZChcImVsZW1lbnRUb0ZhZGVJbkFuZE91dFwiKVxuICAgICAgXG4gICAgICBcbiAgICB9KTsqL1xuICAgIFxuICAgIC8qIFxuICAgIGRpdi5jbGFzc0xpc3QuYWRkKFwiZWxlbWVudFRvRmFkZUluQW5kT3V0XCIpOyAqL1xuICAgIF9hcHBlbmREaXYoZGl2KTsvKiBcbiAgICBzZXRUaW1lb3V0KGRpdi5jbGFzc0xpc3QuYWRkKFwiZmFkZS1vdXRcIiksIDMwMDAwMCkgKi9cbiAgfVxuICBcbiAgcmV0dXJuIHtcbiAgICBjcmVhdGVTaG93QmxvY2tzXG4gIH1cbn0pKClcblxuXG5jbGFzcyBQcm9qZWN0IHtcbiAgY29uc3RydWN0b3IobmFtZSwgZGVzY3JpcHRpb24sIGltYWdlLCBhbHQpIHtcbiAgICB0aGlzLm5hbWUgPSBuYW1lO1xuICAgIHRoaXMuZGVzY3JpcHRpb24gPSBkZXNjcmlwdGlvbjtcbiAgICB0aGlzLmltYWdlID0gaW1hZ2U7XG4gICAgdGhpcy5hbHQgPSBhbHQ7XG4gIH1cbn1cblxubGV0IHByb2plY3RzID0gW25ldyBQcm9qZWN0KFwiRmFzaGlvbiBNYWdhemluZVwiLCBcIkxvcmVtIGlwc3VtIGRvbG9yIHNpdCBhbWV0LCBjb25zZWN0ZXR1ciBhZGlwaXNjaW5nIGVsaXRcIiwgXCIvaW1hZ2VzL3N0b2NrLTEtLXRhbGwuanBnXCIsIFwiUGVyc29uIHNpdHRpbmcgaW4gZmFzaGlvbmFibGUgY2xvdGhlc1wiKSxcbm5ldyBQcm9qZWN0KFwiRmFzaGlvbiBNYWdhemluZVwiLCBcIkxvcmVtIGlwc3VtIGRvbG9yIHNpdCBhbWV0LCBjb25zZWN0ZXR1ciBhZGlwaXNjaW5nIGVsaXRcIiwgXCIvaW1hZ2VzL3N0b2NrLTEtLXRhbGwuanBnXCIsIFwiUGVyc29uIHNpdHRpbmcgaW4gZmFzaGlvbmFibGUgY2xvdGhlc1wiKSxcbm5ldyBQcm9qZWN0KFwiRmFzaGlvbiBNYWdhemluZVwiLCBcIkxvcmVtIGlwc3VtIGRvbG9yIHNpdCBhbWV0LCBjb25zZWN0ZXR1ciBhZGlwaXNjaW5nIGVsaXRcIiwgXCIvaW1hZ2VzL3N0b2NrLTEtLXRhbGwuanBnXCIsIFwiUGVyc29uIHNpdHRpbmcgaW4gZmFzaGlvbmFibGUgY2xvdGhlc1wiKSxcbl07XG4vKiBcbmRpc3BsYXlNb2R1bGUuY3JlYXRlU2hvd0Jsb2Nrcyhwcm9qZWN0cyk7ICovXG5cbi8qIGxldCBzaG93cmVlbEJsb2NrcyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoXCIubWFpbl9fc2hvd3JlZWwgZGl2XCIpO1xuXG5zaG93cmVlbEJsb2Nrcy5mb3JFYWNoKGVsZW1lbnQgPT4ge1xuICBlbGVtZW50LmNsYXNzTGlzdC5hZGQoXCJlbGVtZW50VG9GYWRlSW5BbmRPdXRcIilcbn0pXG4gKi9cblxuXG5cblxuXG5sZXQgYnRuU2hvd3JlZWwgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmJ0bi0tc2hvd3JlZWxcIik7XG5cbmJ0blNob3dyZWVsLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoKSA9PiB7XG5cbmRpc3BsYXlNb2R1bGUuY3JlYXRlU2hvd0Jsb2Nrcyhwcm9qZWN0cyk7XG4gXG5cbn0pXG5cblxuXG4vL0ZPUk1cbmxldCBmb3JtRGlzcGxheSA9IChmdW5jdGlvbigpIHtcbi8vY3JlYXRlcyBhbGVydCBtb2RhbFxuICBmdW5jdGlvbiBfY3JlYXRlQWxlcnQodGV4dCkge1xuICAgIGxldCBkaXYgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICAgIGRpdi5jbGFzc0xpc3QuYWRkKFwiYWxlcnQtZGl2XCIsIFwicC1hbGVydC1kaXZcIilcbiAgICBsZXQgcCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJwXCIpO1xuICAgIHAudGV4dENvbnRlbnQgPSB0ZXh0O1xuICAgIGRpdi5hcHBlbmRDaGlsZChwKTtcbiAgICBfY3JlYXRlWEJ0bihkaXYpO1xuICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKCkgPT4geyAvL2RlbGV0ZXMgYWxlcnQtZGl2IGlmIHlvdSBjbGljayBvdXRzaWRlIG9mIGl0XG4gICAgICBjb25zdCBpc091dHNpZGUgPSAhZXZlbnQudGFyZ2V0LmNsb3Nlc3QoXCIuYWxlcnQtZGl2XCIpICYmICFldmVudC50YXJnZXQuY2xvc2VzdChcImJ1dHRvblwiKSBcbiAgICAgIGlmIChpc091dHNpZGUpIHsgXG4gICAgICAgZGl2LnJlbW92ZSgpO1xuICAgICAgfVxuICAgIH0pXG4gICAgbWFpbi5hcHBlbmRDaGlsZChkaXYpO1xuICB9XG5cbi8vIHRha2VzIGluZm8gZnJvbSB0aGUgZm9ybSBpbnB1dHMgYW5kIGFkZHMgaXQgYXMgYW4gb2JqIHRvIHRoZSBpbnF1aXJpZXMgYXJyXG4gIGZ1bmN0aW9uIF9JbnF1aXJ5RnJvbUZvcm0oIGZvcm0sIGNsYXNzVGV4dCkge1xuICAgIGxldCBpbnB1dHMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKGAuJHtjbGFzc1RleHR9IGlucHV0YCksXG4gICAgbmFtZSxcbiAgICBlbWFpbCxcbiAgICBpbnF1aXJ5O1xuXG4gICAgaW5wdXRzLmZvckVhY2goaW5wdXQgPT4ge1xuICAgICAgc3dpdGNoIChpbnB1dC5nZXRBdHRyaWJ1dGUoXCJuYW1lXCIpKSB7XG4gICAgICAgIGNhc2UgXCJuYW1lXCI6XG4gICAgICAgICAgbmFtZSA9IGlucHV0LnZhbHVlO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlIFwiZW1haWxcIjpcbiAgICAgICAgICBpbnB1dC5jaGVja1ZhbGlkaXR5KCkgPyBlbWFpbCA9IGlucHV0LnZhbHVlOiBmYWxzZTtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSBcImlucXVpcnlcIjogXG4gICAgICAgICAgaW5xdWlyeSA9IGlucHV0LnZhbHVlO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgfVxuICAgIH0pXG4gICAgaWYgKGVtYWlsKSB7IC8vY2hlY2sgdG8gc2VlIGlmIHRoZSBlbWFpbCBpbnB1dCB3YXMgcHJvcGVybHkgZmlsbGVkIG91dC5cbiAgICAgIGlucXVpcmllcy5wdXNoKG5ldyBJbnF1aXJ5KG5hbWUsIGVtYWlsLCBpbnF1aXJ5KSkgXG4gICAgICBmb3JtLnJlbW92ZSgpOyBcbiAgICB9IGVsc2Uge1xuICAgICAgaWYgKCFkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmFsZXJ0LWRpdlwiKSlcbiAgICAgIF9jcmVhdGVBbGVydChcIlBsZWFzZSBwcm92aWRlIGEgdmFsaWQgZW1haWxcIilcbiAgICB9XG4gIH1cblxuICAvL3N1Ym1pdCBidG5cbiAgZnVuY3Rpb24gX2NyZWF0ZUJ0bihmb3JtLCBjbGFzc1RleHQpIHtcbiAgICBsZXQgYnRuID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImJ1dHRvblwiKTtcbiAgICBidG4udGV4dENvbnRlbnQgPSBcIlN1Ym1pdFwiO1xuICAgIGJ0bi5zZXRBdHRyaWJ1dGUoXCJ0eXBlXCIsIFwiYnV0dG9uXCIpO1xuICAgIGJ0bi5jbGFzc0xpc3QuYWRkKFwiZm9ybV9fYnRuLS1zdWJtaXRcIiwgIFwiYmxvY2tfX2J0blwiKVxuICAgIGJ0bi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKCkgPT4ge1xuICAgICAgX0lucXVpcnlGcm9tRm9ybShmb3JtLCBjbGFzc1RleHQpXG4gICAgfSlcbiAgICBmb3JtLmFwcGVuZENoaWxkKGJ0bik7XG4gIH1cblxuICAvL2Nsb3NlIGJ0blxuICBmdW5jdGlvbiBfY3JlYXRlWEJ0bihmb3JtKSB7XG4gICAgbGV0IGJ0biA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJidXR0b25cIik7XG4gICAgYnRuLnRleHRDb250ZW50ID0gXCJDbG9zZVwiO1xuICAgIGJ0bi5jbGFzc0xpc3QuYWRkKFwiZm9ybV9fYnRuLS1jbG9zZVwiLCBcInAtZm9ybV9fYnRuLS1jbG9zZVwiKVxuICAgIGJ0bi5zZXRBdHRyaWJ1dGUoXCJ0eXBlXCIsIFwiYnV0dG9uXCIpXG4gICAgYnRuLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoKSA9PiB7XG4gICAgICBmb3JtLnJlbW92ZSgpO1xuICAgIH0pXG4gICAgZm9ybS5hcHBlbmRDaGlsZChidG4pO1xuICB9XG4gIC8vY3JlYXRlcyB0aGUgZm9ybSBhbmQgc3VibWl0IGFuZCBjbG9zZSBidG5zXG4gIGZ1bmN0aW9uIF9jcmVhdGVGb3JtKGNsYXNzVGV4dCkge1xuICAgIGxldCBmb3JtID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImZvcm1cIilcbiAgICBpZiAoQXJyYXkuaXNBcnJheShjbGFzc1RleHQpKSB7XG4gICAgICBjbGFzc1RleHQuZm9yRWFjaChlbGVtZW50ID0+IHtcbiAgICAgICAgZm9ybS5jbGFzc0xpc3QuYWRkKGVsZW1lbnQpO1xuICAgICAgfSlcbiAgICB9IGVsc2Uge1xuICAgICAgZm9ybS5jbGFzc0xpc3QuYWRkKGNsYXNzVGV4dCk7XG4gICAgfVxuICAgIFxuICAgIFxuICAgIF9jcmVhdGVYQnRuKGZvcm0pO1xuICAgIF9jcmVhdGVCdG4oZm9ybSwgY2xhc3NUZXh0KTtcbiAgICByZXR1cm4gZm9ybTtcbiAgfVxuICAvL2NyZWF0ZXMgYW4gaW5wdXQgZnJvbSBhbiBvYmpcbiAgZnVuY3Rpb24gX2NyZWF0ZUlucHV0KG9iaikge1xuICAgIGxldCBpbnB1dCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJpbnB1dFwiKVxuICAgIGlucHV0LnNldEF0dHJpYnV0ZShcInR5cGVcIiwgb2JqLnR5cGUpO1xuICAgIGlucHV0LnNldEF0dHJpYnV0ZShcIm5hbWVcIiwgb2JqLm5hbWUpO1xuICAgIGlucHV0LnNldEF0dHJpYnV0ZShcImlkXCIsIG9iai5pZCk7XG4gICAgcmV0dXJuIGlucHV0O1xuICB9XG4gIC8vY3JlYXRlcyBsYWJlbCBmcm9tIGFuIG9ialxuICBmdW5jdGlvbiBfY3JlYXRlTGFiZWwob2JqKSB7XG4gICAgbGV0IGxhYmVsID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImxhYmVsXCIpO1xuICAgIGxhYmVsLnNldEF0dHJpYnV0ZShcImZvclwiLCBvYmouaWQpO1xuICAgIGxhYmVsLnRleHRDb250ZW50ID0gb2JqLnRleHQ7XG4gICAgcmV0dXJuIGxhYmVsO1xuICB9XG4gIC8vY3JlYXRlcyBhbmQgYXBwZW5kcyBpbnB1dCBhbmQgbGFiZWwgdG8gZm9ybVxuICBmdW5jdGlvbiBfYXBwZW5kSW5wdXRMYWJlbChmb3JtLCBvYmopIHtcbiAgICBsZXQgbGFiZWwgPSBfY3JlYXRlTGFiZWwob2JqKTtcbiAgICBsZXQgaW5wdXQgPSBfY3JlYXRlSW5wdXQob2JqKTtcbiAgICBmb3JtLmFwcGVuZENoaWxkKGxhYmVsKTtcbiAgICBmb3JtLmFwcGVuZENoaWxkKGlucHV0KTtcbiAgfVxuICAvL2NyZWF0ZXMgYW5kIGFwcGVuZHMgYWxsIGlucHV0IGFuZCBsYWJlbFxuICBmdW5jdGlvbiBhcHBlbmRJbnB1dHNMYWJlbHMob2JqKSB7XG4gICAgbGV0IGZvcm0gPSBfY3JlYXRlRm9ybShvYmouZm9ybSlcbiAgICBvYmouaW5wdXRzLmZvckVhY2goZWxlbWVudCA9PiB7XG4gICAgICBfYXBwZW5kSW5wdXRMYWJlbChmb3JtLCBlbGVtZW50KVxuICAgIH0pO1xuICAgIHJldHVybiBmb3JtO1xuICB9XG5cbiAgcmV0dXJuIHtcbiAgICBhcHBlbmRJbnB1dHNMYWJlbHNcbiAgfVxufSkoKVxuXG4vL0NyZWF0ZXMgaW5xdWlyeSBvYmplY3RzIGZyb20gdGhlIGRhdGEgdGFrZW4gZnJvbSB0aGUgZm9ybSBpbnB1dHNcbmNsYXNzIElucXVpcnkge1xuICBjb25zdHJ1Y3RvcihuYW1lLCBlbWFpbCwgdGV4dCkge1xuICAgIHRoaXMubmFtZSA9IG5hbWU7XG4gICAgdGhpcy5lbWFpbCA9IGVtYWlsO1xuICAgIHRoaXMudGV4dCA9IHRleHQ7XG4gIH1cbn1cblxubGV0IGlucXVpcmllcyA9IFtdO1xuXG4vL0NyZWF0ZXMgaW5wdXQgaW5mb3JtYXRpb24gb2JqZWN0cyBmb3IgdGhlIGZvcm1cbmNsYXNzIElucHV0IHtcbiAgY29uc3RydWN0b3IodHlwZSwgbmFtZSwgaWQsIHRleHQpIHtcbiAgICB0aGlzLnR5cGUgPSB0eXBlO1xuICAgIHRoaXMubmFtZSA9IG5hbWU7XG4gICAgdGhpcy5pZCA9IGlkO1xuICAgIHRoaXMudGV4dCA9IHRleHQ7XG4gIH1cbn1cbi8vT2JqIHRoYXQgaG9sZHMgYWxsIHRoZSBpbnB1dCBpbmZvcm1hdGlvbiBvYmpzLCBhbmQgdGhlIGZvcm0ncyBjbGFzcyBuYW1lIFxubGV0IHN0YXJ0UHJvamVjdEZvcm0gPSB7XG4gIGlucHV0czogW25ldyBJbnB1dChcInRleHRcIixcIm5hbWVcIiwgXCJuYW1lXCIsIFwiTmFtZTpcIiksIG5ldyBJbnB1dChcImVtYWlsXCIsIFwiZW1haWxcIiwgXCJlbWFpbFwiLCBcIkVtYWlsIEFkZHJlc3M6XCIpLCBuZXcgSW5wdXQoXCJ0ZXh0XCIsIFwiaW5xdWlyeVwiLCBcImlucXVpcnlcIiwgXCJJbnF1aXJ5OlwiKV0sXG4gIGZvcm06IFtcInN0YXJ0LXByb2plY3QtZGl2X19mb3JtXCIsIFwicC1zdGFydC1wcm9qZWN0LWRpdl9fZm9ybVwiXSxcbn1cblxuLy9zdGFydCBwcm9qZWN0IGJ0bi0tZm9ybVxubGV0IGZvcm1CdG4gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmJ0bi0tZm9ybVwiKTtcbmxldCBtYWluID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIm1haW5cIik7XG5cbi8vY2hlY2sgaWYgZm9ybSBhbHJlYWR5IGV4aXN0cywgaWYgbm90IGNyZWF0ZSB0aGUgZm9ybVxuZm9ybUJ0bi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKCk9PiB7XG4gIChkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLnN0YXJ0LXByb2plY3QtZGl2X19mb3JtXCIpKSA/IHRydWU6IG1haW4uYXBwZW5kQ2hpbGQoZm9ybURpc3BsYXkuYXBwZW5kSW5wdXRzTGFiZWxzKHN0YXJ0UHJvamVjdEZvcm0pKVxufSkiLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiLy8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbl9fd2VicGFja19yZXF1aXJlX18ubiA9IChtb2R1bGUpID0+IHtcblx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG5cdFx0KCkgPT4gKG1vZHVsZVsnZGVmYXVsdCddKSA6XG5cdFx0KCkgPT4gKG1vZHVsZSk7XG5cdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsIHsgYTogZ2V0dGVyIH0pO1xuXHRyZXR1cm4gZ2V0dGVyO1xufTsiLCIvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9ucyBmb3IgaGFybW9ueSBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSAoZXhwb3J0cywgZGVmaW5pdGlvbikgPT4ge1xuXHRmb3IodmFyIGtleSBpbiBkZWZpbml0aW9uKSB7XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGRlZmluaXRpb24sIGtleSkgJiYgIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBrZXkpKSB7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZGVmaW5pdGlvbltrZXldIH0pO1xuXHRcdH1cblx0fVxufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSAob2JqLCBwcm9wKSA9PiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCkpIiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gKGV4cG9ydHMpID0+IHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwiaW1wb3J0IFwiLi9oZWFkZXIvaGVhZGVyXCJcbmltcG9ydCBcIi4vbWFpbi9tYWluXCIiXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=