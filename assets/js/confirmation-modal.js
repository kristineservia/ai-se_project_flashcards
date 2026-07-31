const modal = document.querySelector("#confirmation-modal");

const message = document.querySelector("#modal__message");

const confirmDeleteButton = document.querySelector(
  "#modal__confirm-delete-button",
);

const cancelButton = document.querySelector("#modal__cancel-button");

//Variable that will temporary hold what the user is reading in the dialog box
let confirmAction;

// RENDER CONFIRMATION MODAL DIALOG BOX
function renderConfirmationModal(text, action) {
  //Insert a message for the particular item targeted to be deleted
  message.textContent = text;

  //User confirms if they want to Delete the item or not
  confirmAction = action;

  //Make the dialog box visible by removing the "hidden" class
  modal.classList.remove("modal__hidden");
}

//DELETE ITEM?  (Action: Run the previous function to remove visible item & hide modal dialog box)
confirmDeleteButton.addEventListener("click", () => {
  confirmAction();
  modal.classList.add("modal__hidden");
});

//CANCEL DELETION? (Action: Hide the modal dialog box by adding class modal__hidden)
cancelButton.addEventListener("click", () => {
  modal.classList.add("modal__hidden");
});

export { renderConfirmationModal };
