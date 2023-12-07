const body = document.querySelector("body");
const categories = document.getElementById("categories");
const categoriesChevron = document.getElementById("categories-chevron");
const categoriesPopover = document.getElementById("categories-popover");

const popoverState = () => {
  if (categoriesPopover.matches(":popover-open")) return true;
  else if (!categoriesPopover.matches(":popover-open")) return false;
};

$(document).on("click", (e) => {
  if ($("#categories").get(0).contains(e.target)) {
    $("#categories-chevron").toggleClass("rotate-90", true);
  } else {
    $("#categories-chevron").toggleClass("rotate-90", false);
  }
});

$(document).on("mouseleave", "#categories-popover", (e) => {
  e.currentTarget.togglePopover(false);
  $("#categories-chevron").toggleClass("rotate-90", false);
});
