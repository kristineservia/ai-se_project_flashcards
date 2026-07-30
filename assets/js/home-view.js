import { decks, getDeckByID } from "./decks.js";
import { hexToString } from "./colors.js";
import { renderConfirmationModal } from "./confirmation-modal.js";

//CREATE THE DECK
function createDeckEl(item) {
  //Connecting to template of the list of cards and assigning it to cardTemplate
  const cardTemplate = document.querySelector("#deck-template");

  //Creating a clone of the card to form a deck
  const cardEl = cardTemplate.content.querySelector(".card").cloneNode(true);

  //Large Deck Title displaying at the top of home page
  cardEl.querySelector(".card__title").textContent = item.name;

  //Assigning each card in a deck the text "10 cards" num of cards == length of array
  cardEl.querySelector(".card__count").textContent =
    `${item.cards.length} cards`;

  //Delete Button Function ORIGINAL CODE
  // const deleteButton = cardEl.querySelector(".card__btn_type_delete");
  // deleteButton.addEventListener("click", () => {
  //   cardEl.remove();
  // });

  //Delete Button Function NEW CODE (Source Help: ChatGPT)
  //async (new key term)
  //await (new key term)
  const deleteButton = cardEl.querySelector(".card__btn_type_delete");

  deleteButton.addEventListener("click", async () => {
    const confirmed = await renderConfirmationModal(
      "Are you sure you want to delete this deck?",
    );
    if (confirmed) {
      cardEl.remove();
    }
  });

  //Decks color assignment
  const color = hexToString(item.color);
  cardEl.classList.add(`card_color_${color}`);

  //Setting the URL to index.html#carousel/item.id (from decks)
  const cardData = cardEl.querySelector(".card__link");

  //cardData event listener explanation notes:
  //cardData is the variable that holds the anchor <a> element with the class="card__link" -Dot
  //.addEventListerner("click", () => {...}) This says:"When user clicks on this link, run this function"-Dot
  //cardData.href = '#carousel/${item.id}' "when click occurs, listener dynamically sets href to target #carousel/git-basics, for example" -Dot
  //cardData.href will be reassigned to target the #deck-view directly, not the #carousel
  cardData.addEventListener("click", () => {
    cardData.href = `#deck-view/${item.id}`;
  });

  return cardEl;
}

//RENDER THE DECKS IN HOME VIEW PAGE
function renderHomeView(item) {
  //Target home view page
  const homeViewSection = document.querySelector("#home");

  //New Deck Button
  const newDeckButton = homeViewSection.querySelector(".gallery__new-card");

  //Container area where DOM Decks are rendered
  const cardListHome = document.querySelector("#home .gallery__list");

  //innerHTML assigned to an empty string, clears the gallery list before adding new cards.
  cardListHome.innerHTML = "";

  //Loop for each deck rendered from the decks object.
  decks.forEach((item) => {
    const deckEl = createDeckEl(item);
    cardListHome.prepend(deckEl);
  });

  //Add the New Card Button at the end-bottom of the list of decks
  cardListHome.append(newDeckButton);
}

export { renderHomeView };

// TYJ!
