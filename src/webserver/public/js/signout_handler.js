const signOutHandler = () => {
  const onSuccess = (successResponse) => {
    $("body").html(successResponse.template);
    getCategories();
    getFeaturedListings();

    createToastNotification(true, "Successfully signed out");
  };

  const onError = (errorResponse) => {
    createToastNotification(false, "Failed to sign out");
  };

  $.ajax({
    // FIXME: Want to make this http://api.localhost/signout which would proxy to the webserver just for appearance
    url: "/signout",
    method: "GET",
    success: (data) => {
      console.log("Successfully signed out");
      console.log(data);
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
