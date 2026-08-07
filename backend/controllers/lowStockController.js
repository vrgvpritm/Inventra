const db = require("../config/db");

exports.getLowStock = (req, res) => {

    const sql = `
        SELECT *
        FROM products
        WHERE stock <= 10
        ORDER BY stock ASC
    `;

    db.query(sql, (err, result) => {

        if (err) {

            console.error(err);

            return res.status(500).json({
                message: "Failed to fetch low stock products"
            });

        }

        res.status(200).json(result);

    });

};