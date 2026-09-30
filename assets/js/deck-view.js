import { hexToString } from "./colors.js";
import { renderConfirmationModal } from "./confirmation-modal.js";

//CREATE THE CARD

/**
 * The createCardEl() function uses the HTML card template to create one card DOM element, adds the question and answer data
 * to the card DOM element, applies the card flip functionality, and applies the delete card functionality.
 *
 * @param {Object} card - The card data used to create the card element.
 * @param {string} card.id - The unique ID of the card.
 * @param {string} card.question - The question displayed on the card.
 * @param {string} card.answer - The answer displayed when the card is flipped.
 *
 * @param {Object} deck - The deck object containing the card.
 * @param {Array} deck.cards - The array of cards contained in the deck.
 *
 * @returns {HTMLElement} The DOM element representing the card.
 */

function createCardEl(card, deck) {
  let showingQuestion = true;

  //Connecting the Card Template to the DOM and assigning it to cardTemplate.
  const cardTemplate = document.querySelector("#card-template");

  //Clone the card element from the HTML template.
  const cardEl = cardTemplate.content.querySelector(".card").cloneNode(true);

  //Card Question displayed on card in deck-view
  const cardContent = cardEl.querySelector(".card__data");
  cardContent.textContent = card.question;

  //Flip Button Function
  const flipBtn = cardEl.querySelector(".card__btn_type_flip");

  flipBtn.addEventListener("click", () => {
    showingQuestion = !showingQuestion;

    //Toggle between showing the question, and showing the answer in white color card.
    if (showingQuestion === true) {
      cardContent.textContent = card.question;
      cardEl.classList.remove("card_color_white");
    } else if (showingQuestion === false) {
      cardContent.textContent = card.answer;
      cardEl.classList.add("card_color_white");
    }
  });

  //DELETE BUTTON EVENT  (Help source: ChatGPT)
  //findIndex() returns the index of the first array element for which the callback condition returns true.
  //If none is found, it returns -1.
  //splice() removes elements from the array. ex) array.splice(1, 1) splice(which index to start at, how many elements to remove)

  //Note: findIndex() Finds the index of the first card whose ID matches this card's ID.
  //If an index was found ( > -1), start at that index and remove 1 element.
  const deleteButton = cardEl.querySelector(".card__btn_type_delete");

  deleteButton.addEventListener("click", () => {
    renderConfirmationModal("Delete this card?", () => {
      const cardIndex = deck.cards.findIndex(
        (currentCard) => currentCard.id === card.id,
      );

      if (cardIndex > -1) {
        deck.cards.splice(cardIndex, 1);
      }

      cardEl.remove();
    });
  });

  return cardEl;
}

//RENDER THE CARDS IN THE DECK VIEW

/**
 * The renderDeckView() function renders the card DOM elements for the selected deck in the Deck View. It displays the
 * deck's name as the gallery title, clears previously rendered cards to prevent duplicates, creates and inserts a DOM
 * element for each card, applies the deck's color class to each card, and adds the New Card button at the end of the card list.
 *
 * The renderDeckView() function targets the deck view and renders the card DOM elements to be displayed in the deck view,
 * it applies the gallery title of the deck being viewed, applies a new card button at the end of the cards listed,
 * clears any previous rendering of cards to eliminate duplicate cards, and applies the color class corresponding to the deck.
 *
 * @param {Object} deck - The deck of cards to render.
 * @param {string} deck.name - The name of the deck displayed as the gallery title.
 * @param {string} deck.color - The hexadecimal color string assigned to the deck.
 * @param {Array} deck.cards - The array of cards contained in the deck.
 *
 * @returns {void} The function does not return a value.
 *
 */
function renderDeckView(deck) {
  //Target deck view page
  const deckViewSection = document.querySelector("#deck-view");

  //Select the container where the card elements will be rendered.
  const cardListDeckView = document.querySelector("#deck-view .gallery__list");

  //Display the deck's name as the Deck View title.
  const galleryTitle = document.querySelector("#deck-view .gallery__title");
  galleryTitle.textContent = deck.name;

  //Select the New Card button.
  const newCardButton = deckViewSection.querySelector(".gallery__new-card-btn");

  //Clear previously rendered cards before rendering the current deck.
  cardListDeckView.innerHTML = "";

  //The cards property inside the decks object can be accessed through dot notation.
  //Loop through the cards in the deck and create a DOM element for each card.
  deck.cards.forEach((card) => {
    const cardEl = createCardEl(card, deck);

    //Apply the deck's color class to the card element.
    const color = hexToString(deck.color);
    cardEl.classList.add(`card_color_${color}`); //This color style is in card.css

    //Insert the card element into the Deck View list.
    cardListDeckView.prepend(cardEl);
  });

  //Add the New Card Button at the end of the card list.
  cardListDeckView.append(newCardButton);
}

export { renderDeckView };

// TYJ!
