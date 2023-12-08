const viewCartHandler = () => {
  $.ajax({
    url: "/api/cart",
    method: "GET",
    success: (data) => {
      const ids = data.cart.items.map((item) => item.listing_id);
      getListingById(ids, (listings) => {
        const cart = listings.listings.map((listing, i) =>
          Object.assign({}, listing, data.cart.items.at(i))
        );
        renderCart({
          items: cart,
          total_price: data.cart.total_price,
        });
      });
    },
    error: (err) => {
      // TODO: Add custom error handling on the client
      createToastNotification(false, "Cart is empty");
      // Display empty cart page with error message or something like that
    },
  });
};

const addToCartHandler = (listing_id) => {
  getListingById(listing_id, (listing) => {
    $.ajax({
      url: "/api/cart/add",
      method: "POST",
      data: listing,
      dataType: "json",
      success: (data) => {
        createToastNotification(true, "Added to cart");
      },
      error: (err) => {
        // TODO: Add custom error handling on the client
        createToastNotification(false, "Failed to add to cart");
      },
    });
  });
};

const removeFromCartHandler = (fields) => {
  getListingById(fields, (listing) => {
    $.ajax({
      url: "/api/cart/remove",
      method: "DELETE",
      data: {
        listing_id: fields,
        price: listing.listings.at(0).price,
      },
      dataType: "json",
      success: (data) => {
        $(`#cart-product-card-${data.listing_id}`).remove();
        $("#cart-total-price").text(`$${data.total_price}`);
        createToastNotification(true, data.message);
      },
      error: (err) => {
        // TODO: Add custom error handling on the client
        createToastNotification(false, err.error);
      },
    });
  });
};

const renderCart = (cart) => {
  $.ajax({
    url: "/cart",
    method: "POST",
    data: {
      items: cart.items,
      total_price: cart.total_price,
    },
    dataType: "json",
    success: (cart) => {
      // For some reason it won't this lol
      $("main").html(cart);
    },
    error: (err) => {
      // Returns 200 but an error?
      $("main").html(err.responseText);
    },
  });
};

$(document).on("click", "[id*='add-to-cart']", (e) => {
  const target = e.target;
  const listingId = e.target.id.split("-").at(3);
  addToCartHandler(listingId);
});

$(document).on("click", "[id*='remove-from-cart']", (e) => {
  const target = e.target;
  const productId = e.target.id.split("-").at(3);
  removeFromCartHandler(productId);
});

$(document).on("click", "#cart-button", (e) => {
  viewCartHandler();
});

// TODO: Add UI for add to cart/remove from cart
