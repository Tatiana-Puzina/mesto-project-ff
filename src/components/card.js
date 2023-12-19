import {
  cardTemplate,
  popupTypeDelete,
  popupTypeDeleteButton,
} from "../scripts/index.js";
import { openModal } from "./modal.js";
import { deleteLike, putLike } from "./api.js";

export let deleteCardBuffer = {};

export function createCard(cardData, onDelete, onLike, onImg, userID) {
  const cardElement = cardTemplate.cloneNode(true);
  const cardImage = cardElement.querySelector(".card__image");

  // заполняем данные шаблона
  cardImage.src = cardData.link;
  cardImage.alt = cardData.name;

  cardElement.querySelector(".card__title").textContent = cardData.name;
  cardElement.querySelector(".card__image").addEventListener("click", onImg);
  // работаем с кнопкой удаления карточки
  if (cardData.owner._id === userID) {
    const deleteButton = cardElement.querySelector(".card__delete-button");
    deleteButton.value = cardData._id;
    deleteButton.addEventListener("click", onDelete);
  } else {
    cardElement.querySelector(".card__delete-button").remove();
  }
  // работаем с кнопкой лайк карточки
  const conutLike = cardElement.querySelector(".card__likes-number");
  const likeButton = cardElement.querySelector(".card__like-button");

  conutLike.textContent = cardData.likes.length;
  likeButton.value = cardData._id;
  likeButton.addEventListener("click", onLike);
  cardData.likes.forEach((like) => {
    if (like._id === userID) {
      likeButton.classList.add("card__like-button_is-active");
    }
  });
  return cardElement;
}

export function handleDeleteCard(evt) {
  deleteCardBuffer = evt.target.closest(".card");
  popupTypeDeleteButton.value = evt.target.value;
  openModal(popupTypeDelete);
}

export function handleLikeButton(evt) {
  const like = evt.target;
  const cardId = like.value;
  const likeMetod = like.classList.contains("card__like-button_is-active")
    ? deleteLike
    : putLike;
  likeMetod(cardId)
    .then((data) => {
      like.classList.toggle("card__like-button_is-active");
      like.parentElement.querySelector(".card__likes-number").textContent =
        data.likes.length;
    })
    .catch((error) => console.log(error));
}
