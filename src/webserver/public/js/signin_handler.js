// TODO: Need to create some kind of session/something so that if a page refresh occurs state is maintained

// Handler for all client-side logic related to loggin in
const signInHandler = (fields) => {
  const onSuccess = (successResponse) => {
    // Here we make a request to the webserver id token verification endpoint which will return data to update the UI
    // (if verification succeeds)
    $.ajax({
      url: "/verifyidtoken",
      method: "POST",
      data: {
        id_token: successResponse.id_token,
      },
      success: (data) => {
        $("#empty-modal").get(0).close();
        // The endpoint re-renders some UI components since the UI for authenticated users is slightly different
        // than that of non-authenticated users and we inject those changes into the page
        $("body header").replaceWith(data.template);
        getCategories();
        $("#show-register-form").toggleClass("hidden", true);
        createToastNotification(true, `Welcome, ${data.name}`);
      },
      error: (err) => {
        onError(err);
      },
    });
  };

  const onError = (errorResponse) => {
    $("#signin-form-info-widget")
      .text(
        errorResponse.status >= 500
          ? `HTTP ${errorResponse.status}: ${errorResponse.statusText}`
          : errorResponse.responseJSON.error
      )
      .toggleClass("hidden", false)
      .toggleClass("text-red-500", true);
  };

  $.ajax({
    url: "/api/signin",
    method: "POST",
    data: fields,
    dataType: "json",
    success: (data) => {
      onSuccess(data);
    },
    error: (err) => {
      onError(err);
    },
  });
};

$(document).on("click", "#show-signin-form", (e) => {
  $("#modal-content").load("/signin");
  $("#empty-modal").get(0).showModal();
});

$(document).on("submit", "#signin-form", (e) => {
  // Prevent the default submit action so that the page doesn't refresh
  e.preventDefault();
  const target = e.target;
  // Convert all of the form fields to a JSON object
  const fields = $(target).serialize();
  signInHandler(fields);
});
