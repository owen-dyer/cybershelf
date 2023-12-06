// Probably don't need these anymore
const openModal = (modal) => {
  modal.showModal();
};

const closeModal = (modal) => {
  modal.close();
};

$(document).on("click", "dialog #close-modal", (e) => {
  $("#empty-modal").get(0).close();
});
