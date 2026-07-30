const modal = document.querySelector("#confirmation-modal");

const message = document.querySelector("#modal__message");

const confirmDeleteButton = document.querySelector(
  "#modal__confirm-delete-button",
);

const cancelButton = document.querySelector("#modal__cancel-button");

// RENDER CONFIRMATION MODAL DIALOG BOX

function renderConfirmationModal(text) {
  //Insert a message for the particular item targeted to be deleted
  message.textContent = text;

  //Make the dialog box visible by removing the "hidden" class
  modal.classList.remove("modal__hidden");

  //OPTION 1) Add a Promise feature to freeze the screen & Wait for the user's answer -Source: ChatGPT
  //The dialog box will display until user clicks on one of the buttons & issue is resolved
  return new Promise((resolve) => {
    cancelButton.onClick = () => {
      modal.classList.add("modal__hidden");
      resolve(false);
    };

    confirmDeleteButton.onClick = () => {
      modal.classList.add("modal__hidden");
      resolve(true);
    };
  });
}

export { renderConfirmationModal };
