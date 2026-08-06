const db = require("../config/db");

exports.getLowStock = (req, res) => {

    db.query(
        "SELECT * FROM products WHERE stock<10 ORDER BY stock ASC",
        (err, result) => {

            if (err) return res.status(500).json(err);

            res.json(result);

        }
    );

};