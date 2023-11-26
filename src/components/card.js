import {
  popupTypIimage,
  newImageCard,
  newNameCard,
  cardTemplate,
  nameInput,
  jobInput,
  popupTypeEdit,
  editProfileName,
  editProfileDescription,
} from "../scripts/index.js";
import { openModal, closeModal } from "./modal.js";

export function createCard(cardData, onDelete, onLike, onImg) {
  const cardElement = cardTemplate.cloneNode(true);
  const cardImage = cardElement.querySelector(".card__image");

  cardImage.src = cardData.link;
  cardImage.alt = cardData.name;
  cardElement.querySelector(".card__title").textContent = cardData.name;
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
  newImageCard.src = image.src;
  newNameCard.textContent = image.alt;
  openModal(popupTypIimage);
}

export function handleProfileFormSubmit(evt) {
  evt.preventDefault();

  editProfileName.textContent = nameInput.value;
  editProfileDescription.textContent = jobInput.value;
  closeModal(popupTypeEdit);
}
