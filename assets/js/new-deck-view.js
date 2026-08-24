// import { seeNewDeckView } from "./index.js";

const formElement = document.querySelector(".new-deck-view__form");
const textArea = formElement.querySelector(".new-deck-view__form-input");
const submitButton = formElement.querySelector(".new-deck-view__submit-btn");

function disableSubmitBtn() {
  submitButton.disabled = false;
  mainElement.classList.remove("new-deck-view__submit-btn:disabled");
}

export { disableSubmitBtn };
