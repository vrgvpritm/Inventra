const db = require("../config/db");
const bcrypt = require("bcrypt");

exports.register = async (req, res) => {
    const { fullname, email, password, role } = req.body;

    try {
        const hash = await bcrypt.hash(password, 10);

        db.query(
            "INSERT INTO users(fullname,email,password,role) VALUES(?,?,?,?)",
            [fullname, email, hash, role],
            (err, result) => {
                if (err) {
                    return res.status(500).json(err);
                }

                res.json({
                    success: true,
                    message: "User Registered"
                });
            }
        );
    } catch (err) {
        res.status(500).json(err);
    }
};

exports.login = (req, res) => {
    const { email, password } = req.body;

    db.query(
        "SELECT * FROM users WHERE email=?",
        [email],
        async (err, result) => {

            if (err) {
                return res.status(500).json(err);
            }

            if (result.length === 0) {
                return res.json({
                    success: false,
                    message: "User Not Found"
                });
            }

            const user = result[0];

            const match = await bcrypt.compare(password, user.password);

            if (!match) {
                return res.json({
                    success: false,
                    message: "Invalid Password"
                });
            }

            req.session.user = user;

            res.json({
                success: true,
                user
            });

        }
    );
};

exports.logout = (req, res) => {
    req.session.destroy(() => {
        res.json({
            success: true
        });
    });
};