// @todo: Темплейт карточки

// @todo: DOM узлы

// @todo: Функция создания карточки

// @todo: Функция удаления карточки

// @todo: Вывести карточки на страницу

const placesList = document.querySelector(".places__list");

function createCard(elem, callback) {
  const cardTemplate = document.querySelector("#card-template").content;
  const cardElement = cardTemplate
    .querySelector(".places__item")
    .cloneNode(true);

  cardElement.querySelector(".card__image").src = `${elem.link}`;
  cardElement.querySelector(".card__title").textContent = `${elem.name}`;
  cardElement
    .querySelector(".card__delete-button")
    .addEventListener("click", callback);

  return cardElement;
}

initialCards.forEach( (item) => {
  const cardElement = createCard(item, (evt) => {
    const card = evt.target.closest(".card");
    card.remove();
  });
  placesList.append(cardElement);
});