import { hexToString } from "./colors.js";
import { renderConfirmationModal } from "./confirmation-modal.js";

//CREATE THE CARD

/**
 *
 * @param {*} card
 * @param {*} deck
 * @returns
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
 *
 * @param {*} deck
 */
function renderDeckView(deck) {
  //Target deck view page
  const deckViewSection = document.querySelector("#deck-view");

  //Target DOM generated listed cards in the deck view page
  const cardListDeckView = document.querySelector("#deck-view .gallery__list");

  //Large Gallery Title above the cards in deck-view
  const galleryTitle = document.querySelector("#deck-view .gallery__title");
  galleryTitle.textContent = deck.name;

  //New Card Button
  const newCardButton = deckViewSection.querySelector(".gallery__new-card-btn");

  //innerHTML assigned to an empty string, attached to cardList, clears the gallery list before adding new cards.
  cardListDeckView.innerHTML = "";

  //The cards property inside the decks object can be accessed through dot notation.
  //Loop for each card rendered from the decks object.
  deck.cards.forEach((card) => {
    const cardEl = createCardEl(card, deck);

    //Card color assignment by targeting the deck to (card) color
    const color = hexToString(deck.color);
    cardEl.classList.add(`card_color_${color}`); //This color style is in card.css

    cardListDeckView.prepend(cardEl);
  });

  //Add the New Card Button at the end-bottom of the list of decks
  cardListDeckView.append(newCardButton);
}

export { renderDeckView };

// TYJ!
