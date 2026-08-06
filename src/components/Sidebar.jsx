import { Link, useLocation } from "react-router-dom";
import {
    FaCubes,
    FaHouse,
    FaBox,
    FaWarehouse,
    FaTruck,
    FaCartShopping,
    FaChartColumn,
    FaTriangleExclamation,
    FaGear
} from "react-icons/fa6";
import "./Sidebar.css";

function Sidebar() {

    const location = useLocation();

    return (

        <aside className="sidebar">

            <div className="logo">

                <FaCubes />

                <h2>Inventra</h2>

            </div>

            <ul>

                <li className={location.pathname === "/dashboard" ? "active" : ""}>
                    <Link to="/dashboard">
                        <FaHouse />
                        <span>Dashboard</span>
                    </Link>
                </li>

                <li className={location.pathname === "/products" ? "active" : ""}>
                    <Link to="/products">
                        <FaBox />
                        <span>Products</span>
                    </Link>
                </li>

                <li className={location.pathname === "/inventory" ? "active" : ""}>
                    <Link to="/inventory">
                        <FaWarehouse />
                        <span>Inventory</span>
                    </Link>
                </li>

                <li className={location.pathname === "/suppliers" ? "active" : ""}>
                    <Link to="/suppliers">
                        <FaTruck />
                        <span>Suppliers</span>
                    </Link>
                </li>

                <li className={location.pathname === "/sales" ? "active" : ""}>
                    <Link to="/sales">
                        <FaCartShopping />
                        <span>Sales</span>
                    </Link>
                </li>

                <li className={location.pathname === "/reports" ? "active" : ""}>
                    <Link to="/reports">
                        <FaChartColumn />
                        <span>Reports</span>
                    </Link>
                </li>

                <li className={location.pathname === "/low-stock" ? "active" : ""}>
                    <Link to="/low-stock">
                        <FaTriangleExclamation />
                        <span>Low Stock</span>
                    </Link>
                </li>

                <li>
                    <Link to="#">
                        <FaGear />
                        <span>Settings</span>
                    </Link>
                </li>

            </ul>

        </aside>

    );
}

export default Sidebar;