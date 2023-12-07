const viewCartHandler = () => {
  $.ajax({
    url: "/api/cart",
    method: "GET",
    success: (data) => {
      const ids = data.cart.map((item) => item.product_id);
      getProductById(ids, (products) => {
        // Duplicate product id here
        const cart = products.product.map((product, i) =>
          Object.assign({}, product, data.cart.at(i))
        );
        renderCart(cart);
      });
    },
    error: (err) => {
      // TODO: Add custom error handling on the client
      console.log("Failed to get cart contents");
      // Display empty cart page with error message or something like that
    },
  });
};

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
      },
    });
  });
};

const removeFromCartHandler = (fields) => {
  $.ajax({
    url: "/api/cart/remove",
    method: "DELETE",
    data: fields,
    dataType: "json",
    success: (data) => {
      console.log(data);
    },
    error: (err) => {
      // TODO: Add custom error handling on the client
      console.log("Failed to remove item from cart");
    },
  });
};

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
});

$(document).on("click", "#cart-button", (e) => {
  viewCartHandler();
});

// TODO: Add UI for add to cart/remove from cart
