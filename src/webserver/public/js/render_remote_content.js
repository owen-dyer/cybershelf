// Fetch HTML from a remote endpoint and inject it into a given DOM element
const renderRemoteContent = (route, container) => {
  $.ajax({
    url: route,
    type: "GET",
    dataType: "html",
    success: (data) => {
      $(`#${container}`).html(data);
    },
    error: (err) => {
      $(`#${container}`).html(`Failed to render ${route}`);
      console.log(err);
    },
  });
};
