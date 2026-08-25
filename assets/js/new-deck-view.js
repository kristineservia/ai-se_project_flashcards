const formElement = document.querySelector(".new-deck-view__form");
const textArea = formElement.querySelector(".new-deck-view__form-input");
const submitButton = formElement.querySelector(".new-deck-view__submit-btn");

function disableSubmitBtn() {
  submitButton.disabled = false;
}

function submitForm(event) {
  event.preventDefault();

  //new FormData() = Creates a FormData object. (event.target) = form that was submitted
  const formData = new FormData(event.target);
}

formElement.addEventListener("submit", submitForm);

export { disableSubmitBtn };
