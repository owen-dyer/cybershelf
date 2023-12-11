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
      renderListings(data, "Featured Listings", false);
    },
    error: (err) => {
      $("main").html(`<h2>${err}</h2>`);
    },
  });
};

const renderListings = (listings, page_title, new_page) => {
  $.ajax({
    url: "/inventory/browse",
    method: "POST",
    data: {
      page: page_title,
      listings,
    },
    success: (template) => {
      // console.log(template);
      if (new_page) {
        $("main").html(template);
      } else {
        $("#home-hero-section").after(template);
      }
    },
    error: (err) => {
      createToastNotification(false, err.responseJSON.error);
    },
  });
};

const getListingById = (ids, callback) => {
  if (!Array.isArray(ids)) {
    ids = [ids];
  }

  $.ajax({
    url: "/api/listings/by_id",
    method: "POST",
    data: {
      ids: ids,
    },
    dataType: "json",
    success: (data) => {
      callback(data);
    },
    error: (err) => {
      createToastNotification(false, err.responseJSON.error);
    },
  });
};

const getListingsByCategory = (category_id) => {
  $.ajax({
    url: "/api/listings/by_category",
    method: "POST",
    data: {
      category_id: category_id,
    },
    dataType: "json",
    success: (data) => {
      // TODO: Add category title as page title
      renderListings(
        data.listings,
        `Listings matching '${data.category.title}'`,
        true
      );
    },
    error: (err) => {
      createToastNotification(false, err.responseJSON.error);
    },
  });
};

const renderListingOverview = (listing_id) => {
  getListingById(listing_id, (data) => {
    $.ajax({
      url: "/inventory/listing_overview",
      method: "POST",
      data: data.listings.at(0),
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

$(document).on("click", "[id*='listing-overview']", (e) => {
  const productId = e.target.id.split("-").at(2);
  renderListingOverview(productId);
});

$(document).on("click", "#browse-products-button", (e) => {
  getListings();
});

$(document).on("click", "[id*='category-button']", (e) => {
  const target = e.target;
  const categoryId = target.id.split("-").at(2);
  getListingsByCategory(categoryId);
});
