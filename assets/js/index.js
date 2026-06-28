import { decks, getDeckByID } from "./decks.js";
import { hexToString } from "./colors.js";
import { renderCarouselView } from "./carousel.js";

//In index.js, #home is "targeting the element" with the id of home.
//In index.html, The href="#home" "is the link" that corresponds to the id="home"
const homeSection = document.querySelector("#home");
const myDeckSection = document.querySelector("#home");
// const aboutSection = document.querySelector("#about");
const deckViewSection = document.querySelector("#deck-view");
const carouselSection = document.querySelector("#carousel");
const notFoundSection = document.querySelector("#not-found");
const mainElement = document.querySelector(".page__main-content");
const cardList = document.querySelector(".gallery__list");

//CREATE THE CARD
function createCardEl(card) {
  //Connecting the Card Template to the DOM and assigning it to cardTemplate.
  const cardTemplate = document.querySelector("#card-template");

  //Creating a clone of the card to form a deck
  const cardEl = cardTemplate.content.querySelector(".card").cloneNode(true);

  //Assigning each card in a deck their corresponding title
  cardEl.querySelector(".card__title").textContent = card.name;

  //Flip Button Function
  const flipBtn = cardEl.querySelector(".card__flip-btn");
  flipBtn.addEventListener("click", () => {
    showingQuestion = !showingQuestion;
    updateDisplay();
  });

  //Delete Button Function
  const deleteButton = cardEl.querySelector(".card__delete-btn");
  deleteButton.addEventListener("click", () => {
    cardEl.remove();
  });

  //Decks color assignment
  const color = hexToString(card.color);
  cardEl.classList.add(`card_color_${color}`);

  return cardEl;
}

//CREATE THE DECK
function createDeckEl(item) {
  //Connecting to template of the list of cards and assigning it to cardTemplate
  const cardTemplate = document.querySelector(".card__list-template");

  //Creating a clone of the card to form a deck
  const cardEl = cardTemplate.content.querySelector(".card").cloneNode(true);

  //Assigning each card in a deck their corresponding title
  cardEl.querySelector(".card__title").textContent = item.name;

  //Assigning each card in a deck the text "10 cards" num of cards == length of array
  cardEl.querySelector(".card__count").textContent =
    `${item.cards.length} cards`;

  //Delete Button Function
  const deleteButton = cardEl.querySelector(".card__delete-btn");
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

//RENDER THE DECK
function renderDeckEl(item) {
  //Call createDeckEl() function, pass it "item", and assign it to deckEl
  const deckEl = createDeckEl(item);

  //New Card Button
  const newDeckButton = document.querySelector(".gallery__new-card-btn");

  //Add the list of decks at the begining-top of the home page.
  cardList.prepend(deckEl);
}

//RENDER A CARD
function renderCardEl(card) {
  //Call createCardEl() function, pass it "card", and assign it to cardEl
  const cardEl = createCardEl(card);

  //New Card Button
  // const newCardButton = document.querySelector(".gallery__new-card-btn");

  //Add the list of decks at the begining-top of the home page.
  cardList.prepend(cardEl);
}

// RENDER HOME SECTION
function renderHomeView() {
  homeSection.style.display = "block";
  // aboutSection.style.display = "none";
  deckViewSection.style.display = "none";
  carouselSection.style.display = "none";
  notFoundSection.style.display = "none";

  //innerHTML assigned to an empty string, attached to cardList, clears the gallery list before adding new cards.
  cardList.innerHTML = "";

  //Loop for each deck rendered from the decks object.
  decks.forEach(renderDeckEl);

  //New Deck Button
  // const newDeckButton = document.querySelector(".gallery__new-card");

  //Add the New Card Button at the end-bottom of the list of decks
  cardList.append(newDeckButton);
}

// RENDER DECK-VIEW SECTION --NOT CAROUSEL--
function renderDeckView(deck) {
  homeSection.style.display = "none";
  // aboutSection.style.display = "none";
  deckViewSection.style.display = "block";
  carouselSection.style.display = "none";
  notFoundSection.style.display = "none";

  //innerHTML assigned to an empty string, attached to cardList, clears the gallery list before adding new cards.
  cardList.innerHTML = "";

  //The cards property inside the decks object can be accessed through dot notation.
  //Loop for each card rendered from the decks object.
  deck.cards.forEach(renderCardEl);

  //New Card Button
  const newCardButton = document.querySelector(".gallery__new-card-btn");

  //Add the New Card Button at the end-bottom of the list of decks
  cardList.append(newCardButton);
}

// RENDER CAROUSEL SECTION
function renderCarouselSection(deck) {
  homeSection.style.display = "none";
  // aboutSection.style.display = "none";
  deckViewSection.style.display = "none";
  carouselSection.style.display = "flex";
  notFoundSection.style.display = "none";

  renderCarouselView(deck);
}

// RENDER NOT-FOUND SECTION
function renderNotFoundView() {
  homeSection.style.display = "none";
  // aboutSection.style.display = "none";
  deckViewSection.style.display = "none";
  carouselSection.style.display = "none";
  notFoundSection.style.display = "flex";

  mainElement.classList.remove("page__main-content");
}

/**
 * ROUTER SECTION
 * Main router function that handles hash changes.
 * Reads the current hash and renders the appropriate view.
 */
function router() {
  const hash = window.location.hash.slice(1) || "home";

  if (hash === "home" || hash === "") {
    mainElement.classList.remove("page__main-content_type_carousel");
    mainElement.classList.add("page__main-content");

    //Render Home Page Section
    renderHomeView();
  } else if (hash.startsWith("carousel/")) {
    mainElement.classList.remove("page__main-content");
    mainElement.classList.add("page__main-content_type_carousel");

    //Split method turns "carousel/git-basics", from the URL, into an array split by a separator ("/")
    //The [1] targets the first index in the split array, the carousel string is index zero [0]
    const cardId = hash.split("/")[1];

    const cardLocation = getDeckByID(cardId);

    //Render Carousel Section
    renderCarouselSection(cardLocation);
  } else if (hash.startsWith("deck-view/")) {
    mainElement.classList.remove("page__main-content_type_carousel");
    mainElement.classList.add("page__main-content");

    //Split method turns "deck-view/git-basics", from the URL, into an array split by a separator ("/")
    //The [1] targets the first index in the split array, the carousel string is index zero [0]
    const cardId = hash.split("/")[1];

    const cardLocation = getDeckByID(cardId);

    //Render Deck View Section
    renderDeckView(cardLocation);
  } else {
    mainElement.classList.remove("page__main-content_type_carousel");
    mainElement.classList.remove("page__main-content");

    //Render "404 Not Found" Section
    renderNotFoundView();
  }
}

window.addEventListener("DOMContentLoaded", router);
window.addEventListener("hashchange", router);

//TYJ!
