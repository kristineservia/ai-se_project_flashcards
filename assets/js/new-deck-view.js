import { fetchedDecks } from "./decks.js";
import { addDeck } from "./api.js";

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

/**
 * The normalizeColor() function takes a hexadecimal color string and verifies if it has
 * the correct format. It changes the hexadecimal color string to lowercase, and returns it
 * with a hash preceding it. A default color is returned if no color is given or string is
 * invalid.
 *
 * @param {string} color - The hexadecimal color string.
 * @returns {string} The default hexadecimal color string, or the normalized hexadecimal color string selected.
 */
function normalizeColor(color) {
  if (!color) return "#64d583";
  const hex = color.startsWith("#") ? color.slice(1) : color;
  if (!HEX_DIGITS.test(hex)) return "#64d583";
  return "#" + hex.toLowerCase();
}

/**
 * The parseJSON() function accepts a JSON-formatted string and attemps to convert it into JavaScript data.
 * If JSON.parse() fails because the string contains invalid JSON, the catch block returns null.
 *
 * @param {string} jsonString - The JSON-formatted text.
 * @returns {Object|null} The JavaScript object created from valid JSON text, or null if parsing fails.
 */
function parseJSON(jsonString) {
  try {
    return JSON.parse(jsonString);
  } catch (error) {
    return null;
  }
}

/**
 * The validateName() function checks whether the provided name is a string between 2 and 80 characters. If the name is
 * invalid, it returns null. If the name is valid, the function returns the name.
 *
 * @param {string} name - The name to validate.
 * @returns {string|null}  The validated name, or null if the name is invalid.
 */
function validateName(name) {
  if (typeof name != "string" || name.length < 2 || name.length > 80) {
    return null;
  }

  return name;
}

//NOTE: REVIEW THIS FUNCTION AFTER SUBMISSION FOR LATER REFACTOR--Disable/Enable Submit Button
// Function name says "disable", but setting disabled to false actually enables the button.
/**
 * The disableSubmitBtn() function enables the New Deck form's submit button by
 * setting its disabled property to false.
 *
 * @returns {void} The function does not return a value.
 */
function disableSubmitBtn() {
  submitButton.disabled = false;
}

/**
 * The showError() function receives a string containing an error message and displays the message
 * in the error modal when the function is called.
 *
 * @param {string} message - The error message to display in the error modal.
 * @returns {void} The function does not return a value.
 */
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

  //Step 3b-2  (Gate 4: If JSON contains a color, does it match the one on color picker?)
  if (
    typeof jsonData.color === "string" &&
    jsonData.color.toLowerCase() !== color
  ) {
    showError("JSON color must match the selected deck color");
    return;
  }

  //STEP 4a
  //Create a new deck object with the data required by the API
  const deck = {
    color: color,
    name: jsonData.name,
    cards: jsonData.cards,
  };

  //STEP 4b
  //Send the new deck to the API
  addDeck(deck)
    .then((newDeck) => {
      //Add the deck returned by the API to the fetched decks array
      fetchedDecks.push(newDeck);

      //STEP 5
      //Navigate to the new deck using the _id created by the database
      window.location.hash = "deck-view/" + newDeck._id;
    })
    .catch(showError);
}

formElement.addEventListener("submit", submitForm);

export { disableSubmitBtn, showError };

//TYJ!
