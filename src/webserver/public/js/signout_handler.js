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
