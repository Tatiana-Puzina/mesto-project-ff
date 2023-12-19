(()=>{"use strict";var e={d:(t,r)=>{for(var n in r)e.o(r,n)&&!e.o(t,n)&&Object.defineProperty(t,n,{enumerable:!0,get:r[n]})},o:(e,t)=>Object.prototype.hasOwnProperty.call(e,t)};function t(e){e.classList.add("popup_is-opened"),document.addEventListener("keydown",n)}function r(e){e.classList.replace("popup_is-opened","popup_is-animated"),document.removeEventListener("keydown",n)}function n(e){"Escape"===e.key&&r(document.querySelector(".popup_is-opened"))}function o(e){(e.target.classList.contains("popup")||e.target.classList.contains("popup__close"))&&r(e.currentTarget)}e.d({},{OP:()=>h,MZ:()=>j,sP:()=>P});var c={baseUrl:"https://nomoreparties.co/v1/wff-cohort-2",headers:{authorization:"5b21a986-ef5a-4081-8c45-253307a18f95","Content-Type":"application/json"}};function a(e){return e.ok?e.json():Promise.reject("Ошибка: ".concat(e.status))}var u=function(e){return fetch("".concat(c.baseUrl,"/cards/likes/").concat(e),{method:"DELETE",headers:c.headers}).then((function(e){return a(e)}))},i=function(e){return fetch("".concat(c.baseUrl,"/cards/likes/").concat(e),{method:"PUT",headers:c.headers}).then((function(e){return a(e)}))},l={};function s(e,t,r,n,o){var c=h.cloneNode(!0),a=c.querySelector(".card__image");if(a.src=e.link,a.alt=e.name,c.querySelector(".card__title").textContent=e.name,c.querySelector(".card__image").addEventListener("click",n),e.owner._id===o){var u=c.querySelector(".card__delete-button");u.value=e._id,u.addEventListener("click",t)}else c.querySelector(".card__delete-button").remove();var i=c.querySelector(".card__likes-number"),l=c.querySelector(".card__like-button");return i.textContent=e.likes.length,l.value=e._id,l.addEventListener("click",r),e.likes.forEach((function(e){e._id===o&&l.classList.add("card__like-button_is-active")})),c}function d(e){l=e.target.closest(".card"),P.value=e.target.value,t(j)}function p(e){var t=e.target,r=t.value;(t.classList.contains("card__like-button_is-active")?u:i)(r).then((function(e){t.classList.toggle("card__like-button_is-active"),t.parentElement.querySelector(".card__likes-number").textContent=e.likes.length})).catch((function(e){return console.log(e)}))}var f=function(e,t,r){var n=e.querySelector(".".concat(t.id,"-error"));t.classList.remove(r.inputErrorClass),n.textContent=""},_=function(e,t,r){e.every((function(e){return e.validity.valid}))?(t.disabled=!1,t.classList.remove(r.inactiveButtonClass)):(t.disabled=!0,t.classList.add(r.inactiveButtonClass))},y=function(e,t){var r=Array.from(e.querySelectorAll(t.inputSelector)),n=e.querySelector(t.submitButtonSelector);e.querySelector("form").reset(),_(r,n,t),r.forEach((function(r){return f(e,r,t)}))};function m(e,t){(null==t||t>e.length)&&(t=e.length);for(var r=0,n=new Array(t);r<t;r++)n[r]=e[r];return n}var v=document.querySelector(".places__list"),h=document.querySelector("#card-template").content.querySelector(".places__item"),S=document.querySelector(".popup_type_edit"),b=document.querySelector(".profile__title"),q=document.querySelector(".profile__description"),g=document.querySelector(".popup_type_image"),E=g.querySelector(".popup__image"),C=g.querySelector(".popup__caption"),k=document.querySelector(".profile__edit-button"),L=document.querySelector(".profile__add-button"),x=document.querySelector(".popup_type_new-card"),A=x.querySelector(".popup__form"),O=document.querySelectorAll(".popup"),w=S.querySelector(".popup__form"),T=w.querySelector(".popup__input_type_name"),U=w.querySelector(".popup__input_type_description"),j=document.querySelector(".popup_type_delete"),P=document.querySelector(".popup__button-delete"),B=document.querySelector(".popup_type_new-avatar"),D=document.querySelector(".profile__image"),M=A.querySelector(".popup__input_type_card-name"),N=A.querySelector(".popup__input_type_url"),I={formSelector:".popup__form",inputSelector:".popup__input",submitButtonSelector:".popup__button",inactiveButtonClass:"button_disabled",inputErrorClass:"form__input_type_error"};function J(e){var r=e.target;E.src=r.src,E.alt=r.alt,C.textContent=r.alt,t(g)}A.addEventListener("submit",(function(e){e.preventDefault();var t=e.target.querySelector(".button");t.textContent="Сохранение...";var n=function(e,t){return fetch("".concat(c.baseUrl,"/cards"),{method:"POST",headers:c.headers,body:JSON.stringify({name:e,link:t})}).then((function(e){return a(e)}))}(M.value,N.value);n.then((function(e){var t=s(e,d,p,J,k.value);v.prepend(t),r(x),A.reset()})).catch((function(e){return console.log(e)})).finally((function(){return t.textContent="Сохранить"}))})),k.addEventListener("click",(function(){y(S,I),T.value=b.textContent,U.value=q.textContent,t(S)})),L.addEventListener("click",(function(){y(x,I),t(x)})),O.forEach((function(e){e.addEventListener("click",o)})),P.addEventListener("click",(function(e){(function(e){return fetch("".concat(c.baseUrl,"/cards/").concat(e),{method:"DELETE",headers:c.headers}).then((function(e){return a(e)}))})(e.target.value).then((function(){l.remove(),r(j)}))})),w.addEventListener("submit",(function(e){e.preventDefault();var t=e.target.querySelector(".button");t.textContent="Сохранение...",function(e,t){return fetch("".concat(c.baseUrl,"/users/me"),{method:"PATCH",headers:c.headers,body:JSON.stringify({name:e,about:t})}).then((function(e){return a(e)}))}(T.value,U.value).then((function(e){b.textContent=e.name,q.textContent=e.about,r(S)})).catch((function(e){return console.log(e)})).finally((function(){return t.textContent="Сохранить"}))})),D.addEventListener("click",(function(){t(B)})),B.querySelector(".popup__form").addEventListener("submit",(function(e){e.preventDefault();var t=e.target.querySelector(".button");t.textContent="Сохранение...",function(e){return fetch("".concat(c.baseUrl,"/users/me/avatar"),{method:"PATCH",headers:c.headers,body:JSON.stringify({avatar:e})}).then((function(e){return a(e)}))}(e.target.querySelector(".popup__input_type_avatar").value).then((function(e){D.setAttribute("style","background-image: url(".concat(e.avatar,");")),r(B)})),t.textContent="Сохранить"})),function(e){Array.from(document.querySelectorAll(e.formSelector)).forEach((function(t){var r=Array.from(t.querySelectorAll(e.inputSelector)),n=t.querySelector(e.submitButtonSelector);_(r,n,e),r.forEach((function(o){o.addEventListener("input",(function(){!function(e,t,r){t.validity.patternMismatch?t.setCustomValidity(t.dataset.error):t.setCustomValidity(""),t.validity.valid?f(e,t,r):function(e,t,r,n){var o=e.querySelector(".".concat(t.id,"-error"));t.classList.add(n.inputErrorClass),o.textContent=r}(e,t,t.validationMessage,r)}(t,o,e),_(r,n,e)}))}))}))}(I),Promise.all([fetch("".concat(c.baseUrl,"/cards"),{method:"GET",headers:c.headers}).then((function(e){return a(e)})),fetch("".concat(c.baseUrl,"/users/me"),{method:"GET",headers:c.headers}).then((function(e){return a(e)}))]).then((function(e){var t,r,n=(r=2,function(e){if(Array.isArray(e))return e}(t=e)||function(e,t){var r=null==e?null:"undefined"!=typeof Symbol&&e[Symbol.iterator]||e["@@iterator"];if(null!=r){var n,o,c,a,u=[],i=!0,l=!1;try{if(c=(r=r.call(e)).next,0===t){if(Object(r)!==r)return;i=!1}else for(;!(i=(n=c.call(r)).done)&&(u.push(n.value),u.length!==t);i=!0);}catch(e){l=!0,o=e}finally{try{if(!i&&null!=r.return&&(a=r.return(),Object(a)!==a))return}finally{if(l)throw o}}return u}}(t,r)||function(e,t){if(e){if("string"==typeof e)return m(e,t);var r=Object.prototype.toString.call(e).slice(8,-1);return"Object"===r&&e.constructor&&(r=e.constructor.name),"Map"===r||"Set"===r?Array.from(e):"Arguments"===r||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r)?m(e,t):void 0}}(t,r)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()),o=n[0],c=n[1];b.textContent=c.name,q.textContent=c.about,k.value=c._id,D.setAttribute("style","background-image: url(".concat(c.avatar,");")),o.forEach((function(e){var t=s(e,d,p,J,c._id);v.append(t)}))}))})();