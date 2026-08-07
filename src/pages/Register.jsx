import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axios";
import "../styles/Login.css";

function Register() {

    const navigate = useNavigate();

    const [form, setForm] = useState({
        fullname: "",
        email: "",
        password: "",
        role: "Staff"
    });

    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {

        setForm({
            ...form,
            [e.target.name]: e.target.value
        });

    };

    const handleRegister = async (e) => {

        e.preventDefault();

        if (!form.fullname || !form.email || !form.password) {

            alert("Please fill all fields");

            return;

        }

        try {

            setLoading(true);

            const res = await api.post("/auth/register", {
                fullname: form.fullname,
                email: form.email,
                password: form.password,
                role: form.role
            });

            alert(res.data.message || "Registration Successful");

            navigate("/");

        }

        catch (err) {

            console.log(err.response?.data);

            alert(
                err.response?.data?.message ||
                "Registration Failed"
            );

        }

        finally {

            setLoading(false);

        }

    };

    return (

        <div className="container">

            <div className="right" style={{ width: "100%" }}>

                <div className="login-card">

                    <div className="card-top">

                        <h2>Create Account</h2>

                        <p>Register to Inventra</p>

                    </div>

                    <form onSubmit={handleRegister}>

                        <div className="input-group">

                            <label>Full Name</label>

                            <div className="input-box">

                                <input
                                    type="text"
                                    name="fullname"
                                    placeholder="Enter your full name"
                                    value={form.fullname}
                                    onChange={handleChange}
                                    required
                                />

                            </div>

                        </div>

                        <div className="input-group">

                            <label>Email</label>

                            <div className="input-box">

                                <input
                                    type="email"
                                    name="email"
                                    placeholder="Enter your email"
                                    value={form.email}
                                    onChange={handleChange}
                                    required
                                />

                            </div>

                        </div>

                        <div className="input-group">

                            <label>Password</label>

                            <div className="input-box">

                                <input
                                    type="password"
                                    name="password"
                                    placeholder="Create a password"
                                    value={form.password}
                                    onChange={handleChange}
                                    required
                                />

                            </div>

                        </div>

                        <div className="input-group">

                            <label>Role</label>

                            <div className="input-box">

                                <select
                                    name="role"
                                    value={form.role}
                                    onChange={handleChange}
                                >

                                    <option value="Staff">Staff</option>
                                    <option value="Admin">Admin</option>

                                </select>

                            </div>

                        </div>

                        <button
                            id="loginBtn"
                            type="submit"
                            disabled={loading}
                        >

                            {loading ? "Creating Account..." : "Register"}

                        </button>

                    </form>

                    <p
                        className="register-text"
                        style={{
                            marginTop: "20px",
                            textAlign: "center"
                        }}
                    >

                        Already have an account?{" "}

                        <span
                            style={{
                                color: "#2563eb",
                                cursor: "pointer",
                                fontWeight: "600"
                            }}
                            onClick={() => navigate("/")}
                        >

                            Login

                        </span>

                    </p>

                </div>

            </div>

        </div>

    );

}

export default Register;