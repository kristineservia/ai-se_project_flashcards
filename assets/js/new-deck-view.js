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

  //Turn formData into a regular object
  const formValues = Object.fromEntries(formData);

  //Parse the textarea's values with JSON.parse()
  const jsonData = JSON.parse(textArea.value);
}

formElement.addEventListener("submit", submitForm);

export { disableSubmitBtn };
