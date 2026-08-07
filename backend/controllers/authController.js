const db = require("../config/db");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

exports.register = (req, res) => {

    const { fullname, email, password, role } = req.body;

    console.log("Register request:", {
        fullname,
        email,
        role
    });

    if (!fullname || !email || !password) {

        return res.status(400).json({
            success: false,
            message: "Please fill all fields"
        });

    }

    const normalizedEmail = email.trim().toLowerCase();

    db.query(
        "SELECT id FROM users WHERE email = ?",
        [normalizedEmail],
        async (err, result) => {

            if (err) {

                console.error("Register SELECT error:", err);

                return res.status(500).json({
                    success: false,
                    message: "Database error"
                });

            }

            if (result.length > 0) {

                return res.status(400).json({
                    success: false,
                    message: "Email already exists"
                });

            }

            try {

                const hashedPassword = await bcrypt.hash(
                    password,
                    10
                );

                const userRole =
                    role === "Admin"
                        ? "Admin"
                        : "Staff";

                db.query(
                    `
                    INSERT INTO users
                    (fullname, email, password, role)
                    VALUES (?, ?, ?, ?)
                    `,
                    [
                        fullname.trim(),
                        normalizedEmail,
                        hashedPassword,
                        userRole
                    ],
                    (err, result) => {

                        if (err) {

                            console.error(
                                "Register INSERT error:",
                                err
                            );

                            return res.status(500).json({
                                success: false,
                                message: "Registration failed"
                            });

                        }

                        console.log(
                            "User registered:",
                            result.insertId
                        );

                        return res.status(201).json({
                            success: true,
                            message: "Registration Successful"
                        });

                    }
                );

            }

            catch (error) {

                console.error(
                    "Password hashing error:",
                    error
                );

                return res.status(500).json({
                    success: false,
                    message: "Registration failed"
                });

            }

        }
    );

};


exports.login = (req, res) => {

    console.log("Login request received");

    const { email, password } = req.body;

    if (!email || !password) {

        return res.status(400).json({
            success: false,
            message: "Email and password are required"
        });

    }

    const normalizedEmail = email.trim().toLowerCase();

    db.query(
        "SELECT * FROM users WHERE email = ?",
        [normalizedEmail],
        async (err, result) => {

            if (err) {

                console.error(
                    "Login database error:",
                    err
                );

                return res.status(500).json({
                    success: false,
                    message: "Database error"
                });

            }

            if (result.length === 0) {

                console.log(
                    "Login failed: User not found"
                );

                return res.status(404).json({
                    success: false,
                    message: "User not found"
                });

            }

            const user = result[0];

            try {

                const match = await bcrypt.compare(
                    password,
                    user.password
                );

                if (!match) {

                    console.log(
                        "Login failed: Invalid password"
                    );

                    return res.status(401).json({
                        success: false,
                        message: "Invalid Password"
                    });

                }

                if (!process.env.JWT_SECRET) {

                    console.error(
                        "JWT_SECRET missing from .env"
                    );

                    return res.status(500).json({
                        success: false,
                        message: "Server configuration error"
                    });

                }

                const token = jwt.sign(
                    {
                        id: user.id,
                        email: user.email,
                        role: user.role
                    },
                    process.env.JWT_SECRET,
                    {
                        expiresIn: "1d"
                    }
                );

                console.log(
                    "Login successful:",
                    user.email
                );

                return res.status(200).json({

                    success: true,

                    message: "Login Successful",

                    token: token,

                    user: {

                        id: user.id,

                        fullname: user.fullname,

                        email: user.email,

                        role: user.role

                    }

                });

            }

            catch (error) {

                console.error(
                    "Login error:",
                    error
                );

                return res.status(500).json({
                    success: false,
                    message: "Login failed"
                });

            }

        }
    );

};


exports.logout = (req, res) => {

    console.log("Logout request received");


    return res.status(200).json({

        success: true,

        message: "Logout Successful"

    });

};