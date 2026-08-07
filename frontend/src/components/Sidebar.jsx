import { NavLink } from "react-router-dom";
import {
    FaCubesStacked,
    FaHouse,
    FaBox,
    FaWarehouse,
    FaTriangleExclamation,
    FaTruck,
    FaCartShopping,
    FaGear
} from "react-icons/fa6";
import "./Sidebar.css";

function Sidebar() {

    return (

        <aside className="sidebar">

            <div className="logo">

                <div className="logo-icon">

                    <FaCubesStacked />

                </div>

                <h2>Inventra</h2>

            </div>

            <ul>

                <li>

                    <NavLink
                        to="/dashboard"
                        className={({ isActive }) => isActive ? "active" : ""}
                    >

                        <FaHouse />

                        <span>Dashboard</span>

                    </NavLink>

                </li>

                <li>

                    <NavLink
                        to="/products"
                        className={({ isActive }) => isActive ? "active" : ""}
                    >

                        <FaBox />

                        <span>Products</span>

                    </NavLink>

                </li>

                <li>

                    <NavLink
                        to="/inventory"
                        className={({ isActive }) => isActive ? "active" : ""}
                    >

                        <FaWarehouse />

                        <span>Inventory</span>

                    </NavLink>

                </li>

                <li>

                    <NavLink
                        to="/low-stock"
                        className={({ isActive }) => isActive ? "active" : ""}
                    >

                        <FaTriangleExclamation />

                        <span>Low Stock</span>

                    </NavLink>

                </li>

                <li>

                    <NavLink
                        to="/suppliers"
                        className={({ isActive }) => isActive ? "active" : ""}
                    >

                        <FaTruck />

                        <span>Suppliers</span>

                    </NavLink>

                </li>

                <li>

                    <NavLink
                        to="/sales"
                        className={({ isActive }) => isActive ? "active" : ""}
                    >

                        <FaCartShopping />

                        <span>Sales</span>

                    </NavLink>

                </li>

                <li>

                    <NavLink
                        to="/settings"
                        className={({ isActive }) => isActive ? "active" : ""}
                    >

                        <FaGear />

                        <span>Settings</span>

                    </NavLink>

                </li>

            </ul>

        </aside>

    );

}

export default Sidebar;