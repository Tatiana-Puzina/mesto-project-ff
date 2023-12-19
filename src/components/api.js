const config = {
  baseUrl: "https://nomoreparties.co/v1/wff-cohort-2",
  headers: {
    authorization: "5b21a986-ef5a-4081-8c45-253307a18f95",
    "Content-Type": "application/json",
  },
};

function isProcessingRequest(res) {
  if (res.ok) {
    return res.json();
  }
  return Promise.reject(`Ошибка: ${res.status}`);
}
// обновить фото профиля
export const patchAvatarUrl = (urlLink) => {
  return fetch(`${config.baseUrl}/users/me/avatar`, {
    method: "PATCH",
    headers: config.headers,
    body: JSON.stringify({
      avatar: urlLink,
    }),
  }).then((res) => {
    return isProcessingRequest(res);
  });
};
// сохранить новую карточку
export const postNewCard = (popupInputCardName, popupInputUrl) => {
  return fetch(`${config.baseUrl}/cards`, {
    method: "POST",
    headers: config.headers,
    body: JSON.stringify({
      name: popupInputCardName,
      link: popupInputUrl,
    }),
  }).then((res) => {
    return isProcessingRequest(res);
  });
};
// запрос данных пользователя

export const getInitialUser = () => {
  return fetch(`${config.baseUrl}/users/me`, {
    method: "GET",
    headers: config.headers,
  }).then((res) => {
    return isProcessingRequest(res);
  });
};

// запрос всех карточек
export const getInitialCards = () => {
  return fetch(`${config.baseUrl}/cards`, {
    method: "GET",
    headers: config.headers,
  }).then((res) => {
    return isProcessingRequest(res);
  });
};
// удаление карты
export const deleteCard = (cardId) => {
  return fetch(`${config.baseUrl}/cards/${cardId}`, {
    method: "DELETE",
    headers: config.headers,
  }).then((res) => {
    return isProcessingRequest(res);
  });
};

//Редактирование профиля
export const patchProfile = (nameInput, jobInput) => {
  return fetch(`${config.baseUrl}/users/me`, {
    method: "PATCH",
    headers: config.headers,
    body: JSON.stringify({
      name: nameInput,
      about: jobInput,
    }),
  }).then((res) => {
    return isProcessingRequest(res);
  });
};

//unlike
export const deleteLike = (cardId) => {
  return fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
    method: "DELETE",
    headers: config.headers,
  }).then((res) => {
    return isProcessingRequest(res);
  });
};
// Like
export const putLike = (cardId) => {
  return fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
    method: "PUT",
    headers: config.headers,
  }).then((res) => {
    return isProcessingRequest(res);
  });
};
