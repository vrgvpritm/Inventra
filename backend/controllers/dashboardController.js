const db = require("../config/db");

exports.getDashboard = (req, res) => {

    const data = {};

    db.query("SELECT COUNT(*) AS totalProducts FROM products", (err, result) => {

        if (err) return res.status(500).json(err);

        data.totalProducts = result[0].totalProducts;

        db.query("SELECT COUNT(*) AS totalSuppliers FROM suppliers", (err, result) => {

            if (err) return res.status(500).json(err);

            data.totalSuppliers = result[0].totalSuppliers;

            db.query("SELECT COUNT(*) AS totalSales FROM sales", (err, result) => {

                if (err) return res.status(500).json(err);

                data.totalSales = result[0].totalSales;

                db.query("SELECT SUM(quantity*selling_price) AS revenue FROM sales", (err, result) => {

                    if (err) return res.status(500).json(err);

                    data.revenue = result[0].revenue || 0;

                    db.query("SELECT COUNT(*) AS lowStock FROM products WHERE stock<10", (err, result) => {

                        if (err) return res.status(500).json(err);

                        data.lowStock = result[0].lowStock;

                        res.json(data);

                    });

                });

            });

        });

    });

};