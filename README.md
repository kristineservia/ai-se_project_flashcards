# Flashcard App

#### This is my first project in TripleTen's AI-Assisted Software Engineering program. The Flashcard App is a tool intended to be a study aid resource, where a user can browse a collection of flashcards depicting questions and answers regarding Web Development.

## Features

My Flashcard App features:

- A collection of clickable decks, displayed in a grid formation on the home page. Each deck contains a particular Web Development study topic.
- An open deck view when we click on a deck, where all the cards in a single deck display a question for the topic, and a flip button on the card displays the answer to the question. The delete button on the card removes the card from the deck collection. Note: Deleted cards reappear on refresh, as data is not yet persisted.
- A "Practice" button on the top right corner above the open deck of cards leads to the Carousel View of the specific deck selected.
- The Carousel navigation page, displayed for the selected deck, enables browsing through its group of cards by using the left and right arrow buttons. Clicking the flip button underneath each card on the Carousel reveals the answer to the question.
- Responsive design layout for mobile viewing of home view, open deck view, and carousel view, with "Practice" and navigation button functionality.
- **NEW!** The Flashcard App features the opportunity to create customized decks of the user's selected study topic with the functional + New Deck button. The button takes the user to the New Deck form, where they can select the deck's color and enter the study topic of their choice in the provided format. The new deck's data is sent through a remote API for persistance storage, and once the deck is successfully created, it is added to the app and displayed on the homepage.
- **NEW!** The New Deck form includes validation and error handling. If the data entered in the New Deck form is invalid, an error message alerts the user by displaying an error modal, before any deck data is sent to the remote API. Once the data is valid, a new deck object is created and sent to the API.
- **NEW!** The decks in the Flashcard App are now persisted remotely through an API. When the app reloads, newly created decks are fetched again and continue to appear on the homepage instead of disappearing after a browser refresh. Likewise, when a user deletes a deck, the deletion is sent through the remote API so the deck remains deleted after the page is refreshed.
- **NEW!** The Flashcard App now features detailed JSDoc documentation for every named function used to build the app.

## Technologies Used

**HTML**

- HTML was used to build the structure of the Flashcard App.

**CSS**

- CSS was used to add styling to each component in the App.

**JavaScript**

- JavaScript was used to add interactivity (clickable decks, carousel feature), form validation, error handling, and hash-based routing to the app.
- The Fetch API, via the `fetch()` method, is used in JavaScript to send HTTP requests to the remote Flashcards API.
- JSDoc is used to document the app's named JavaScript functions.

**API**

- The Flashcard App communicates with a remote server through an API. HTTP (Hypertext Transfer Protocol) requests are used to retrieve saved decks, create new persistent decks, and delete existing decks so that these changes remain after the browser is refreshed.

## Screenshots

![Flashcard App Homepage](./assets/images/screenshots/00_newSS_home.png)

![Flashcard App Deck Questions](./assets/images/screenshots/01_newSS_deck-Q.png)

![Git Basics, Deck Answers](./assets/images/screenshots/02_newSS_deck-A.png)

![Git Basics, Carousel Question](./assets/images/screenshots/03_newSS_carousel-Q.png)

![Git Basics, Carousel Answer](./assets/images/screenshots/04_newSS_carousel-A.png)

![Flashcard App, Confirmation Modal](./assets/images/screenshots/00b_newSS_home.png)

![Flashcard App, About Page](./assets/images/screenshots/00b_newSS_aboutView.png)

![Flashcard App, New Deck](./assets/images/screenshots/00c_newSS_newDeck.png)

![Flashcard App, New Deck JSON parsing error modal](./assets/images/screenshots/00c-2_newSS_newDeckErrorModal.png)

![Flashcard App, Deck deletion confirmation modal](./assets/images/screenshots/00b_newSS_deckConfirmationModal.png)

![Flashcard App, Card deletion confirmation modal](./assets/images/screenshots/00b_newSS_cardConfirmationModal.png)

![Flashcard App Homepage Mobile](./assets/images/screenshots/05_newSS_home-mobile.png)

![Git Basics, Deck Mobile Questions](./assets/images/screenshots/06_newSS_deck-mobile.png)

![Git Basics, Deck Mobile Answer](./assets/images/screenshots/07_newSS_deck-mobile-A.png)

![Git Basics, Carousel Mobile Question](./assets/images/screenshots/08_newSS_carousel-mobile-Q.png)

![Git Basics, Carousel Mobile Answer](./assets/images/screenshots/09_newSS_carousel-mobile-A.png)

## Project Pitch Video

Check out the [Project Pitch](https://drive.google.com/file/d/1qZKZBR5ozKY_FJEb1rW19yw3hZJLAMun/view?usp=sharing) short video, where I decribe my project, and a challenge I faced while buidling it.

## Deployed site

Check out [Flashcards](https://kristineservia.github.io/ai-se_project_flashcards/) on GitHub Pages.
