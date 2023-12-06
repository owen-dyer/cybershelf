const viewCartHandler = () => {
  $.ajax({
    url: "http://api.localhost/cart",
    method: "GET",
    success: (data) => {
      console.log(data);
      // Display the cart page
    },
    error: (err) => {
      // TODO: Add custom error handling on the client
      console.log("Failed to get cart contents");
      // Display empty cart page with error message or something like that
    },
  });
};

const addToCartHandler = (fields) => {
  $.ajax({
    url: "http://api.localhost/cart/add",
    method: "POST",
    data: fields,
    dataType: "json",
    success: (data) => {
      console.log(data);
    },
    error: (err) => {
      // TODO: Add custom error handling on the client
      console.log("Failed to add item to cart");
    },
  });
};

const removeFromCartHandler = (fields) => {
  $.ajax({
    url: "http://api.localhost/cart/remove",
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

$(document).on("click", "#cart-button", (e) => {
  viewCartHandler();
});

// TODO: Add UI for add to cart/remove from cart