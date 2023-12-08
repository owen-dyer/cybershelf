const signOutHandler = () => {
  const onSuccess = (successResponse) => {
    $("body").html(successResponse.template);
    getCategories();
    getFeaturedProducts();
    $("#show-register-form").toggleClass("hidden", false);

    createToastNotification("success", "Successfully signed out");
  };

  const onError = (errorResponse) => {
    createToastNotification("error", "Failed to sign out");
  };

  $.ajax({
    // FIXME: Want to make this http://api.localhost/signout which would proxy to the webserver just for appearance
    url: "/signout",
    method: "GET",
    success: (data) => {
      onSuccess(data);
    },
    error: (err) => {
      onError(data);
    },
  });
};

$(document).on("click", "#signout-button", (e) => {
  signOutHandler();
});
