import "../../pages/index.css"; // добавлен импорт главного файла стилей
import {
  createCard,
  handleDeleteCard,
  handleLikeButton,
  handleOpenImg,
  handleProfileFormSubmit,
} from "../components/card.js";
import {
  patchAvatarUrl,
  postNewCard,
  getInitialUser,
  getInitialCards,
  deleteCard,
} from "../components/api.js";
import { openModal, closeModal } from "../components/modal.js";

import { enableValidation, clearValidation} from "../components/validation.js";

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
const popups = document.querySelectorAll(".popup");
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
const popupButtonDelete = document.querySelector(".popup__button-delete");

newCardForm.addEventListener("submit", (evt) => {
  evt.preventDefault();
  const buttonSave = evt.target.querySelector(".button");
  buttonSave.textContent = "Сохранение...";
  const newCardPromice = postNewCard(
    popupInputCardName.value,
    popupInputUrl.value
  );
  newCardPromice.then((newCard) => {
    const cardElement = createCard(
      newCard,
      handleDeleteCard,
      handleLikeButton,
      handleOpenImg
    );
    placesList.prepend(cardElement);
    closeModal(popupTypeNewCard);
    buttonSave.textContent = "Сохранить";
    newCardForm.reset();
  });
});

//открытие, закрытие карточек, попапов

profileEditButton.addEventListener("click", () => {
  openModal(popupTypeEdit);
  clearValidation(popupTypeEdit, {
    form: "edit-profile",
    inputSelector: ".popup__input",
    submitButtonSelector: ".popup__button",
    data: {
      name: editProfileName.textContent,
      description: editProfileDescription.textContent
    }
  })
});

profileAddButton.addEventListener("click", () => {
  clearValidation(popupTypeNewCard, {
    form: "new-place",
    inputSelector: ".popup__input",
    submitButtonSelector: ".popup__button",
    data: {
      "place-name": '',
      link: ''
    }
  })
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

popupTypeDeleteButton.addEventListener("click", onDeleteMyCard);

function onDeleteMyCard(evt) {
  const cardId = evt.target.value;
  deleteCard(cardId);
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
  patchAvatarUrl(urlLink);
}

enableValidation({
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__button",
  inactiveButtonClass: "button_disabled",
  inputErrorClass: "form__input_type_error",
  // errorClass: 'popup__error_visible',
  regExp: /^[a-zа-яё\-\s]+$/i,
  customValidation: "popup__input-validation",
});

//начальная загрузка информации

Promise.all([getInitialCards, getInitialUser]).then(
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
        handleOpenImg
      );
      placesList.append(cardElement);
    });
  }
);
