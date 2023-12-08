const viewCartHandler = () => {
  $.ajax({
    url: "/api/cart",
    method: "GET",
    success: (data) => {
<<<<<<< HEAD
      console.log(data);
      const ids = data.cart.map((item) => item.product_id);
      getProductById(ids, (products) => {
        // Duplicate product id here
        const cart = products.product.map((product, i) =>
          Object.assign({}, product, data.cart.at(i))
        );
        renderCart(cart);
=======
      const ids = data.cart.items.map((item) => item.listing_id);
      getListingById(ids, (listings) => {
        const cart = listings.listings.map((listing, i) =>
          Object.assign({}, listing, data.cart.items.at(i))
        );
        renderCart({
          items: cart,
          total_price: data.cart.total_price,
        });
>>>>>>> main
      });
    },
    error: (err) => {
      // TODO: Add custom error handling on the client
<<<<<<< HEAD
      createToastNotification("error", "Cart is empty");
=======
      createToastNotification(false, "Cart is empty");
>>>>>>> main
      // Display empty cart page with error message or something like that
    },
  });
};

<<<<<<< HEAD
const addToCartHandler = (product_id) => {
  getProductById(product_id, (product) => {
    $.ajax({
      url: "/api/cart/add",
      method: "POST",
      data: product,
      dataType: "json",
      success: (data) => {
        console.log(data);
      },
      error: (err) => {
        // TODO: Add custom error handling on the client
        console.log("Failed to add item to cart");
=======
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
>>>>>>> main
      },
    });
  });
};

const removeFromCartHandler = (fields) => {
<<<<<<< HEAD
  console.log(fields);
  $.ajax({
    url: "/api/cart/remove",
    method: "DELETE",
    data: {
      product_id: fields,
    },
    dataType: "json",
    success: (data) => {
      $(`#cart-product-card-${data.product_id}`).remove();
      createToastNotification("success", data.message);
    },
    error: (err) => {
      // TODO: Add custom error handling on the client
      createToastNotification("error", err.error);
=======
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
>>>>>>> main
    },
  });
};

<<<<<<< HEAD
const renderCart = (items) => {
  console.log(items);
  $.ajax({
    url: "/cart",
    method: "POST",
    data: {
      cart: items,
    },
    dataType: "json",
    success: (cart) => {
      // For some reason it won't this lol
      console.log("Success");
      $("main").html(cart);
    },
    error: (err) => {
      // Returns 200 but an error?
      console.log("Error");
      $("main").html(err.responseText);
    },
  });
};

$(document).on("click", "[id*='add-to-cart']", (e) => {
  const target = e.target;
  const productId = e.target.id.split("-").at(3);
  console.log(productId);
  addToCartHandler(productId);
=======
$(document).on("click", "[id*='add-to-cart']", (e) => {
  const target = e.target;
  const listingId = e.target.id.split("-").at(3);
  addToCartHandler(listingId);
>>>>>>> main
});

$(document).on("click", "[id*='remove-from-cart']", (e) => {
  const target = e.target;
  const productId = e.target.id.split("-").at(3);
<<<<<<< HEAD
  console.log(productId);
=======
>>>>>>> main
  removeFromCartHandler(productId);
});

$(document).on("click", "#cart-button", (e) => {
  viewCartHandler();
});

// TODO: Add UI for add to cart/remove from cart
