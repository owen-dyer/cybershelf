// TODO: Migrate to inventory server
const search = document.getElementById("search");
search.addEventListener("focusin", (e) => {
  e.target.parentNode.classList.add("ring-1", "ring-blue-600");
});
search.addEventListener("focusout", (e) => {
  e.target.parentNode.classList.remove("ring-1", "ring-blue-600");
});