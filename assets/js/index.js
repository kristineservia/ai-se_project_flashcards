import { decks, getDeckByID } from "./decks.js";
import { hexToString } from "./colors.js";
import { renderCarouselView } from "./carousel.js";
import { renderDeckView } from "./deck-view.js";

//In index.js, #home is "targeting the element" with the id of home.
//In index.html, The href="#home" "is the link" that corresponds to the id="home"
const homeViewSection = document.querySelector("#home");
// const myDeckSection = document.querySelector("#home");
// const aboutSection = document.querySelector("#about");
const deckViewSection = document.querySelector("#deck-view");
const carouselSection = document.querySelector("#carousel");
const notFoundSection = document.querySelector("#not-found");
const mainElement = document.querySelector(".page__main-content");
const practiceButton = deckViewSection.querySelector(".gallery__practice-btn");
let currentDeck = null;

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

  //Delete Button Function
  const deleteButton = cardEl.querySelector(".card__btn_type_delete");
  deleteButton.addEventListener("click", () => {
    cardEl.remove();
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

//PRACTICE BUTTON -Connection from Deck-view to Carousel-view via Practice button
practiceButton.addEventListener("click", () => {
  window.location.hash = `#carousel/${currentDeck.id}`;
});

function showView(currentSection, display) {
  homeViewSection.style.display = "none";
  deckViewSection.style.display = "none";
  carouselSection.style.display = "none";
  notFoundSection.style.display = "none";

  currentSection.style.display = display;
}

// SHOW HOME SECTION
function seeHomeView() {
  showView(homeViewSection, "block");

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

// SHOW DECK-VIEW SECTION
function seeDeckView(deck) {
  showView(deckViewSection, "block");

  renderDeckView(deck);
}

// SHOW CAROUSEL SECTION
function seeCarouselView(deck) {
  showView(carouselSection, "flex");

  renderCarouselView(deck);
}

// SHOW NOT-FOUND SECTION
function seeNotFoundView() {
  showView(notFoundSection, "flex");

  mainElement.classList.remove("page__main-content");
}

/**
 * ROUTER SECTION
 * Main router function that handles hash changes.
 * Reads the current hash and renders the appropriate view.
 */
function router() {
  const hash = window.location.hash.slice(1) || "home";

  //HOME-VIEW
  if (hash === "home" || hash === "") {
    mainElement.classList.remove("page__main-content_type_carousel");
    mainElement.classList.add("page__main-content");

    //Display linear gradient style behind mobile-bar in home view
    mainElement.classList.remove("page_no-mobile-bar");

    seeHomeView();

    //CAROUSEL-VIEW
  } else if (hash.startsWith("carousel/")) {
    mainElement.classList.remove("page__main-content");
    mainElement.classList.add("page__main-content_type_carousel");

    //Delete linear gradient style behind mobile-bar
    mainElement.classList.add("page_no-mobile-bar");

    //Split method turns "carousel/git-basics", from the URL, into an array split by a separator ("/")
    //The [1] targets the first index in the split array, the carousel string is index zero [0]
    const cardId = hash.split("/")[1];

    const cardLocation = getDeckByID(cardId);

    seeCarouselView(cardLocation);

    //DECK-VIEW
  } else if (hash.startsWith("deck-view/")) {
    mainElement.classList.remove("page__main-content_type_carousel");
    mainElement.classList.add("page__main-content");

    //Display linear gradient style behind mobile-bar in deck view
    mainElement.classList.remove("page_no-mobile-bar");

    //Split method turns "deck-view/git-basics", from the URL, into an array split by a separator ("/")
    //The [1] targets the first index in the split array, the carousel string is index zero [0]
    const cardId = hash.split("/")[1];

    const cardLocation = getDeckByID(cardId);

    seeDeckView(cardLocation);

    //Update currentDeck with the new deck just loaded
    currentDeck = cardLocation;

    //PAGE-NOT-FOUND 404
  } else {
    mainElement.classList.remove("page__main-content_type_carousel");
    mainElement.classList.remove("page__main-content");

    seeNotFoundView();
  }
}

window.addEventListener("DOMContentLoaded", router);
window.addEventListener("hashchange", router);

//TYJ!
