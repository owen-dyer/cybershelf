const getCategories = () => {
  $.ajax({
    url: "/api/categories",
    method: "GET",
    success: (data) => {
      data.categories.map((category) => {
        $("#categories-popover").append(
          `<button id='category-button-${category.id}'>${category.title}</button>`
        );
      });
    },
    error: (err) => {
      $("#categories-popover").append(`<h2>${err}</h2>`);
    },
  });
};

const getListings = () => {
  // This should really be done with listings rather than products but
  // need to setup listings
  $.ajax({
    url: "/api/listings",
    method: "GET",
    success: (data) => {
      renderListings(data, "All Listings", true);
    },
    error: (err) => {
      $("main").html(`<h2>${err}</h2>`);
    },
  });
};

const getFeaturedListings = () => {
  $.ajax({
    url: "/api/listings/featured",
    method: "GET",
    success: (data) => {
<<<<<<< HEAD
      renderProducts(data.products, "Featured Products", false);
=======
      renderListings(data, "Featured Listings", false);
>>>>>>> main
    },
    error: (err) => {
      console.log(err);
      $("main").html(`<h2>${err}</h2>`);
    },
  });
};

<<<<<<< HEAD
const renderProducts = (products, page_title, new_page) => {
=======
const renderListings = (listings, page_title, new_page) => {
>>>>>>> main
  $.ajax({
    url: "/inventory/browse",
    method: "POST",
    data: {
      page: page_title,
      listings,
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

<<<<<<< HEAD
const getProductById = (ids, callback) => {
=======
const getListingById = (ids, callback) => {
>>>>>>> main
  if (!Array.isArray(ids)) {
    ids = [ids];
  }

  $.ajax({
<<<<<<< HEAD
    url: "/api/products/by_id",
=======
    url: "/api/listings/by_id",
>>>>>>> main
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

<<<<<<< HEAD
const renderProductOverview = (product_id) => {
  getProductById(product_id, (data) => {
    console.log(data);
    $.ajax({
      url: "/inventory/product_overview",
      method: "POST",
      data: data.product.at(0),
=======
const renderListingOverview = (listing_id) => {
  getListingById(listing_id, (data) => {
    $.ajax({
      url: "/inventory/listing_overview",
      method: "POST",
      data: data.listings.at(0),
>>>>>>> main
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

<<<<<<< HEAD
$(document).on("click", "[id*='product-overview']", (e) => {
  const target = e.target;
  const productId = e.target.id.split("-").at(2);
  renderProductOverview(productId);
});

$(document).on("click", "#browse-products-button", (e) => {
  getProducts();
=======
$(document).on("click", "[id*='listing-overview']", (e) => {
  const productId = e.target.id.split("-").at(2);
  renderListingOverview(productId);
});

$(document).on("click", "#browse-products-button", (e) => {
  getListings();
>>>>>>> main
});
