import { fetchedDecks } from "./decks.js";

const baseUrl = "https://se-flashcards-api.en.tripleten-services.com/v1";

/**
 * The processResponse() function checks if an API response was successful or not.
 * If it was successful, it converts the response body from JSON text into JavaScript data.
 * If it was unsuccessful, it returns a rejected Promise error containing the HTTP status code.
 *
 * @param {string} response - The input JSON received in the app from the API.
 * @returns {Promise} A Promise that resolves with the parsed JSON data or rejects with an error message.
 */
function processResponse(response) {
  if (response.ok) {
    return response.json();
  }
  return Promise.reject(`Error: ${response.status}`);
}

const headers = {
  "Content-Type": "application/json",
  Authorization: "01a0a2a3-7c88-71aa-b63e-3be5c9141e94",
};

/**
 * The getDecks() function requests all the saved decks from the Flash Cards API.
 * The function sends a GET request to the decks API endpoint and processes the API response.
 *
 * @returns {Promise} A Promise that resolves with the saved deck data or rejects if the request
 * is unsuccessful.
 */
function getDecks() {
  return fetch(`${baseUrl}/decks`, { headers }).then(processResponse);
}

/**
 * The addDeck() function sends a new deck's name, color, and cards to the Flash Cards API
 * so the new deck can be saved.
 *
 * @param {Object} deck - The new deck data.
 * @param {string} deck.name - The name of the new deck.
 * @param {string} deck.color - The hexadecimal color of the new deck.
 * @param {Array} deck.cards - The cards contained in the new deck.
 *
 * @returns {Promise} A Promise that resolves with the saved deck data or rejects if the request
 * is unsuccessful.
 */
function addDeck({ name, color, cards }) {
  return fetch(`${baseUrl}/decks`, {
    method: "POST",
    headers: headers,
    body: JSON.stringify({
      name,
      color,
      cards,
    }),
  }).then(processResponse);
}

function deleteDeck(deckId) {
  return fetch(`${baseUrl}/decks/${deckId}`, {
    method: "DELETE",
    headers: headers,
  }).then(processResponse);
}

export { getDecks, addDeck, deleteDeck };
