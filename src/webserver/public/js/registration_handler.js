const registrationHandler = (fields) => {
  const onSuccess = (successResponse) => {
    createToastNotification(
      true,
      `Successfully registered ${successResponse.email}`
    );
    // Bring up the signin form so that the user can sign in after registering
    $("#modal-content").load("/signin");
  };

  const onError = (errorResponse) => {
    $("#register-form-info-widget")
      .text(
        errorResponse.status >= 500
          ? `HTTP ${errorResponse.status}: ${errorResponse.statusText}`
          : errorResponse.responseJSON.error
      )
      .toggleClass("hidden", false)
      .toggleClass("text-red-500", true);
  };

  $.ajax({
    url: "/api/register",
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

$(document).on("click", "#show-register-form", (e) => {
  $("#modal-content").load("/register");
  $("#empty-modal").get(0).showModal();
});

$(document).on("submit", "#registration-form", (e) => {
  e.preventDefault();
  const target = e.target;
  const fields = $(target).serialize();
  const parsed = fields.split("&");
  if (parsed.at(2).split("=").at(1) !== parsed.at(3).split("=").at(1)) {
    $("#register-form-info-widget")
      .text("Passwords do not match")
      .toggleClass("hidden", false)
      .toggleClass("text-red-500", true);
    return;
  }
  registrationHandler(fields);
});
