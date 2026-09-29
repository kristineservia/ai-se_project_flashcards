import { fetchedDecks } from "./decks.js";
import { hexToString } from "./colors.js";
import { renderConfirmationModal } from "./confirmation-modal.js";
import { deleteDeck } from "./api.js";
import { showError } from "./new-deck-view.js";

//CREATE THE DECK IN HOME PAGE

/**
 * The createDeckEl() function takes the deck object and creates a DOM element
 * representing that deck by cloning the HTML deck template.
 * It applies the deck's data, adds the color class needed for CSS to display
 * the correct color, adds the deck's functionality, and returns the completed deck element.
 *
 * @param {Object} deck - The deck object provided by the API.
 * @param {string} deck.name - The name of the deck.
 * @param {string} deck.color - The hexadecimal color string assigned to the deck.
 * @param {string} deck._id - The unique ID assigned to the deck by the API.
 * @param {Array} deck.cards - The array of cards contained in the deck.
 *
 * @returns {HTMLElement} The DOM element representing the deck.
 */
function createDeckEl(deck) {
  //Select the deck template.
  const deckTemplate = document.querySelector("#deck-template");

  //Clone the deck element from the HTML template.
  const deckEl = deckTemplate.content.querySelector(".card").cloneNode(true);

  //Display the 'Deck Title' on the deck.
  deckEl.querySelector(".card__title").textContent = deck.name;

  //Display the number of cards contained in the deck.
  deckEl.querySelector(".card__count").textContent =
    `${deck.cards.length} cards`;

  //Select the deck's delete button
  //Use .findIndex() and splice() to find and delete a deck, after displaying a dialog box prompt.
  //findIndex() returns the index of the 1st element found in an array, that passes the testing condition given to it.
  //splice() removes something from an array. ex) fetchedDecks.splice(1, 1) starts at index 1 and removes one element.
  const deleteButton = deckEl.querySelector(".card__btn_type_delete");

  deleteButton.addEventListener("click", () => {
    renderConfirmationModal("Delete this deck?", () => {
      deleteDeck(deck._id)
        .then(() => {
          const deckIndex = fetchedDecks.findIndex(
            (currentDeck) => currentDeck._id === deck._id,
          );
          if (deckIndex > -1) {
            fetchedDecks.splice(deckIndex, 1);
          }
          deckEl.remove();
        })
        .catch(() => {
          showError("Can't delete the deck!");
        });
    });
  });

  //Apply the deck's color class
  const color = hexToString(deck.color);
  deckEl.classList.add(`card_color_${color}`);

  //Select the link element for this deck.
  const deckLink = deckEl.querySelector(".card__link");

  //Set the deck's URL when its link is clicked.
  deckLink.addEventListener("click", () => {
    deckLink.href = `#deck-view/${deck._id}`;
  });

  //HTML/DOM Element -Cloned <li> deck.
  return deckEl;
}

//RENDER THE DECKS IN HOME VIEW PAGE
function renderHomeView() {
  //Target home view page
  const homeViewSection = document.querySelector("#home");

  //New Deck Button
  const newDeckButton = homeViewSection.querySelector(".gallery__new-card");

  //Container area where DOM Decks are rendered
  const cardListHome = document.querySelector("#home .gallery__list");

  //Clear previously rendered decks
  cardListHome.innerHTML = "";

  //Render the current decks stored in fetchedDecks
  fetchedDecks.forEach((newDeck) => {
    const deckEl = createDeckEl(newDeck);
    cardListHome.prepend(deckEl);
  });

  //Add the New Deck button at the end of the list
  cardListHome.append(newDeckButton);
}

export { renderHomeView, createDeckEl };

// TYJ!
