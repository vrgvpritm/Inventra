import { useNavigate } from "react-router-dom";
import {
    FaCircleUser,
    FaArrowRightFromBracket
} from "react-icons/fa6";
import "./Navbar.css";

function Navbar({ title, subtitle }) {

    const navigate = useNavigate();

    const logout = () => {

        localStorage.removeItem("token");
        navigate("/");

    };

    return (

        <header className="topbar">

            <div className="topbar-left">

                <h1>{title}</h1>

                <p>{subtitle}</p>

            </div>

            <div className="topbar-right">

                <button
                    className="profile-btn"
                    onClick={() => navigate("/profile")}
                >

                    <FaCircleUser />

                    <span>Profile</span>

                </button>

                <button
                    className="logout-btn"
                    onClick={logout}
                >

                    <FaArrowRightFromBracket />

                    <span>Logout</span>

                </button>

            </div>

        </header>

    );

}

export default Navbar;