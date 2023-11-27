// Need to make some small changes so that this works for all password fields (e.g. for registering password and confirm password fields)
$(document).on("click", "#toggle-password-visibility", (e) => {
  const target = e.currentTarget;
  $(target).children("svg").toggleClass("hidden");
  const type = $(target)
    .siblings("input")
    .attr("type", (i, value) => {
      return value === "password" ? "text" : "password";
    });
});
