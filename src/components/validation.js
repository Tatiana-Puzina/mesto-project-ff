//Валидация инпутов

const showInputError = (
  formElement,
  inputElement,
  errorMessage,
  validationConfig
) => {
  const inputError = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.add(validationConfig.inputErrorClass);
  inputError.textContent = errorMessage;
};

const hideInputError = (formElement, inputElement, validationConfig) => {
  const inputError = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.remove(validationConfig.inputErrorClass);
  inputError.textContent = "";
};

const isValid = (formElement, inputElement, validationConfig) => {
  const regExp = validationConfig.regExp;
  const valid = inputElement.classList.contains(
    validationConfig.customValidation
  )
    ? regExp.test(inputElement.value)
    : inputElement.validity.valid;
  const validationMessage = inputElement.classList.contains(
    validationConfig.customValidation
  )
    ? inputElement.dataset.error
    : inputElement.validationMessage;
  if (!valid) {
    showInputError(
      formElement,
      inputElement,
      validationMessage,
      validationConfig
    );
  } else {
    hideInputError(formElement, inputElement, validationConfig);
  }
};

const toggleButtonState = (inputList, buttonElement, validationConfig) => {
  let valid = true;
  inputList.forEach((inputElement) => {
    if (valid) {
      if (inputElement.classList.contains(validationConfig.customValidation)) {
        valid = validationConfig.regExp.test(inputElement.value);
      } else {
        valid = inputElement.validity.valid;
      }
    }
  });
  if (!valid) {
    buttonElement.disabled = true;
    buttonElement.classList.add(validationConfig.inactiveButtonClass);
  } else {
    buttonElement.disabled = false;
    buttonElement.classList.remove(validationConfig.inactiveButtonClass);
  }
};

export const enableValidation = (validationConfig) => {
  const formList = Array.from(
    document.querySelectorAll(validationConfig.formSelector)
  );
  formList.forEach((formElement) => {
    const inputList = Array.from(
      formElement.querySelectorAll(validationConfig.inputSelector)
    );
    const buttonElement = formElement.querySelector(
      validationConfig.submitButtonSelector
    );
    toggleButtonState(inputList, buttonElement, validationConfig);
    inputList.forEach((inputElement) => {
      inputElement.addEventListener("input", () => {
        isValid(formElement, inputElement, validationConfig);
        toggleButtonState(inputList, buttonElement, validationConfig);
      });
    });
  });
};

export const clearValidation = (profileForm, validationConfig) => {
  const inputList = Array.from(
    profileForm.querySelectorAll(validationConfig.inputSelector)
  );
  const buttonElement = profileForm.querySelector(
    validationConfig.submitButtonSelector
  );
  toggleButtonState(inputList, buttonElement, validationConfig);
  inputList.forEach((inputElement) => {
    if (validationConfig.data.hasOwnProperty(inputElement.name)) {
      inputElement.value = validationConfig.data[inputElement.name];
    }
  });
};
