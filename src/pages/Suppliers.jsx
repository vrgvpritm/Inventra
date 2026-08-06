import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "./Suppliers.css";

import {
  FaCubesStacked,
  FaHouse,
  FaBox,
  FaWarehouse,
  FaTruck,
  FaCartShopping,
  FaChartColumn,
  FaGear,
  FaMagnifyingGlass,
  FaPlus,
  FaPen,
  FaTrash
} from "react-icons/fa6";

const API = "http://localhost:5000/api/suppliers";

export default function Suppliers() {

  const [suppliers, setSuppliers] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    loadSuppliers();
  }, []);

  const loadSuppliers = async () => {
    try {
      const res = await axios.get(API);
      setSuppliers(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  const deleteSupplier = async (id) => {
    if (!window.confirm("Delete this supplier?")) return;

    try {
      await axios.delete(`${API}/${id}`);
      loadSuppliers();
    } catch (err) {
      console.log(err);
    }
  };

  const filteredSuppliers = suppliers.filter((supplier) => {

    const value = search.toLowerCase();

    return (
      (supplier.name || "").toLowerCase().includes(value) ||
      (supplier.email || "").toLowerCase().includes(value) ||
      (supplier.phone || "").toLowerCase().includes(value) ||
      (supplier.location || "").toLowerCase().includes(value)
    );

  });

  return (

    <div className="container">

      <aside className="sidebar">

        <div className="logo">
          <FaCubesStacked />
          <h2>Inventra</h2>
        </div>

        <ul>

          <li>
            <Link to="/dashboard">
              <FaHouse />
              <span>Dashboard</span>
            </Link>
          </li>

          <li>
            <Link to="/products">
              <FaBox />
              <span>Products</span>
            </Link>
          </li>

          <li>
            <Link to="/inventory">
              <FaWarehouse />
              <span>Inventory</span>
            </Link>
          </li>

          <li className="active">
            <Link to="/suppliers">
              <FaTruck />
              <span>Suppliers</span>
            </Link>
          </li>

          <li>
            <Link to="/sales">
              <FaCartShopping />
              <span>Sales</span>
            </Link>
          </li>

          <li>
            <Link to="/reports">
              <FaChartColumn />
              <span>Reports</span>
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

      <div className="main">

        <header>

          <div>
            <h1>Suppliers</h1>
            <p>Manage supplier information</p>
          </div>

          <button id="addSupplier">
            <FaPlus />
            Add Supplier
          </button>

        </header>

        <div className="search">

          <FaMagnifyingGlass />

          <input
            type="text"
            placeholder="Search suppliers"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

        </div>

        <div className="table-container">

          <table>

            <thead>

              <tr>

                <th>ID</th>
                <th>Supplier</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Location</th>
                <th>Action</th>

              </tr>

            </thead>

            <tbody>

              {filteredSuppliers.map((supplier) => (

                <tr key={supplier.id}>

                  <td>{supplier.id}</td>

                  <td>{supplier.name}</td>

                  <td>{supplier.email}</td>

                  <td>{supplier.phone}</td>

                  <td>{supplier.location}</td>

                  <td>

                    <button className="edit-btn">
                      <FaPen />
                    </button>

                    <button
                      className="delete-btn"
                      onClick={() => deleteSupplier(supplier.id)}
                    >
                      <FaTrash />
                    </button>

                  </td>

                </tr>

              ))}

            </tbody>

          </table>

        </div>

      </div>

    </div>

  );

}