const signOutHandler = () => {
  const onSuccess = (successResponse) => {
    console.log("Successfully signed out");

    $("body").html(successResponse.template);
    getCategories();
    getProducts();

    // $("body header").replaceWith(successResponse.template);
    createToastNotification("success", "Successfully signed out");
  };

  const onError = (errorResponse) => {
    console.log("Failed to sign out");
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
