const body = document.querySelector("body");
const categories = document.getElementById("categories");
const categoriesChevron = document.getElementById("categories-chevron");
const categoriesPopover = document.getElementById("categories-popover");

const popoverState = () => {
  if (categoriesPopover.matches(":popover-open")) return true;
  else if (!categoriesPopover.matches(":popover-open")) return false;
};

body.addEventListener("click", (e) => {
  if (categories.contains(e.target)) {
    categoriesChevron.classList.toggle("rotate-90", !popoverState());
  } else if (!categoriesPopover.contains(e.target)) {
    categoriesChevron.classList.toggle("rotate-90", false);
  }
});

categoriesPopover.addEventListener("mouseleave", (e) => {
  categoriesPopover.togglePopover(false);
  categoriesChevron.classList.toggle("rotate-90", popoverState());
});