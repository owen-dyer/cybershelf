const searchHandler = (fields) => {
  console.log(fields);

  const onSuccess = (successResponse) => {
    console.log("Found item!");
  };

  const onError = (errorResponse) => {
    console.log("Failed to find item");
  };

  $.ajax({
    url: "http://api.localhost/products/filter",
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
