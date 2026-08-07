const db = require("../config/db");

exports.getDashboard = (req, res) => {

    const data = {};

    db.query(
        "SELECT COUNT(*) AS totalProducts FROM products",
        (err, result) => {

            if (err) return res.status(500).json(err);

            data.totalProducts = result[0].totalProducts;

            db.query(
                "SELECT COUNT(*) AS totalSuppliers FROM suppliers",
                (err, result) => {

                    if (err) return res.status(500).json(err);

                    data.totalSuppliers = result[0].totalSuppliers;

                    db.query(
                        "SELECT COUNT(*) AS totalSales FROM sales",
                        (err, result) => {

                            if (err) return res.status(500).json(err);

                            data.totalSales = result[0].totalSales;

                            db.query(
                                "SELECT IFNULL(SUM(quantity*selling_price),0) AS revenue FROM sales",
                                (err, result) => {

                                    if (err) return res.status(500).json(err);

                                    data.revenue = result[0].revenue;

                                    db.query(
                                        "SELECT COUNT(*) AS lowStock FROM products WHERE stock<10",
                                        (err, result) => {

                                            if (err) return res.status(500).json(err);

                                            data.lowStock = result[0].lowStock;
db.query(
`
SELECT
    YEAR(sale_date) AS year,
    MONTH(sale_date) AS month_no,
    MONTHNAME(sale_date) AS month,
    SUM(quantity * selling_price) AS revenue
FROM sales
GROUP BY
    YEAR(sale_date),
    MONTH(sale_date),
    MONTHNAME(sale_date)
ORDER BY
    YEAR(sale_date),
    MONTH(sale_date)
`,
(err, result) => {

                                                    if (err) return res.status(500).json(err);

                                                    data.monthlyRevenue = result;

                                                    res.json(data);

                                                }
                                            );

                                        }
                                    );

                                }
                            );

                        }
                    );

                }
            );

        }
    );

};