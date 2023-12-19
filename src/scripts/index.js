import "../../pages/index.css"; // добавлен импорт главного файла стилей
import {
  createCard,
  handleDeleteCard,
  handleLikeButton,
  deleteCardBuffer,
} from "../components/card.js";
import {
  patchAvatarUrl,
  postNewCard,
  getInitialUser,
  getInitialCards,
  deleteCard,
  patchProfile,
} from "../components/api.js";
import { openModal, closeModal, closeByOverlay } from "../components/modal.js";

import { enableValidation, clearValidation } from "../components/validation.js";

export const placesList = document.querySelector(".places__list");
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
export const profileEditButton = document.querySelector(
  ".profile__edit-button"
);
const profileAddButton = document.querySelector(".profile__add-button");
const popupTypeNewCard = document.querySelector(".popup_type_new-card");
const newCardForm = popupTypeNewCard.querySelector(".popup__form");
export const popups = document.querySelectorAll(".popup");
const formElement = popupTypeEdit.querySelector(".popup__form");
export const nameInput = formElement.querySelector(".popup__input_type_name");
export const jobInput = formElement.querySelector(
  ".popup__input_type_description"
);
export const popupTypeDelete = document.querySelector(".popup_type_delete");
export const popupTypeDeleteButton = document.querySelector(
  ".popup__button-delete"
);

const popupTypeNewAvatar = document.querySelector(".popup_type_new-avatar");
const profileImage = document.querySelector(".profile__image");
export const popupInputCardName = newCardForm.querySelector(
  ".popup__input_type_card-name"
);
export const popupInputUrl = newCardForm.querySelector(
  ".popup__input_type_url"
);
const validationConfig = {
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__button",
  inactiveButtonClass: "button_disabled",
  inputErrorClass: "form__input_type_error",
  // errorClass: 'popup__error_visible',
};

function handleOpenImg(evt) {
  const image = evt.target;
  newImageCard.src = image.src;
  newImageCard.alt = image.alt;
  newNameCard.textContent = image.alt;
  openModal(popupTypIimage);
}

function handleProfileFormSubmit(evt) {
  evt.preventDefault();
  //Редактирование профиля
  const buttonSave = evt.target.querySelector(".button");
  buttonSave.textContent = "Сохранение...";
  patchProfile(nameInput.value, jobInput.value)
    .then((data) => {
      editProfileName.textContent = data.name;
      editProfileDescription.textContent = data.about;
      closeModal(popupTypeEdit);
    })
    .catch((err) => console.log(err))
    .finally(() => (buttonSave.textContent = "Сохранить"));
}

newCardForm.addEventListener("submit", (evt) => {
  evt.preventDefault();
  const buttonSave = evt.target.querySelector(".button");
  buttonSave.textContent = "Сохранение...";
  const newCardPromice = postNewCard(
    popupInputCardName.value,
    popupInputUrl.value
  );
  newCardPromice
    .then((newCard) => {
      const cardElement = createCard(
        newCard,
        handleDeleteCard,
        handleLikeButton,
        handleOpenImg,
        profileEditButton.value
      );
      placesList.prepend(cardElement);
      closeModal(popupTypeNewCard);

      newCardForm.reset();
    })
    .catch((err) => console.log(err))
    .finally(() => (buttonSave.textContent = "Сохранить"));
});

//открытие, закрытие карточек, попапов

profileEditButton.addEventListener("click", () => {
  clearValidation(popupTypeEdit, validationConfig);
  nameInput.value = editProfileName.textContent;
  jobInput.value = editProfileDescription.textContent;
  openModal(popupTypeEdit);
});

profileAddButton.addEventListener("click", () => {
  clearValidation(popupTypeNewCard, validationConfig);
  openModal(popupTypeNewCard);
});

popups.forEach((elem) => {
  elem.addEventListener("click", closeByOverlay);
});

popupTypeDeleteButton.addEventListener("click", onDeleteMyCard);

function onDeleteMyCard(evt) {
  const cardId = evt.target.value;
  deleteCard(cardId).then(() => {
    deleteCardBuffer.remove();
    closeModal(popupTypeDelete);
  });
}

//редактирование имени и информации о себе
formElement.addEventListener("submit", handleProfileFormSubmit);

//Обновление аватара пользователя
profileImage.addEventListener("click", handleProfileImage);

function handleProfileImage() {
  openModal(popupTypeNewAvatar);
}

popupTypeNewAvatar
  .querySelector(".popup__form")
  .addEventListener("submit", handleAvatarFormSubmit);
function handleAvatarFormSubmit(evt) {
  evt.preventDefault();
  const buttonSave = evt.target.querySelector(".button");
  buttonSave.textContent = "Сохранение...";
  const urlLink = evt.target.querySelector(".popup__input_type_avatar").value;
  patchAvatarUrl(urlLink).then((data) => {
    profileImage.setAttribute(
      "style",
      `background-image: url(${data.avatar});`
    );
    closeModal(popupTypeNewAvatar);
  });
  buttonSave.textContent = "Сохранить";
}

enableValidation(validationConfig);

//начальная загрузка информации

Promise.all([getInitialCards(), getInitialUser()]).then(
  ([responseInitialCards, responseInitialUser]) => {
    editProfileName.textContent = responseInitialUser.name;
    editProfileDescription.textContent = responseInitialUser.about;
    profileEditButton.value = responseInitialUser._id;
    profileImage.setAttribute(
      "style",
      `background-image: url(${responseInitialUser.avatar});`
    );
    responseInitialCards.forEach((item) => {
      const cardElement = createCard(
        item,
        handleDeleteCard,
        handleLikeButton,
        handleOpenImg,
        responseInitialUser._id
      );
      placesList.append(cardElement);
    });
  }
);
