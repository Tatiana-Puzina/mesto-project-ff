export function openModal(elem) {
  elem.classList.add("popup_is-opened");
}

export function closeModal(elem) {
  elem.classList.replace("popup_is-opened", "popup_is-animated");
}
