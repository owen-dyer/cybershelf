// TODO: Add error handling for no orders
const viewOrdersHandler = () => {
  $.ajax({
    url: "/api/orders",
    method: "GET",
    success: (data) => {
      // Credit for flat method: https://stackoverflow.com/questions/10865025/merge-flatten-an-array-of-arrays
      const ids = data.orders
        .map((order) => {
          return order.items.map((item) => item.listing_id);
        })
        .flat(1);

      const filteredIds = ids.filter((id, idx) => ids.indexOf(id) === idx);

      getListingById(filteredIds, (listings) => {
        const orders = data.orders.map((order) => {
          return Object.assign(
            {},
            {
              id: order.id,
              total_price: order.total_price,
              created_at: order.created_at,
            },
            {
              items: order.items.map((item) => {
                return Object.assign(
                  {},
                  listings.listings.find(
                    (listing) => listing.id === item.listing_id
                  ),
                  { quantity: item.quantity }
                );
              }),
            }
          );
        });
        $.ajax({
          url: "/orders",
          method: "POST",
          data: {
            orders: orders,
          },
          success: (data) => {
            $("main").html(data);
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

$(document).on("click", "#orders-button", (e) => {
  viewOrdersHandler();
});

const placeOrderHandler = (fields) => {
  getCart((data) => {
    $.ajax({
      url: "/api/orders/place",
      method: "POST",
      data: {
        items: data.items,
        total_price: data.total_price,
        customer_information: fields,
      },
      success: (data) => {
        clearCartHandler();
        viewOrdersHandler();
        createToastNotification(true, data.message);
      },
      error: (err) => {
        createToastNotification(false, err.responseJSON.error);
      },
    });
  });
};

$(document).on("submit", "#checkout-form", (e) => {
  e.preventDefault();
  const target = e.target;
  const fields = $(target).serializeArray();

  const parsedFields = fields.map((field) => {
    // Credit for REGEX: https://stackoverflow.com/questions/14262770/javascript-replace-dash-hyphen-with-a-space
    // NOTE: Since some of the field names include hyphens (which cannot be in a variable name), we replace them
    return Object.assign({}, { [field.name.replace(/-/g, "_")]: field.value });
  });

  placeOrderHandler(parsedFields);
});
