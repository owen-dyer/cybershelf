// Need to make this dynamic so that it can work with all modals
const modalElement = document.getElementById("empty-modal");
// Need to fix this since when the button is replaced it breaks
const showModalButton = document.getElementById("show-signin-form");
// Don't really need to check for the button inside of the dialog since the id is unique...
const closeModalButton = document.querySelector("dialog #close-modal");

const openModal = (modal) => {
  modal.showModal();
};

const closeModal = (modal) => {
  modal.close();
};

$(document).on("click", "#show-signin-form", (e) => {
  $("#empty-modal").get(0).showModal();
});

$(document).on("click", "dialog #close-modal", (e) => {
  $("#empty-modal").get(0).close();
});
