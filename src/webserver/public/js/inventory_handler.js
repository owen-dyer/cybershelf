const getCategories = () => {
  $.ajax({
    url: "http://api.localhost/categories",
    method: "GET",
    success: (data) => {
      data.categories.map((category) => {
        // Add slugs here
        $("#categories-popover").append(`<button>${category.title}</button>`);
      });
    },
    error: (err) => {
      $("#categories-popover").append(`<h2>${err}</h2>`);
    },
  });
};

const getProducts = () => {
  // This should really be done with listings rather than products but
  // need to setup listings
  $.ajax({
    url: "http://api.localhost/products",
    method: "GET",
    success: (data) => {
      $.ajax({
        url: "/inventory/browse",
        method: "POST",
        data: data,
        dataType: "json",
        success: (template) => {
          // console.log(template);
        },
        error: (err) => {
          // console.log("Error");
          // console.log(err);
          // FIXME: Response status code is 200 but an error for some reason
          // this works for now though
          $("main").html(err.responseText);
        },
      });
    },
    error: (err) => {
      $("main").html(`<h2>${err}</h2>`);
    },
  });
};
