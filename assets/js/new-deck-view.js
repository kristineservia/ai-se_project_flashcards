import { decks } from "./decks.js";

const formElement = document.querySelector(".new-deck-view__form");
const textArea = formElement.querySelector(".new-deck-view__form-input");
const submitButton = formElement.querySelector(".new-deck-view__submit-btn");

const errorModal = document.querySelector("#error-modal");
const errorMessage = errorModal.querySelector(".modal__error");
const dismissButton = errorModal.querySelector(".modal__dismiss-btn");

//Provided Helper Functions
const HEX_DIGITS = /^[0-9a-fA-F]{6}$/;

//Error-Modal--Dismiss Button--Listener
dismissButton.addEventListener("click", () => {
  errorModal.classList.remove("modal_visible");
});

//URL-friendly string modification
function slugify(str) {
  return str
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

//Hex-color name modification
function normalizeColor(color) {
  if (!color) return "#64d583";
  const hex = color.startsWith("#") ? color.slice(1) : color;
  if (!HEX_DIGITS.test(hex)) return "#64d583";
  return "#" + hex.toLowerCase();
}

//LOOK-OUT FUNCTION TO STOP INCORRECT JSON INPUT IN THE FORM'S TEXT-AREA BOX
function parseJSON(jsonString) {
  try {
    return JSON.parse(jsonString);
  } catch (error) {
    return null;
  }
}

//VALIDATE NAME INPUT ON FORM
function validateName(name) {
  if (typeof name != "string" || name.length < 2 || name.length > 80) {
    return null;
  }

  return name;
}

//Disable/Enable Submit Button
function disableSubmitBtn() {
  submitButton.disabled = false;
}

//Display Error Message Function
function showError(message) {
  errorMessage.textContent = message;
  errorModal.classList.add("modal_visible");
}

function submitForm(event) {
  //STEP 1
  event.preventDefault();

  //STEP 2
  //new FormData() = Creates a FormData object. (event.target) = form that was submitted
  const formData = new FormData(event.target);

  //Turn formData into a regular object
  const formValues = Object.fromEntries(formData);

  //STEP 3a-1
  //Parse the textarea's values with JSON.parse()
  // const jsonData = JSON.parse(textArea.value); OLD METHOD
  const jsonData = parseJSON(textArea.value);

  //Step 3a-2  (Gate 1: Is text-area entry valid JSON?)
  if (jsonData === null) {
    showError("JSON parsing failed");
    return;
  }

  //Step 3a-3  (Gate 2: Is name entry valid?)
  if (validateName(jsonData.name) === null) {
    showError("Name must be a string between 2 and 80 characters");
    return;
  }

  //Step 3a-4 (Gate 3: Are the cards an array?)
  if (Array.isArray(jsonData.cards) === false) {
    showError("Cards must be an array");
    return;
  }

  //STEP 3b-1
  //Adjust hex-color input with normalizeColor()
  const color = normalizeColor(formValues.color);

  //Step 3b-2  (Gate 4: Is the color name lowercase, and from the color picker?)
  if (
    typeof jsonData.color === "string" &&
    jsonData.color.toLowerCase() !== color
  ) {
    showError("JSON color must match the selected deck color");
    return;
  }

  //STEP 3c
  //Build a unique ID using the slugify() URL-friendly deck name and Date.now()
  const id = `${slugify(jsonData.name)}-${Date.now()}`;

  //STEP 4a
  //Create new 'deck' object
  const deck = {
    id: id,
    color: color,
    name: jsonData.name,
    cards: jsonData.cards,
  };

  //STEP 4b
  //.push() the new deck object onto the imported main decks array
  decks.push(deck);

  //STEP 5
  //Navigate to the new deck by setting window.location.hash to "deck/" + id
  window.location.hash = "deck-view/" + id;
}

formElement.addEventListener("submit", submitForm);

export { disableSubmitBtn };

//TYJ!
