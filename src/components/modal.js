export function openModal(elem) {
  elem.classList.add("popup_is-opened");
  document.addEventListener("keydown", handleEscClose);
}

export function closeModal(elem) {
  elem.classList.replace("popup_is-opened", "popup_is-animated");
  document.removeEventListener("keydown", handleEscClose);
}

function handleEscClose(evt) {
  if (evt.key === "Escape") {
    const popupOpened = document.querySelector(".popup_is-opened");
    closeModal(popupOpened);
  }
}
