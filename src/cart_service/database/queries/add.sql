-- Add item to cart where the cart's user_id field matches the given user i
PREPARE add_item (INTEGER, INTEGER, REAL, SMALLINT) AS
    INSERT INTO cart_item (cart_id, product_id, price, quantity)
    VALUES (
        (SELECT
            cart.id
        FROM
            cart
        WHERE
            cart.user_id = $1),
        $2,
        $3,
        $4
    );