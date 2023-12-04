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
        closeModal(modalElement);
        // Change sign in button to sign out button since authentication was successful
        // $("#show-signin-form")
        //   .off()
        //   .attr("id", "signout")
        //   .removeAttr("onclick")
        //   .text("Sign Out");
        // reloadPage("/");

        // The endpoint re-renders some UI components since the UI for authenticated users is slightly different
        // than that of non-authenticated users and we inject those changes into the page
        $("body header").replaceWith(data.template);
        // Need to figure this out since name isn't being sent right now due to rendering
        console.log(data.name);
        createToastNotification("success", `Welcome, ${data.name}`);
      },
      error: (err) => {
        console.log(`Error: ${err}`);
        console.log("Failed to verify id token");
      },
    });
  };

  const onError = (errorResponse) => {
    console.log("Failed to sign in");
  };

  $.ajax({
    url: "http://api.localhost/signin",
    type: "POST",
    data: fields,
    dataType: "json",
    success: (data) => {
      onSuccess(data);
      // Here there are two ways to do this:
      // 1. Take 'id_token' and pass to the webserver for verification
      // After this, the webserver sends back some fields (name, email, etc.) and they can be injected into the page
      // 2. Have the account server send these fields directly along with the name/email/etc. and inject without contacting the webserver

      // Probably better to include all scripts into one file on the server but that can be done later

      // TODO: Add transition out of this
    },
    error: (err) => {
      console.log("Failed to sign in");
      console.log(err);
      // TODO: Show toast notification with error message (filtered by the backend)
    },
  });
};

$(document).on("submit", "#signin-form", (e) => {
  // Prevent the default submit action so that the page doesn't refresh
  e.preventDefault();
  const target = e.target;
  // Convert all of the form fields to a JSON object
  const fields = $(target).serialize();
  signInHandler(fields);
});
