import { hexToString, removeColorClasses } from "./colors.js";

/**
 * The renderCarouselView() function renders and controls the Carousel/Practice view for the selected deck. It displays one card
 * at a time and lets the user navigate through the cards and flip between each card's question and answer.
 *
 * @param {Object} deck - The deck received by the API.
 * @param {string} deck.name - The name of the deck.
 * @param {string} deck.color - The hexadecimal color string assigned to the deck.
 * @param {Array} deck.cards - The array of cards in a deck.
 *
 * @returns {void} The function does not return a value.
 *
 */
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

  /**
   * The disableButton() function disables a carousel button by adding the disabled CSS class and
   * setting its disabled state. It is used to disable the left or right navigation arrow when the
   * user reaches the beginning or end of the deck.
   *
   * @param {HTMLButtonElement} buttonEl - The button HTML element.
   * @returns {void} The function does not return a value.
   */
  function disableButton(buttonEl) {
    buttonEl.classList.add("carousel__btn_disabled");
    buttonEl.carousel__card_disabled = true;
  }

  /**
   * The enableButton() function eneables a carousel buttton by removing its disabled CSS class and
   * disabled attribute. It is applied to the left and right navigation arrows used to cycle the deck.
   *
   * @param {HTMLButtonElement} buttonEl - The HTML navigation button element to enable.
   * @returns {void} The function does not return a value.
   */
  function enableButton(buttonEl) {
    buttonEl.classList.remove("carousel__btn_disabled");
    buttonEl.removeAttribute("disabled");
  }

  /**
   * NOTE--REVIEW AFTER SUBMISSION: Revisit the conditional logic in updateArrows() and compare it
   * with the arrow logic inside updateDisplay().
   *
   * The updateArrows() function checks currentIndex against the beginning and end of the deck.cards
   * and calls either disableButton() or enableButton() for the button passed to it.
   *
   * @param {HTMLButtonElement} buttonEl - The HTML button element.
   * @returns {void} The function does not return a value.
   */
  function updateArrows(buttonEl) {
    if (currentIndex === 0 || currentIndex === deck.cards.length - 1) {
      disableButton(buttonEl);
    }

    if (currentIndex > 0 || currentIndex < deck.cards.length - 1) {
      enableButton(buttonEl);
    }
  }

  /**
   * The getCarouselTitleString() function creates and returns the carousel title showing the deck name,
   * current card position, and total number of cards.
   *
   * @param {Object} deck - The deck received from the API.
   * @param {string} deck.name - The name of the deck.
   * @param {Array} deck.cards - The array of cards contained in the deck.
   * @param {number} currentIndex - The current card's array index.
   * @returns {string} The formatted title string displayed in the carousel.
   */
  function getCarouselTitleString(deck, currentIndex) {
    return `${deck.name} \u00B7 ${currentIndex + 1} / ${deck.cards.length} cards`;
  }

  /**
   * The updateDisplay() function updates the Carousel view based on the current card index and whether
   * the question or answer is being shown. It updates the carousel title, card content and color, and the
   * enabled or disabled state of the navigation arrows.
   *
   * @returns {void} The function does not return a value.
   *
   */
  function updateDisplay() {
    //Step 1: Get the current card to display.
    const currentCard = deck.cards[currentIndex];

    //Step 2: currentCard now gives access to the selected card's
    // question and answer through currentCard.question and currentCard.answer.
    currentCard.question;
    currentCard.answer;
    // deck.cards[currentIndex].question;
    // deck.cards[currentIndex].answer;

    //Step 3: Update the carousel title with the deck name and current card position.
    carouselTitle.textContent = getCarouselTitleString(deck, currentIndex);

    //Step 4: Remove any existing color modifier classes
    removeColorClasses(carouselCardEl);

    //Step 5: Convert the deck's hexadecimal color to its color name
    // and apply the corresponding CSS class.
    const colorName = hexToString(deck.color);
    carouselCardEl.classList.add(`carousel__card_color_${colorName}`);

    //Step 6: Display either the question in the deck color or the answer on a white card.
    if (showingQuestion === true) {
      carouselCardText.textContent = currentCard.question;
      carouselCardEl.classList.remove("carousel__card_color_white");
    } else if (showingQuestion === false) {
      carouselCardText.textContent = currentCard.answer;
      carouselCardEl.classList.add("carousel__card_color_white");
    }

    //Step 7. Disable the left arrow on the first card and the right arrow on the last card.
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

  //Step 8: Add click event listeners for the right, left, and flip buttons.
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
