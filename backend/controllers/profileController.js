const db = require("../config/db");

exports.getProfile = (req, res) => {

    const sql = `
        SELECT
            id,
            fullname AS username,
            email
        FROM users
        LIMIT 1
    `;

    db.query(sql, (err, result) => {

        if (err) {
            console.log(err);
            return res.status(500).json({
                message: "Database Error",
                error: err.sqlMessage
            });
        }

        if (result.length === 0) {
            return res.status(404).json({
                message: "User not found"
            });
        }

        res.json(result[0]);

    });

};