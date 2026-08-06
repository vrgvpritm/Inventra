const db = require("../config/db");

exports.getSales = (req, res) => {

    const sql = `
    SELECT
    sales.id,
    products.name,
    products.sku,
    sales.quantity,
    sales.selling_price,
    (sales.quantity * sales.selling_price) AS total,
    sales.sale_date
    FROM sales
    JOIN products
    ON sales.product_id = products.id
    ORDER BY sales.id DESC`;

    db.query(sql, (err, result) => {

        if (err) return res.status(500).json(err);

        res.json(result);

    });

};

exports.getSale = (req, res) => {

    db.query(
        "SELECT * FROM sales WHERE id=?",
        [req.params.id],
        (err, result) => {

            if (err) return res.status(500).json(err);

            res.json(result[0]);

        }
    );

};

exports.addSale = (req, res) => {

    const {
        product_id,
        quantity,
        selling_price,
        sale_date
    } = req.body;

    db.query(
        "SELECT stock FROM products WHERE id=?",
        [product_id],
        (err, result) => {

            if (err) return res.status(500).json(err);

            if (result.length === 0) {
                return res.status(404).json({
                    success: false,
                    message: "Product not found"
                });
            }

            if (result[0].stock < quantity) {
                return res.status(400).json({
                    success: false,
                    message: "Insufficient Stock"
                });
            }

            db.query(
                "INSERT INTO sales(product_id,quantity,selling_price,sale_date) VALUES(?,?,?,?)",
                [
                    product_id,
                    quantity,
                    selling_price,
                    sale_date
                ],
                (err) => {

                    if (err) return res.status(500).json(err);

                    db.query(
                        "UPDATE products SET stock=stock-? WHERE id=?",
                        [quantity, product_id],
                        (err) => {

                            if (err) return res.status(500).json(err);

                            res.json({
                                success: true,
                                message: "Sale Added"
                            });

                        }
                    );

                }
            );

        }
    );

};

exports.deleteSale = (req, res) => {

    db.query(
        "SELECT * FROM sales WHERE id=?",
        [req.params.id],
        (err, result) => {

            if (err) return res.status(500).json(err);

            if (result.length === 0) {
                return res.status(404).json({
                    success: false,
                    message: "Sale not found"
                });
            }

            const sale = result[0];

            db.query(
                "UPDATE products SET stock=stock+? WHERE id=?",
                [
                    sale.quantity,
                    sale.product_id
                ],
                (err) => {

                    if (err) return res.status(500).json(err);

                    db.query(
                        "DELETE FROM sales WHERE id=?",
                        [req.params.id],
                        (err) => {

                            if (err) return res.status(500).json(err);

                            res.json({
                                success: true,
                                message: "Sale Deleted"
                            });

                        }
                    );

                }
            );

        }
    );

};