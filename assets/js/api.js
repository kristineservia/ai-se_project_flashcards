import { fetchedDecks } from "./decks";

const baseUrl = "https://se-flashcards-api.en.tripleten-services.com/v1";

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

function getDecks() {
  return fetch(`${baseUrl}/decks`, { headers }).then(processResponse);
}

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
