const renderRemoteContent = (route, container) => {
  $.ajax({
    url: route,
    type: "GET",
    dataType: "html",
    success: (data) => {
      $(`#${container}`).html(data);
    },
    error: (err) => {
      $(`#${container}`).html(err);
    },
  });
};
