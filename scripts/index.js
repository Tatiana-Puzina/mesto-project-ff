// @todo: Темплейт карточки

// @todo: DOM узлы

// @todo: Функция создания карточки

// @todo: Функция удаления карточки

// @todo: Вывести карточки на страницу

const placesList = document.querySelector(".places__list");
const cardTemplate = document
  .querySelector("#card-template")
  .content.querySelector(".places__item");

function createCard(elem, onDelete) {
  const cardElement = cardTemplate.cloneNode(true);
  const cardImage = cardElement.querySelector(".card__image");

  cardImage.src = `${elem.link}`;
  cardImage.alt = `${elem.name}`;
  cardElement.querySelector(".card__title").textContent = `${elem.name}`;
  cardElement
    .querySelector(".card__delete-button")
    .addEventListener("click", onDelete);

  return cardElement;
}

initialCards.forEach((item) => {
  const cardElement = createCard(item, handleDeleteCard);
  placesList.append(cardElement);
});

function handleDeleteCard(evt) {
  const card = evt.target.closest(".card");
  card.remove();
}
