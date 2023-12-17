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
  profileEditButton,
  popupTypeDelete,
  popupTypeDeleteButton
} from "../scripts/index.js";
import { openModal, closeModal } from "./modal.js"; 
import { 
  patchProfile,
  deleteLike,
  putLike
} from "./api.js";

export function createCard(cardData,  onDelete, onLike, onImg) {
  const cardElement = cardTemplate.cloneNode(true);
  const cardImage = cardElement.querySelector(".card__image");
  
  // заполняем данные шаблона
  cardImage.src = cardData.link;
  cardImage.alt = cardData.name;
  
  cardElement.querySelector(".card__title").textContent = cardData.name;
  cardElement.querySelector(".card__image").addEventListener("click", onImg);
  // работаем с кнопкой удаления карточки
  if (cardData.owner._id === profileEditButton.value) {
    const deleteButton =  cardElement
    .querySelector(".card__delete-button")
    deleteButton.value = cardData._id;
    deleteButton.addEventListener("click", onDelete);
  } else {
    cardElement
    .querySelector(".card__delete-button").remove();
  }
  // работаем с кнопкой лайк карточки
  const conutLike = cardElement.querySelector(".card__likes-number");
  const likeButton = cardElement.querySelector(".card__like-button")

  conutLike.textContent = cardData.likes.length;
  likeButton.value = cardData._id;
  likeButton.addEventListener("click", onLike);
  cardData.likes.forEach(like => {
    if (like._id === profileEditButton.value) {
      likeButton.classList.add("card__like-button_is-active");
    }
  });
  return cardElement;
}

export function handleDeleteCard(evt) {
  popupTypeDeleteButton.value = evt.target.value
  openModal(popupTypeDelete);
}

export function handleLikeButton(evt) {
  const like = evt.target;
  const cardId = like.value;
  if (like.classList.contains("card__like-button_is-active")) {
    deleteLike(cardId).then((data) => {
      like.classList.remove("card__like-button_is-active");
      like.parentElement.querySelector('.card__likes-number').textContent = data.likes.length
  })
  } else {
    putLike(cardId).then((data) => {
      like.classList.add("card__like-button_is-active")
      like.parentElement.querySelector('.card__likes-number').textContent = data.likes.length
  })
    
  }

}

export function handleOpenImg(evt) {
  const image = evt.target;
  newImageCard.src = image.src;
  newNameCard.textContent = image.alt;
  openModal(popupTypIimage);
}

export function handleProfileFormSubmit(evt) {
  evt.preventDefault();
   //Редактирование профиля
  const buttonSave = evt.target.querySelector('.button');
  buttonSave.textContent = 'Сохранение...'
  patchProfile(nameInput.value, jobInput.value).then((data)=>{
    editProfileName.textContent = data.name;
    editProfileDescription.textContent = data.about;
    closeModal(popupTypeEdit);
    buttonSave.textContent = 'Сохранить'
  })

}
