const db = require("../config/db");

exports.getReport = (req, res) => {

    const data = {};

    db.query(
        "SELECT SUM(quantity * selling_price) AS revenue FROM sales",
        (err, result) => {

            if (err) return res.status(500).json(err);

            data.revenue = result[0].revenue || 0;

            db.query(
                "SELECT SUM(quantity) AS itemsSold FROM sales",
                (err, result) => {

                    if (err) return res.status(500).json(err);

                    data.itemsSold = result[0].itemsSold || 0;

                    db.query(
                        `SELECT
                        products.name,
                        SUM(sales.quantity) AS totalSold
                        FROM sales
                        JOIN products
                        ON sales.product_id=products.id
                        GROUP BY products.id
                        ORDER BY totalSold DESC
                        LIMIT 5`,
                        (err, result) => {

                            if (err) return res.status(500).json(err);

                            data.topProducts = result;

                            res.json(data);

                        }
                    );

                }
            );

        }
    );

};