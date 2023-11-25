import {
  popupTypIimage,
  cardTemplate,
  nameInput,
  jobInput,
  popupTypeEdit,
} from "../scripts/index.js";
import { openModal, closeModal } from "./modal.js";

export function createCard(elem, onDelete, onLike, onImg) {
  const cardElement = cardTemplate.cloneNode(true);
  const cardImage = cardElement.querySelector(".card__image");

  cardImage.src = elem.link;
  cardImage.alt = elem.name;
  cardElement.querySelector(".card__title").textContent = elem.name;
  cardElement
    .querySelector(".card__delete-button")
    .addEventListener("click", onDelete);

  cardElement
    .querySelector(".card__like-button")
    .addEventListener("click", onLike);
  cardElement.querySelector(".card__image").addEventListener("click", onImg);

  return cardElement;
}

export function handleDeleteCard(evt) {
  const card = evt.target.closest(".card");
  card.remove();
}

export function handleLikeButton(evt) {
  const like = evt.target;
  like.classList.toggle("card__like-button_is-active");
}

export function handleOpenImg(evt) {
  const image = evt.target;
  popupTypIimage.querySelector(".popup__image").src = image.src;
  popupTypIimage.querySelector(".popup__caption").textContent = image.alt;
  openModal(popupTypIimage);
}

export function handleFormSubmit(evt) {
  evt.preventDefault();

  document.querySelector(".profile__title").textContent = nameInput.value;
  document.querySelector(".profile__description").textContent = jobInput.value;
  closeModal(popupTypeEdit);
}
