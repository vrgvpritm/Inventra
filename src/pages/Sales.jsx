import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "./Sales.css";
import "@fortawesome/fontawesome-free/css/all.min.css";

const API_URL = "http://localhost:5000/api/sales";

function Sales() {
  const [sales, setSales] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetchSales();
  }, []);

  const fetchSales = async () => {
    try {
      const res = await axios.get(API_URL);
      setSales(res.data);
    } catch (err) {
      console.log(err);
      alert("Cannot connect to backend");
    }
  };

  const filteredSales = sales.filter((sale) =>
    (
      sale.name +
      sale.sku +
      sale.sale_date
    )
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  return (
    <div className="container">

      <aside className="sidebar">

        <div className="logo">
          <i className="fa-solid fa-cubes-stacked"></i>
          <h2>Inventra</h2>
        </div>

        <ul>

          <li>
            <Link to="/dashboard">
              <i className="fa-solid fa-house"></i>
              <span>Dashboard</span>
            </Link>
          </li>

          <li>
            <Link to="/products">
              <i className="fa-solid fa-box"></i>
              <span>Products</span>
            </Link>
          </li>

          <li>
            <Link to="/inventory">
              <i className="fa-solid fa-warehouse"></i>
              <span>Inventory</span>
            </Link>
          </li>

          <li>
            <Link to="/suppliers">
              <i className="fa-solid fa-truck"></i>
              <span>Suppliers</span>
            </Link>
          </li>

          <li className="active">
            <Link to="/sales">
              <i className="fa-solid fa-cart-shopping"></i>
              <span>Sales</span>
            </Link>
          </li>

          <li>
            <Link to="/reports">
              <i className="fa-solid fa-chart-column"></i>
              <span>Reports</span>
            </Link>
          </li>

        </ul>

      </aside>

      <div className="main">

        <header>

          <div>
            <h1>Sales</h1>
            <p>Manage customer sales</p>
          </div>

          <button id="newSale">
            <i className="fa-solid fa-plus"></i>
            New Sale
          </button>

        </header>

        <div className="search">

          <i className="fa-solid fa-magnifying-glass"></i>

          <input
            type="text"
            placeholder="Search sales..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

        </div>

        <div className="table-container">

          <table>

            <thead>

              <tr>
                <th>ID</th>
                <th>Product</th>
                <th>SKU</th>
                <th>Quantity</th>
                <th>Price</th>
                <th>Total</th>
                <th>Date</th>
              </tr>

            </thead>

            <tbody>
                              {filteredSales.length > 0 ? (
                filteredSales.map((sale) => (
                  <tr key={sale.id}>

                    <td>{sale.id}</td>

                    <td>{sale.name}</td>

                    <td>{sale.sku}</td>

                    <td>{sale.quantity}</td>

                    <td>₹{Number(sale.selling_price).toLocaleString()}</td>

                    <td>
                      ₹{Number(sale.total).toLocaleString()}
                    </td>

                    <td>
                      {new Date(sale.sale_date).toLocaleDateString()}
                    </td>

                  </tr>
                ))
              ) : (
                <tr>

                  <td colSpan="7" style={{ textAlign: "center" }}>
                    No Sales Found
                  </td>

                </tr>
              )}

            </tbody>

          </table>

        </div>

      </div>

    </div>
  );
}

export default Sales;