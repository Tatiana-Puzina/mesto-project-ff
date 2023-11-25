import "../../pages/index.css"; // добавлен импорт главного файла стилей
import { initialCards } from "../components/cards.js";
import {
  createCard,
  handleDeleteCard,
  handleLikeButton,
  handleOpenImg,
  handleFormSubmit,
} from "../components/card.js";
import { openModal, closeModal } from "../components/modal.js";

const placesList = document.querySelector(".places__list");
export const cardTemplate = document
  .querySelector("#card-template")
  .content.querySelector(".places__item");
export const popupTypeEdit = document.querySelector(".popup_type_edit");
export const popupTypIimage = document.querySelector(".popup_type_image");
const profileEditButton = document.querySelector(".profile__edit-button");

const profileAddButton = document.querySelector(".profile__add-button");
const popupTypeNewCard = document.querySelector(".popup_type_new-card");

const popupForm = popupTypeNewCard.querySelector(".popup__form");
const popups = document.querySelectorAll(".popup");
const formElement = popupTypeEdit.querySelector(".popup__form");
export const nameInput = formElement.querySelector(".popup__input_type_name");
export const jobInput = formElement.querySelector(
  ".popup__input_type_description"
);

initialCards.forEach((item) => {
  const cardElement = createCard(
    item,
    handleDeleteCard,
    handleLikeButton,
    handleOpenImg
  );
  placesList.append(cardElement);
});

popupForm.addEventListener("submit", (evt) => {
  evt.preventDefault();
  const popupInputCardName = popupForm.querySelector(
    ".popup__input_type_card-name"
  );
  const popupInputUrl = popupForm.querySelector(".popup__input_type_url");

  const newCard = {
    name: popupInputCardName.value,
    link: popupInputUrl.value,
  };
  const cardElement = createCard(
    newCard,
    handleDeleteCard,
    handleLikeButton,
    handleOpenImg
  );
  placesList.prepend(cardElement);
  popupTypeNewCard.classList.replace("popup_is-opened", "popup_is-animated");
});

//открытие, закрытие карточек, попапов

profileEditButton.addEventListener("click", () => {
  openModal(popupTypeEdit);
  document.forms["edit-profile"].elements.name.value =
    document.querySelector(".profile__title").textContent;
  document.forms["edit-profile"].elements.description.value =
    document.querySelector(".profile__description").textContent;
});

profileAddButton.addEventListener("click", () => {
  openModal(popupTypeNewCard);
});

document.addEventListener("keydown", (evt) => {
  if (evt.key === "Escape") {
    popups.forEach((el) => {
      closeModal(el);
    });
  }
});

popups.forEach((elem) => {
  elem.querySelector(".popup__close").addEventListener("click", () => {
    closeModal(elem);
  });
  elem.addEventListener("click", (evt) => {
    const overlayClose = evt.composedPath().includes(elem.firstElementChild);
    if (!overlayClose) {
      closeModal(elem);
    }
  });
});

//редактирование имени и информации о себе
formElement.addEventListener("submit", handleFormSubmit);
