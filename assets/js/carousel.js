import { hexToString, removeColorClasses } from "./colors.js";
import { decks } from "./decks.js";

function renderCarouselView(deck) {
  let currentIndex = 0;
  let showingQuestion = true;

  const carouselEl = document.querySelector(".carousel");
  const carouselCardEl = document.querySelector(".carousel__card");
  const carouselButton = document.querySelector(".carousel__btn");

  let leftBtn = carouselEl.querySelector(".carousel__btn_type_left");
  let rightBtn = carouselEl.querySelector(".carousel__btn_type_right");
  let flipBtn = carouselEl.querySelector(".carousel__btn_type_flip");

  //Method replaceWith(), used to clear up "old clicks on event listeners" for buttons.
  leftBtn.replaceWith(leftBtn.cloneNode(true));
  rightBtn.replaceWith(rightBtn.cloneNode(true));
  flipBtn.replaceWith(flipBtn.cloneNode(true));

  leftBtn = carouselEl.querySelector(".carousel__btn_type_left");
  rightBtn = carouselEl.querySelector(".carousel__btn_type_right");
  flipBtn = carouselEl.querySelector(".carousel__btn_type_flip");

  const carouselTitle = carouselEl.querySelector(".carousel__title");
  const carouselCardTitle = carouselEl.querySelector(".carousel__card-title");
  const carouselCardText = carouselEl.querySelector(".carousel__card-text");

  function disableButton(buttonEl) {
    buttonEl.classList.add("carousel__btn_disabled");
    buttonEl.carousel__card_disabled = true;
  }

  function enableButton(buttonEl) {
    buttonEl.classList.remove("carousel__btn_disabled");
    buttonEl.removeAttribute("disabled");
  }

  function updateArrows(buttonEl) {
    if (currentIndex === 0 || currentIndex === deck.cards.length - 1) {
      disableButton(buttonEl);
    }

    if (currentIndex > 0 || currentIndex < deck.cards.length - 1) {
      enableButton(buttonEl);
    }
  }

  function getCarouselTitleString(deck, currentIndex) {
    return `${deck.name} \u00B7 ${currentIndex + 1} / ${deck.cards.length} cards`;
  }

  // Deck Card Connection by Id
  function updateDisplay() {
    //Step 1: Get currentCard to display
    const currentCard = deck.cards[currentIndex];

    //Step 2: Display Flash Card deck information in Carousel. Connect deck to carousel.
    currentCard.question;
    currentCard.answer;
    // deck.cards[currentIndex].question;
    // deck.cards[currentIndex].answer;

    //Step 3: Set section title (NEW- add this line)
    carouselTitle.textContent = getCarouselTitleString(deck, currentIndex);

    //Step 4: Clean slate - remove any existing color modifiers.
    removeColorClasses(carouselCardEl);

    //Step 5: Set the new color
    const colorName = hexToString(deck.color);
    carouselCardEl.classList.add(
      `carousel__card_color_${hexToString(deck.color)}`,
    );

    //Step 6: Toggle between showing the question in the deck color, and showing the answer in white color card.
    if (showingQuestion === true) {
      carouselCardText.textContent = currentCard.question;
      carouselCardEl.classList.remove("carousel__card_color_white");
    } else if (showingQuestion === false) {
      carouselCardText.textContent = currentCard.answer;
      carouselCardEl.classList.add("carousel__card_color_white");
    }

    //Step 7. Button functions called inside updateDisplay() to disable or enable them based on conditions.
    if (currentIndex === 0) {
      disableButton(leftBtn);
    } else {
      enableButton(leftBtn);
    }

    if (currentIndex === deck.cards.length - 1) {
      disableButton(rightBtn);
    } else {
      enableButton(rightBtn);
    }
  }

  //Step 8: Button Click Event Handlers for Left, Right, and Flip buttons
  rightBtn.addEventListener("click", () => {
    if (currentIndex < deck.cards.length - 1) {
      currentIndex++;
    } else if (currentIndex === deck.cards.length - 1) {
      updateDisplay();
    }
    showingQuestion = true; //When I click on arrow it goes back to question with assignment operator
    updateDisplay();
  });

  leftBtn.addEventListener("click", () => {
    if (currentIndex > 0) {
      currentIndex--;
      showingQuestion = true;
      updateDisplay();
    }
  });

  flipBtn.addEventListener("click", () => {
    showingQuestion = !showingQuestion;
    updateDisplay();
  });

  updateDisplay();
}

export { renderCarouselView };

//TYJ!
