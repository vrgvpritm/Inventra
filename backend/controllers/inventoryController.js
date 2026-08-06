const db = require("../config/db");

exports.getInventory = (req, res) => {

    const sql = `
    SELECT
    products.id,
    products.name,
    products.sku,
    categories.name AS category,
    products.stock,
    products.price
    FROM products
    LEFT JOIN categories
    ON products.category_id=categories.id
    ORDER BY products.id DESC`;

    db.query(sql, (err, result) => {

        if (err) return res.status(500).json(err);

        res.json(result);

    });

};

exports.updateStock = (req, res) => {

    const { stock } = req.body;

    db.query(
        "UPDATE products SET stock=? WHERE id=?",
        [stock, req.params.id],
        (err) => {

            if (err) return res.status(500).json(err);

            res.json({
                success: true,
                message: "Stock Updated"
            });

        }
    );

};

exports.restockProduct = (req, res) => {

    const { quantity } = req.body;

    db.query(
        "UPDATE products SET stock=stock+? WHERE id=?",
        [quantity, req.params.id],
        (err) => {

            if (err) return res.status(500).json(err);

            res.json({
                success: true,
                message: "Product Restocked"
            });

        }
    );

};