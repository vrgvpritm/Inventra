import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "./Reports.css";

function Reports() {

  const [report, setReport] = useState([]);
  const [summary, setSummary] = useState({
    revenue: 0,
    sales: 0,
    products: 0,
    lowStock: 0,
  });

  useEffect(() => {
    loadReports();
  }, []);

  const loadReports = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/reports");

      if (Array.isArray(res.data)) {
        setReport(res.data);
      }

      if (!Array.isArray(res.data)) {
        setSummary({
          revenue: res.data.revenue || 0,
          sales: res.data.sales || 0,
          products: res.data.products || 0,
          lowStock: res.data.lowStock || 0,
        });
      }

    } catch (err) {
      console.log(err);
    }
  };

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

          <li>
            <Link to="/sales">
              <i className="fa-solid fa-cart-shopping"></i>
              <span>Sales</span>
            </Link>
          </li>

          <li className="active">
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
            <h1>Reports</h1>
            <p>View business insights and analytics</p>
          </div>

          <button
            id="downloadReport"
            onClick={() => alert("Export feature coming soon")}
          >
            <i className="fa-solid fa-download"></i>
            Export Report
          </button>

        </header>

        <section className="cards">

          <div className="card">
            <h3>Total Revenue</h3>
            <h2>₹{summary.revenue}</h2>
          </div>

          <div className="card">
            <h3>Total Sales</h3>
            <h2>{summary.sales}</h2>
          </div>

          <div className="card">
            <h3>Total Products</h3>
            <h2>{summary.products}</h2>
          </div>

          <div className="card">
            <h3>Low Stock</h3>
            <h2>{summary.lowStock}</h2>
          </div>

        </section>

        <div className="table-container">

          <table>

            <thead>

              <tr>
                <th>Month</th>
                <th>Sales</th>
                <th>Revenue</th>
                <th>Orders</th>
              </tr>

            </thead>

            <tbody>
                              {report.length > 0 ? (
                report.map((item, index) => (
                  <tr key={index}>
                    <td>{item.month}</td>
                    <td>{item.sales}</td>
                    <td>₹{item.revenue}</td>
                    <td>{item.orders}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="4" style={{ textAlign: "center", padding: "20px" }}>
                    No Reports Available
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

export default Reports;