const getCategories = () => {
  $.ajax({
    url: "/api/categories",
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
    url: "/api/products",
    method: "GET",
    success: (data) => {
      renderProducts(data.products, "All Products", true);
    },
    error: (err) => {
      $("main").html(`<h2>${err}</h2>`);
    },
  });
};

const getFeaturedProducts = () => {
  $.ajax({
    url: "/api/products/featured",
    method: "GET",
    success: (data) => {
      /*
      $.ajax({
        url: "/inventory/featured",
        method: "POST",
        data: data,
        dataType: "json",
        success: (template) => {
          // console.log(template);
        },
        error: (err) => {
          // FIXME: Response status code is 200 but an error for some reason
          // this works for now though
          $("#home-hero-section").after(err.responseText);
        },
      });
      */
      console.log(data);
      renderProducts(data.products, "Featured Products", false);
    },
    error: (err) => {
      $("main").html(`<h2>${err}</h2>`);
    },
  });
};

const renderProducts = (products, page_title, new_page) => {
  console.log(products);
  $.ajax({
    url: "/inventory/browse",
    method: "POST",
    data: {
      page: page_title,
      products,
    },
    dataType: "json",
    success: (template) => {
      // console.log(template);
    },
    error: (err) => {
      // FIXME: Response status code is 200 but an error for some reason
      // this works for now though
      if (new_page) {
        $("main").html(err.responseText);
      } else {
        $("#home-hero-section").after(err.responseText);
      }
    },
  });
};

$(document).on("click", "#browse-products-button", (e) => {
  getProducts();
});
