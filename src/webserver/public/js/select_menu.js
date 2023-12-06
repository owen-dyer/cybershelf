$(document)
  .on("mouseenter", "#select-container #account-button", (e) => {
    e.currentTarget.nextElementSibling.show();
  })
  .on("mouseleave", "#select-container", (e) => {
    e.currentTarget.querySelector("dialog").close();
  });
