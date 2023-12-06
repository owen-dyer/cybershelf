$(document).on("click", "#account-button", (e) => {
  $.ajax({
    url: "/account",
    method: "GET",
    success: (data) => {
      $("main").replaceWith(data.template);
    },
    error: (err) => {
      console.log(err);
    },
  });
});
