import { decks, getDeckByID } from "./decks.js";
import { hexToString } from "./colors.js";
import { renderCarouselView } from "./carousel.js";

//In index.js, #home is targeting the element with the id of home.
//In index.html, The href="#home" is the link that corresponds to the id="home"
const homeSection = document.querySelector("#home");
const myDeckSection = document.querySelector("#home");
// const aboutSection = document.querySelector("#about");
const deckViewSection = document.querySelector("#deck-view");
const carouselSection = document.querySelector("#carousel");
const notFoundSection = document.querySelector("#not-found");
const mainElement = document.querySelector(".page__main-content");

// RENDER HOME SECTION
function renderHomeView() {
  homeSection.style.display = "block";
  // aboutSection.style.display = "none";
  deckViewSection.style.display = "none";
  carouselSection.style.display = "none";
  notFoundSection.style.display = "none";

  const cardTemplate = document.querySelector(".card__list-template");

  const cardList = document.querySelector(".gallery__list");

  const newCardButton = document.querySelector(".gallery__new-card");

  cardList.innerHTML = "";
  -function createCardEl(item) {
    const cardEl = cardTemplate.content.querySelector(".card").cloneNode(true);

    cardEl.querySelector(".card__title").textContent = item.name;

    cardEl.querySelector(".card__count").textContent =
      `${item.cards.length} cards`;

    const deleteButton = cardEl.querySelector(".card__delete-btn");

    deleteButton.addEventListener("click", () => {
      cardEl.remove();
    });

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
  };

  function renderCardEl(item) {
    const cardEl = createCardEl(item);

    //Add the list of decks at the begining-top of the home page.
    cardList.prepend(cardEl);

    //Add the Create New Flash Card Button at the end-bottom of the list of decks
    cardList.append(newCardButton);
  }

  decks.forEach(renderCardEl);
}

// RENDER DECK-VIEW SECTION --NOT CAROUSEL--
function renderDeckView(deck) {
  homeSection.style.display = "none";
  // aboutSection.style.display = "none";
  deckViewSection.style.display = "block";
  carouselSection.style.display = "none";
  notFoundSection.style.display = "none";
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
