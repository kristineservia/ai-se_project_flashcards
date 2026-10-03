import { getDeckByID, fetchedDecks } from "./decks.js";
import { hexToString } from "./colors.js";
import { renderHomeView } from "./home-view.js";
import { renderDeckView } from "./deck-view.js";
import { disableSubmitBtn } from "./new-deck-view.js";
import { showError } from "./new-deck-view.js";
import { renderCarouselView } from "./carousel.js";
import { getDecks } from "./api.js";

//In index.js, #home is "targeting the element" with the id of home.
//In index.html, The href="#home" "is the link" that corresponds to the id="home"
const homeViewSection = document.querySelector("#home");
const deckViewSection = document.querySelector("#deck-view");
const newDeckViewSection = document.querySelector("#new-deck-view");
const newDeckForm = document.querySelector("#new-deck-form");
const carouselSection = document.querySelector("#carousel");
const aboutSection = document.querySelector("#about");
const notFoundSection = document.querySelector("#not-found");
const mainElement = document.querySelector(".page__main-content");
const pageElement = document.querySelector(".page");
const practiceButton = deckViewSection.querySelector(".gallery__practice-btn");

let currentDeck = null;

//NEW DECK BUTTON
const newDeckButton = document.querySelector("#home .gallery__new-card-btn");

newDeckButton.addEventListener("click", () => {
  window.location.hash = "new-deck";
});

//NEW DECK FORM --SUBMISSION BUTTON--
newDeckForm.addEventListener("submit", (event) => {
  event.preventDefault();
});

//PRACTICE BUTTON -Connection from Deck-view to Carousel-view via Practice button
practiceButton.addEventListener("click", () => {
  window.location.hash = `#carousel/${currentDeck._id}`;
});

//ENABLE SECTION VISIBILITY
/**
 * The showView() function hides all of the application's view sections, then displays the section
 * passed into the function using the supplied CSS display value of "flex" or "block".
 *
 * @param {HTMLElement} currentSection - The section to display.
 * @param {string} display - The CSS display value used to make the section visible.
 * @returns {void} The function does not return a value.
 */
function showView(currentSection, display) {
  homeViewSection.style.display = "none";
  deckViewSection.style.display = "none";
  newDeckViewSection.style.display = "none";
  carouselSection.style.display = "none";
  aboutSection.style.display = "none";
  notFoundSection.style.display = "none";

  currentSection.style.display = display;
}

// SHOW HOME SECTION
/**
 * The seeHomeView() function displays the Home view and renders the decks on it.
 *
 * @returns {void} The function does not return a value.
 *
 */
function seeHomeView() {
  showView(homeViewSection, "block");

  renderHomeView();
}

// SHOW DECK-VIEW SECTION
/**
 * The seeDeckView() function displays the Deck View section and passes the selected deck object
 * to renderDeckView() so its cards can be rendered.
 *
 * @param {Object} deck - The selected deck to display.
 * @returns {void} The function does not return a value.
 *
 */
function seeDeckView(deck) {
  showView(deckViewSection, "block");

  renderDeckView(deck);
}

// SHOW NEW-DECK-VIEW SECTION
/**
 * The seeNewDeckView() function displays the New Deck View and adjusts the page's CSS classes for that view,
 * including hiding the mobile gradient.
 *
 * @returns {void} The function does not return a value.
 *
 */
function seeNewDeckView() {
  showView(newDeckViewSection, "block");

  mainElement.classList.remove("page__main-content_type_carousel");
  mainElement.classList.add("page__main-content");

  //Hide mobile gradient on New Deck view
  pageElement.classList.add("page_no-mobile-bar");
}

// SHOW CAROUSEL SECTION
/**
 * The seeCarouselView() function displays the Carousel View and passes the selected deck object to
 * renderCarouselView() so the deck's cards can be used for practice.
 *
 * @param {Object} deck - The selected deck to display in the carousel.
 * @returns {void} The function does not return a value.
 *
 */
function seeCarouselView(deck) {
  showView(carouselSection, "flex");

  renderCarouselView(deck);
}

//SHOW ABOUT SECTION
/**
 * The seeAboutView() function displays the About View by passing aboutSection and "block" to the showView() function.
 *
 * @returns {void} The function does not have a return value.
 *
 */
function seeAboutView() {
  showView(aboutSection, "block");
}

// SHOW NOT-FOUND SECTION
/**
 * The seeNotFoundView() function displays the Not Found / 404 view and removes the normal page__main-content class
 * from the main element.
 *
 * @returns {void} The function does not return a value.
 *
 */
function seeNotFoundView() {
  showView(notFoundSection, "flex");

  mainElement.classList.remove("page__main-content");
}

//ROUTER SECTION
/**
 * The router() function reads the current hash, and handles hash changes. It determines which route the user is
 * requesting, and adjusts CSS layouts and classes per section view. For routes with a deck ID it extracts that ID
 * and retrieves the corresponding deck with the getDeckByID() function, calls the appropriate viewing section,
 * and falls back to the Not Found View if the hash doesn't match a valid route.
 *
 * @returns {void} The function does not return a value.
 *
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
    disableSubmitBtn();

    //ABOUT VIEW
  } else if (hash === "new-deck") {
    seeAboutView();
  }

  //PAGE-NOT-FOUND 404
  else {
    mainElement.classList.remove("page__main-content_type_carousel");
    mainElement.classList.remove("page__main-content");

    seeNotFoundView();
  }
}

//Fetch decks from API and store them in fetchedDecks
window.addEventListener("DOMContentLoaded", () => {
  getDecks()
    .then((decks) => {
      fetchedDecks.push(...decks);
    })
    .catch(() => {
      showError("Can't fetch the decks!");
    })
    .finally(() => {
      router();
    });
});

window.addEventListener("hashchange", router);

//TYJ!
