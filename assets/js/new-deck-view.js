const formElement = document.querySelector(".new-deck-view__form");
const textArea = formElement.querySelector(".new-deck-view__form-input");
const submitButton = formElement.querySelector(".new-deck-view__submit-btn");

function disableSubmitBtn() {
  submitButton.disabled = false;
}

export { disableSubmitBtn };
