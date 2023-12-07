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
      renderProducts(data.products, "Featured Products", false);
    },
    error: (err) => {
      console.log(err);
      $("main").html(`<h2>${err}</h2>`);
    },
  });
};

const renderProducts = (products, page_title, new_page) => {
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

const getProductById = (ids, callback) => {
  if (!Array.isArray(ids)) {
    ids = [ids];
  }

  $.ajax({
    url: "/api/products/by_id",
    method: "POST",
    data: {
      ids: ids,
    },
    dataType: "json",
    success: (data) => {
      callback(data);
    },
    error: (err) => {
      console.log(err.responseText);
    },
  });
};

const renderProductOverview = (product_id) => {
  getProductById(product_id, (data) => {
    console.log(data);
    $.ajax({
      url: "/inventory/product_overview",
      method: "POST",
      data: data.product.at(0),
      dataType: "json",
      success: (template) => {
        $("#modal-content").html(template);
        $("#empty-modal").get(0).showModal();
      },
      error: (err) => {
        $("#modal-content").html(err.responseText);
        $("#empty-modal").get(0).showModal();
      },
    });
  });
};

$(document).on("click", "[id*='product-overview']", (e) => {
  const target = e.target;
  const productId = e.target.id.split("-").at(2);
  renderProductOverview(productId);
});

$(document).on("click", "#browse-products-button", (e) => {
  getProducts();
});
