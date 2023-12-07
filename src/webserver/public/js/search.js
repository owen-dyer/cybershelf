const searchHandler = (fields) => {
  const onSuccess = (successResponse) => {
    console.log(successResponse);
    renderProducts(
      JSON.parse(successResponse).products,
      `Products matching '${JSON.parse(successResponse).filter}'`,
      true
    );
  };

  const onError = (errorResponse) => {
    $("main").html(JSON.parse(errorResponse.responseText).error);
  };

  $.ajax({
    url: "/api/products/filter",
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
