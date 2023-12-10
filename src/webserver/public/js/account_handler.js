$(document).on("click", "#account-button", (e) => {
  $.ajax({
    url: "/account",
    method: "GET",
    success: (data) => {
      $("main").html(data.template);
      $("#edit-fullname").val(data.name);
      $("#edit-email").val(data.email);
      $("#edit-password").val(data.password);
    },
    error: (err) => {
      console.log(err);
    },
  });
});

$(document).on("change", "#edit-fullname", (e) => {
  const target = e.target;
  const field = $(target).serialize();
  $.ajax({
    url: "/api/account/edit",
    method: "POST",
    data: field,
    dataType: "json",
    success: (data) => {
      $.ajax({
        url: "/verifyidtoken",
        method: "POST",
        data: {
          id_token: data.id_token,
        },
        success: (info) => {
          $("#account-button").html(info.name);
          $("#edit-fullname").val(info.name);
          createToastNotification(true, "Successfully updated name");
        },
        error: (err) => {
          // Failed to update value(s) of field(s)
        },
      });
    },
    error: (err) => {
      createToastNotification(false, err.responseJSON.error);
    },
  });
});

// /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
$(document).on("change", "#edit-email", (e) => {
  const target = e.target;
  const field = $(target).serializeArray().at(0);

  // Credit: https://emailregex.com/index.html
  const emailRegex =
    /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]{2,5})*$/;

  // Check if the email is valid
  if (!emailRegex.test(field.value)) {
    createToastNotification(false, `${field.value} is not a valid email`);
    return;
  }

  $.ajax({
    url: "/api/account/edit",
    method: "POST",
    data: {
      email: field.value,
    },
    dataType: "json",
    success: (data) => {
      $.ajax({
        url: "/verifyidtoken",
        method: "POST",
        data: {
          id_token: data.id_token,
        },
        success: (info) => {
          $("#edit-email").val(info.email);
          createToastNotification(true, "Successfully updated email");
        },
        error: (err) => {},
      });
    },
    error: (err) => {
      createToastNotification(false, err.responseJSON.error);
    },
  });
});

$(document).on("change", "#edit-password", (e) => {
  const target = e.target;
  const field = $(target).serialize();
  $.ajax({
    url: "/api/account/edit",
    method: "POST",
    data: field,
    dataType: "json",
    success: (data) => {
      $.ajax({
        url: "/verifyidtoken",
        method: "POST",
        data: {
          id_token: data.id_token,
        },
        success: (info) => {
          $("#edit-password").val("**************");
          createToastNotification(true, "Successfully updated password");
        },
        error: (err) => {},
      });
    },
    error: (err) => {
      createToastNotification(false, err.responseJSON.error);
    },
  });
});
