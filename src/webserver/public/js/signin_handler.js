// TODO: Need to create some kind of session/something so that if a page refresh occurs state is maintained

// Handler for all client-side logic related to loggin in
const signInHandler = (fields) => {
  const onSuccess = (successResponse) => {
    console.log(successResponse);
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
        // Need to figure this out since name isn't being sent right now due to rendering
        createToastNotification("success", `Welcome, ${data.name}`);
      },
      error: (err) => {
        onError(err);
      },
    });
  };

  const onError = (errorResponse) => {
    createToastNotification("error", "Failed to sign in");
  };

  $.ajax({
    url: "http://api.localhost/signin",
    method: "POST",
    data: fields,
    dataType: "json",
    success: (data) => {
      onSuccess(data);
    },
    error: (err) => {
      // TODO: Show toast notification with error message (filtered by the backend)
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
