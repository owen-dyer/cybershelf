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
      createToastNotification(false, "Failed to update account information");
    },
  });
});

$(document).on("change", "#edit-email", (e) => {
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
          $("#edit-email").val(info.email);
          createToastNotification(true, "Successfully updated email");
        },
        error: (err) => {
          
        },
      });
    },
    error: (err) => {
      createToastNotification(false, "Failed to update account information");
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
        error: (err) => {
          // createToastNotification("error", "Failed to update UI");
        },
      });
    },
    error: (err) => {
      createToastNotification("error", "Failed to update account information");
    },
  });
});
