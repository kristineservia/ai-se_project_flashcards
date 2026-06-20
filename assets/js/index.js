import { decks, getDeckByID } from "./decks.js";
import { hexToString } from "./colors.js";
import { renderCarouselView } from "./carousel.js";

//In index.js, #home is targeting the element with the id of home.
//In index.html, The href="#home" is the link that corresponds to the id="home"
const homeSection = document.querySelector("#home");
const myDeckSection = document.querySelector("#home");
// const aboutSection = document.querySelector("#about");
const carouselSection = document.querySelector("#carousel");
const notFoundSection = document.querySelector("#not-found");
const mainElement = document.querySelector(".page__main-content");

// HOME SECTION VIEW
function renderHomeView() {
  homeSection.style.display = "block";
  // aboutSection.style.display = "none";
  carouselSection.style.display = "none";
  notFoundSection.style.display = "none";

  const cardTemplate = document.querySelector(".card__list-template");

  const cardList = document.querySelector(".gallery__list");

  const newCardButton = document.querySelector(".gallery__new-card");

  cardList.innerHTML = "";

  function createCardEl(item) {
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

    cardData.addEventListener("click", () => {
      cardData.href = `#carousel/${item.id}`;
    });

    return cardEl;
  }

  function renderCardEl(item) {
    const cardEl = createCardEl(item);

    //Add the list of decks at the begining-top of the home page.
    cardList.prepend(cardEl);

    //Add the Create New Flash Card Button at the end-bottom of the list of decks
    cardList.append(newCardButton);
  }

  decks.forEach(renderCardEl);
}

// NOT FOUND SECTION VIEW
function renderNotFoundView() {
  homeSection.style.display = "none";
  // aboutSection.style.display = "none";
  carouselSection.style.display = "none";
  notFoundSection.style.display = "flex";

  mainElement.classList.remove("page__main-content");
}

/**
 * Main router function that handles hash changes.
 * Reads the current hash and renders the appropriate view.
 */
function router() {
  const hash = window.location.hash.slice(1) || "home";

  if (hash === "home" || hash === "") {
    renderHomeView();
  } else if (hash.startsWith("carousel/")) {
    //Split method turns "carousel/git-basics", from the URL, into an array split by a separator ("/")
    //The [1] targets the first index in the split array, the carousel string has zero as it's index
    const cardId = hash.split("/")[1];

    const cardLocation = getDeckByID(cardId);

    mainElement.classList.add("page__main-content_type_carousel");

    homeSection.style.display = "none";
    // aboutSection.style.display = "none";
    carouselSection.style.display = "flex";
    notFoundSection.style.display = "none";
    renderCarouselView(cardLocation);
  } else {
    renderNotFoundView();
    mainElement.classList.remove("page__main-content_type_carousel");
  }
}

window.addEventListener("DOMContentLoaded", router);
window.addEventListener("hashchange", router);

//TYJ!
