const searchHandler = (fields) => {
  const onSuccess = (successResponse) => {
    renderListings(
      JSON.parse(successResponse).products,
      `Listings matching '${JSON.parse(successResponse).filter}'`,
      true
    );
  };

  const onError = (errorResponse) => {
    $("main").html(JSON.parse(errorResponse.responseText).error);
  };

  $.ajax({
    url: "/api/listings/filter",
    method: "GET",
    data: fields,
    dataType: "text",
    success: (data) => {
      onSuccess(data);
    },
    error: (err) => {
      onError(err);
    },
  });
};

$(document).on("focusin", "#search", (e) => {
  e.target.parentNode.classList.add("ring-2", "ring-blue-600");
});

$(document).on("focusout", "#search", (e) => {
  e.target.parentNode.classList.remove("ring-2", "ring-blue-600");
});

$(document).on("click", "#submit-search", (e) => {
  e.preventDefault();
  const fields = $(e.currentTarget).parent().serialize();
  searchHandler(fields);
});
