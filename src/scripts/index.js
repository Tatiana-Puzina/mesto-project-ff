import "../../pages/index.css"; // добавлен импорт главного файла стилей
import { initialCards } from "../components/cards.js";
import {
  createCard,
  handleDeleteCard,
  handleLikeButton,
  handleOpenImg,
  handleProfileFormSubmit,
} from "../components/card.js";
import { openModal, closeModal } from "../components/modal.js";

const placesList = document.querySelector(".places__list");
export const cardTemplate = document
  .querySelector("#card-template")
  .content.querySelector(".places__item");
export const popupTypeEdit = document.querySelector(".popup_type_edit");

export const editProfileName = document.querySelector(".profile__title");
export const editProfileDescription = document.querySelector(
  ".profile__description"
);

export const popupTypIimage = document.querySelector(".popup_type_image");
export const newImageCard = popupTypIimage.querySelector(".popup__image");
export const newNameCard = popupTypIimage.querySelector(".popup__caption");
const profileEditButton = document.querySelector(".profile__edit-button");
const profileAddButton = document.querySelector(".profile__add-button");
const popupTypeNewCard = document.querySelector(".popup_type_new-card");
const newCardForm = popupTypeNewCard.querySelector(".popup__form");
const popups = document.querySelectorAll(".popup");
const formElement = popupTypeEdit.querySelector(".popup__form");
export const nameInput = formElement.querySelector(".popup__input_type_name");
export const jobInput = formElement.querySelector(
  ".popup__input_type_description"
);

const popupInputCardName = newCardForm.querySelector(
  ".popup__input_type_card-name"
);
const popupInputUrl = newCardForm.querySelector(".popup__input_type_url");

initialCards.forEach((item) => {
  const cardElement = createCard(
    item,
    handleDeleteCard,
    handleLikeButton,
    handleOpenImg
  );
  placesList.append(cardElement);
});

newCardForm.addEventListener("submit", (evt) => {
  evt.preventDefault();
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
  closeModal(popupTypeNewCard);
  newCardForm.reset();
});

//открытие, закрытие карточек, попапов

profileEditButton.addEventListener("click", () => {
  openModal(popupTypeEdit);
  document.forms["edit-profile"].elements.name.value =
    editProfileName.textContent;
  document.forms["edit-profile"].elements.description.value =
    editProfileDescription.textContent;
});

profileAddButton.addEventListener("click", () => {
  openModal(popupTypeNewCard);
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
formElement.addEventListener("submit", handleProfileFormSubmit);
