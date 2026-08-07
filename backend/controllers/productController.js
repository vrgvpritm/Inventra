const db = require("../config/db");

exports.getProducts = (req, res) => {

    db.query(
        `SELECT
            products.id,
            products.name,
            sku,
            categories.name AS category,
            suppliers.supplier_name AS supplier,
            price,
            stock
        FROM products
        LEFT JOIN categories
            ON products.category_id = categories.id
        LEFT JOIN suppliers
            ON products.supplier_id = suppliers.id`,
        (err, result) => {

            if (err) {
                return res.status(500).json(err);
            }

            res.json(result);

        }
    );

};

exports.searchProducts = (req, res) => {

    const keyword = "%" + req.query.q + "%";

    db.query(
        "SELECT * FROM products WHERE name LIKE ? OR sku LIKE ?",
        [keyword, keyword],
        (err, result) => {

            if (err) {
                return res.status(500).json(err);
            }

            res.json(result);

        }
    );

};

exports.getProduct = (req, res) => {

    db.query(
        "SELECT * FROM products WHERE id = ?",
        [req.params.id],
        (err, result) => {

            if (err) {
                return res.status(500).json(err);
            }

            res.json(result[0]);

        }
    );

};

exports.addProduct = (req, res) => {

    console.log(req.body);

    const {
        name,
        sku,
        category_id,
        supplier_id,
        price,
        stock,
        description
    } = req.body;

    db.query(
        `INSERT INTO products
        (name, sku, category_id, supplier_id, price, stock, description)
        VALUES (?, ?, ?, ?, ?, ?, ?)`,
        [
            name,
            sku,
            category_id,
            supplier_id,
            price,
            stock,
            description
        ],
        (err) => {

            if (err) {
                return res.status(500).json(err);
            }

            res.json({
                success: true,
                message: "Product Added"
            });

        }
    );

};

exports.updateProduct = (req, res) => {

    const {
        name,
        sku,
        category_id,
        supplier_id,
        price,
        stock,
        description
    } = req.body;

    db.query(
        `UPDATE products
        SET
            name = ?,
            sku = ?,
            category_id = ?,
            supplier_id = ?,
            price = ?,
            stock = ?,
            description = ?
        WHERE id = ?`,
        [
            name,
            sku,
            category_id,
            supplier_id,
            price,
            stock,
            description,
            req.params.id
        ],
        (err) => {

            if (err) {
                return res.status(500).json(err);
            }

            res.json({
                success: true,
                message: "Product Updated"
            });

        }
    );

};

exports.deleteProduct = (req, res) => {

    db.query(
        "DELETE FROM products WHERE id = ?",
        [req.params.id],
        (err) => {

            if (err) {
                return res.status(500).json(err);
            }

            res.json({
                success: true,
                message: "Product Deleted"
            });

        }
    );

};