import { decks, getDeckByID } from "./decks.js";
import { hexToString } from "./colors.js";
import { renderHomeView } from "./home-view.js";
import { renderDeckView } from "./deck-view.js";
import { renderCarouselView } from "./carousel.js";

//In index.js, #home is "targeting the element" with the id of home.
//In index.html, The href="#home" "is the link" that corresponds to the id="home"
const homeViewSection = document.querySelector("#home");
const deckViewSection = document.querySelector("#deck-view");
const newDeckViewSection = document.querySelector("#new-deck-view");
const newDeckForm = document.querySelector("#new-deck-form");
const carouselSection = document.querySelector("#carousel");
// const aboutSection = document.querySelector("#about");
const notFoundSection = document.querySelector("#not-found");
const mainElement = document.querySelector(".page__main-content");
const pageElement = document.querySelector(".page");
const practiceButton = deckViewSection.querySelector(".gallery__practice-btn");

let currentDeck = null;

//NEW DECK BUTTON
const newDeckButton = document.querySelector("#home .gallery__new-card-btn");

newDeckButton.addEventListener("click", () => {
  window.location.hash = "new-deck-view";
});

//NEW DECK FORM --SUBMISSION BUTTON--
newDeckForm.addEventListener("submit", (event) => {
  event.preventDefault();
});

//PRACTICE BUTTON -Connection from Deck-view to Carousel-view via Practice button
practiceButton.addEventListener("click", () => {
  window.location.hash = `#carousel/${currentDeck.id}`;
});

//ENABLE SECTION VISIBILITY
function showView(currentSection, display) {
  homeViewSection.style.display = "none";
  deckViewSection.style.display = "none";
  newDeckViewSection.style.display = "none";
  carouselSection.style.display = "none";
  notFoundSection.style.display = "none";

  currentSection.style.display = display;
}

// SHOW HOME SECTION
function seeHomeView() {
  showView(homeViewSection, "block");

  renderHomeView();
}

// SHOW DECK-VIEW SECTION
function seeDeckView(deck) {
  showView(deckViewSection, "block");

  renderDeckView(deck);
}

// SHOW NEW-DECK-VIEW SECTION
function seeNewDeckView() {
  showView(newDeckViewSection, "block");

  mainElement.classList.remove("page__main-content_type_carousel");
  mainElement.classList.add("page__main-content");

  //Hide mobile gradient on New Deck view
  pageElement.classList.add("page_no-mobile-bar");
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
    pageElement.classList.remove("page_no-mobile-bar");

    seeHomeView();

    //CAROUSEL-VIEW
  } else if (hash.startsWith("carousel/")) {
    mainElement.classList.remove("page__main-content");
    mainElement.classList.add("page__main-content_type_carousel");

    //Delete linear gradient style behind mobile-bar
    pageElement.classList.add("page_no-mobile-bar");

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
    pageElement.classList.remove("page_no-mobile-bar");

    //Split method turns "deck-view/git-basics", from the URL, into an array split by a separator ("/")
    //The [1] targets the first index in the split array, the carousel string is index zero [0]
    const cardId = hash.split("/")[1];

    const cardLocation = getDeckByID(cardId);

    seeDeckView(cardLocation);

    //Update currentDeck with the new deck just loaded
    currentDeck = cardLocation;

    //NEW-DECK-VIEW
  } else if (hash === "new-deck-view") {
    seeNewDeckView();
  }

  //PAGE-NOT-FOUND 404
  else {
    mainElement.classList.remove("page__main-content_type_carousel");
    mainElement.classList.remove("page__main-content");

    seeNotFoundView();
  }
}

window.addEventListener("DOMContentLoaded", router);
window.addEventListener("hashchange", router);

//TYJ!
