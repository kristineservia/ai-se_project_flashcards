const formElement = document.querySelector(".new-deck-view__form");
const textArea = formElement.querySelector(".new-deck-view__form-input");
const submitButton = formElement.querySelector(".new-deck-view__submit-btn");

//Provided Helper Functions
const HEX_DIGITS = /^[0-9a-fA-F]{6}$/;

function slugify(str) {
  return str
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function normalizeColor(color) {
  if (!color) return "#64d583";
  const hex = color.startsWith("#") ? color.slice(1) : color;
  if (!HEX_DIGITS.test(hex)) return "#64d583";
  return "#" + hex.toLowerCase();
}

//Disable/Enable Submit Button
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

  //Adjust hex-color input with normalizeColor()
  const color = normalizeColor(formValues.color);

  //Adjust valid string input entries in Text Area with slugify()
  const id = `${slugify(jsonData.name)}-${Date.now()}`;
}

formElement.addEventListener("submit", submitForm);

export { disableSubmitBtn };
