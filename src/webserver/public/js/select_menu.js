$(document)
  .on("mouseenter", "#select-container #select-menu-button", (e) => {
    e.currentTarget.nextElementSibling.show();
  })
  .on("mouseleave", "#select-container", (e) => {
    e.currentTarget.querySelector("dialog").close();
  });
