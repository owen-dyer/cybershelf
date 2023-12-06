-- Get all items where the cart's id and the item's cart id match and
-- the cart's user_id field matches the given user id
SELECT
    cart.total_price,
    cart_item.product_id,
    cart_item.price,
    cart_item.quantity,
    cart_item.created_at
FROM
    cart
    INNER JOIN cart_item ON cart.id = cart_item.cart_id
ORDER BY
    "TimeStamp";