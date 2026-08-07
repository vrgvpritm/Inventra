import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axios";
import {
    FaCubesStacked,
    FaBox,
    FaChartLine,
    FaUsers,
    FaFileInvoice,
    FaEnvelope,
    FaLock,
    FaEye,
    FaEyeSlash
} from "react-icons/fa6";
import "../styles/Login.css";

export default function Login() {

    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);

    const handleLogin = async (e) => {

        e.preventDefault();

        if (!email || !password) {

            alert("Please fill all fields");
            return;

        }

        try {

            setLoading(true);

            const res = await api.post("/auth/login", {
                email,
                password
            });

            if (!res.data.success) {

                alert(res.data.message);
                return;

            }

            localStorage.setItem(
                "token",
                res.data.token
            );

            localStorage.setItem(
                "user",
                JSON.stringify(res.data.user)
            );

            // Reload app so protected routes detect token
            window.location.href = "/dashboard";

        }

        catch (err) {

            console.log(err);

            alert(
                err.response?.data?.message ||
                "Login Failed"
            );

        }

        finally {

            setLoading(false);

        }

    };

    return (

        <>

            <div className="background">

                <div className="shape shape1"></div>
                <div className="shape shape2"></div>
                <div className="shape shape3"></div>

            </div>

            <div className="container">

                <div className="left">

                    <div className="brand">

                        <div className="login-logo">
    <FaCubesStacked />
</div>
                        <h1>Inventra</h1>

                        <p>Inventory Management System</p>

                        <div className="features">

                            <div className="feature">

                                <FaBox />

                                <span>Manage Products</span>

                            </div>

                            <div className="feature">

                                <FaChartLine />

                                <span>Track Inventory</span>

                            </div>

                            <div className="feature">

                                <FaUsers />

                                <span>Supplier Management</span>

                            </div>

                            <div className="feature">

                                <FaFileInvoice />

                                <span>Sales Reports</span>

                            </div>

                        </div>

                    </div>

                </div>

                <div className="right">

                    <div className="login-card">

                        <div className="card-top">

                            <h2>Welcome Back</h2>

                            <p>Sign in to continue to Inventra</p>

                        </div>

                        <form onSubmit={handleLogin}>

                            <div className="input-group">

                                <label>Email Address</label>

                                <div className="input-box">

                                    <FaEnvelope />

                                    <input
                                        type="email"
                                        placeholder="Enter your email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        required
                                    />

                                </div>

                            </div>

                            <div className="input-group">

                                <label>Password</label>

                                <div className="input-box">

                                    <FaLock />

                                    <input
                                        type={showPassword ? "text" : "password"}
                                        placeholder="Enter your password"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        required
                                    />

                                    <span
                                        id="togglePassword"
                                        onClick={() => setShowPassword(!showPassword)}
                                    >

                                        {showPassword
                                            ? <FaEyeSlash />
                                            : <FaEye />
                                        }

                                    </span>

                                </div>

                            </div>

                            <div className="options">

                                <label>

                                    <input type="checkbox" />

                                    Remember Me

                                </label>

                            </div>

                            <button
                                id="loginBtn"
                                type="submit"
                                disabled={loading}
                            >

                                {loading
                                    ? "Signing In..."
                                    : "Login"}

                            </button>

                            <p
                                className="register-text"
                                style={{
                                    marginTop: "20px",
                                    textAlign: "center"
                                }}
                            >

                                Don't have an account?{" "}

                                <span
                                    style={{
                                        color: "#2563eb",
                                        cursor: "pointer",
                                        fontWeight: "600"
                                    }}
                                    onClick={() => navigate("/register")}
                                >

                                    Register

                                </span>

                            </p>

                        </form>

                    </div>

                </div>

            </div>

        </>

    );

}