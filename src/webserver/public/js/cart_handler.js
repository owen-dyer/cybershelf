const getCart = (callback) => {
  $.ajax({
    url: "/api/cart",
    method: "GET",
    success: (data) => {
      const ids = data.items.map((item) => item.listing_id);
      getListingById(ids, (listings) => {
        const cart = listings.listings.map((listing, i) =>
          Object.assign({}, listing, data.items.at(i))
        );
        callback({
          items: cart,
          total_price: data.total_price,
        });
      });
    },
  });
};

const viewCartHandler = () => {
  $.ajax({
    url: "/api/cart",
    method: "GET",
    success: (data) => {
      getCart((data) => {
        renderCart(data);
      });
    },
    error: (err) => {
      createToastNotification(false, err.responseJSON.error);
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
        createToastNotification(false, err.responseJSON.error);
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
        if ($.contains(document.body, $("#checkout-page").get(0))) {
          checkoutHandler();
        } else {
          viewCartHandler();
        }

        createToastNotification(true, data.message);
      },
      error: (err) => {
        // TODO: Add custom error handling on the client
        createToastNotification(false, err.responseJSON.error);
      },
    });
  });
};

const clearCartHandler = () => {
  $.ajax({
    url: "/api/cart/clear",
    method: "DELETE",
    success: () => {
      // Don't need to do anything
    },
    error: (err) => {
      // // Don't need to do anything
    },
  });
};

const updateQuantityHandler = (listingId, quantity) => {
  $.ajax({
    url: "/api/cart/update",
    method: "PUT",
    data: {
      listing_id: listingId,
      quantity: quantity,
    },
    dataType: "json",
    success: (data) => {
      if ($.contains(document.body, $("#checkout-page").get(0))) {
        return checkoutHandler();
      }
      viewCartHandler();
    },
    error: (err) => {
      createToastNotification(false, err.responseJSON.error);
    },
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
    success: (cart) => {
      $("main").html(cart);
      $("[id*='item-quantity']").spinner({
        min: 0,
        max: 99,
      });
    },
    error: (err) => {
      createToastNotification(false, err.responseJSON.error);
    },
  });
};

const checkoutHandler = () => {
  $.ajax({
    url: "/api/cart",
    method: "GET",
    success: (data) => {
      const ids = data.items.map((item) => item.listing_id);
      // NOTE: This is buggy but it works
      if (!ids.length) {
        return createToastNotification(
          false,
          "You cannot checkout with an empty cart"
        );
      }
      getListingById(ids, (listings) => {
        const cart = listings.listings.map((listing, i) =>
          Object.assign({}, listing, data.items.at(i))
        );
        $.ajax({
          url: "/cart/checkout",
          method: "POST",
          data: {
            items: cart,
            total_price: data.total_price,
          },
          success: (data) => {
            $("main").html(data);
            $("[id*='item-quantity']").spinner({
              min: 0,
              max: 99,
            });
          },
          error: (err) => {
            createToastNotification(false, err.responseJSON.error);
          },
        });
      });
    },
    error: (err) => {
      createToastNotification(false, err.responseJSON.error);
    },
  });
};

$(document).on("click", "#checkout-button", (e) => {
  checkoutHandler();
});

$(document).on("click", "[id*='add-to-cart']", (e) => {
  const target = e.target;
  const listingId = target.id.split("-").at(3);
  addToCartHandler(listingId);
});

$(document).on("click", "[id*='remove-from-cart']", (e) => {
  const target = e.target;
  const listingId = target.id.split("-").at(3);
  removeFromCartHandler(listingId);
});

$(document).on("click", "#cart-button", (e) => {
  viewCartHandler();
});

$(document).on("spinchange", "[id*='item-quantity']", (e) => {
  const target = e.target;
  const listingId = target.id.split("-").at(2);

  if (!$(target).spinner("isValid")) {
    createToastNotification(false, "Please specify a valid quantity");
    return;
  }

  const quantity = $(target).spinner("value");

  if (parseInt(quantity) === 0) {
    return removeFromCartHandler(listingId);
  }

  updateQuantityHandler(listingId, quantity);
});
