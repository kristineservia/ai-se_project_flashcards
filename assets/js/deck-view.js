import { hexToString } from "./colors.js";
import { renderConfirmationModal } from "./confirmation-modal.js";

//CREATE THE CARD
function createCardEl(card, deck) {
  let showingQuestion = true;

  //Connecting the Card Template to the DOM and assigning it to cardTemplate.
  const cardTemplate = document.querySelector("#card-template");

  //Creating a clone of the card to form a deck
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

  //DELETE BUTTON FUNCTION  (Help source: ChatGPT)
  //Use .findIndex() and splice() to find and delete an item, after a dialog box prompt.
  //findIndex() returns the index of the 1st element found in an array, that passes the testing condition given to it.
  //It uses a callback function, ex) const indeX = deck.cards.findIndex((item) => item.id === card.id)
  //splice() removes something from an array. ex) deck.cards.splice(1, 1) splice(start at index 1, remove index 1)
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

//RENDER THE DECK VIEW (10 CARDS DISPLAYED)
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
