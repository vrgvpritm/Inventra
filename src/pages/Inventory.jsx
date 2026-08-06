import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import {
  FaCubesStacked,
  FaHouse,
  FaBox,
  FaWarehouse,
  FaTruck,
  FaCartShopping,
  FaChartColumn,
  FaGear
} from "react-icons/fa6";
import "./Inventory.css";

export default function Inventory() {

  const [inventory, setInventory] = useState([]);
  const [stats, setStats] = useState({
    totalStock: 0,
    lowStock: 0,
    outOfStock: 0,
    totalValue: 0
  });

  useEffect(() => {
    fetchInventory();
  }, []);

  const fetchInventory = async () => {
    try {

      const res = await axios.get(
        "http://localhost:5000/api/inventory"
      );

      setInventory(res.data);

      let totalStock = 0;
      let lowStock = 0;
      let outOfStock = 0;
      let totalValue = 0;

      res.data.forEach(item => {

        totalStock += Number(item.stock);

        totalValue += Number(item.stock) * Number(item.price);

        if (item.stock === 0) outOfStock++;

        else if (item.stock <= item.minimum_stock)
          lowStock++;

      });

      setStats({
        totalStock,
        lowStock,
        outOfStock,
        totalValue
      });

    } catch (err) {
      console.log(err);
    }
  };

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

<li className="active">
<Link to="/inventory">
<FaWarehouse />
<span>Inventory</span>
</Link>
</li>

<li>
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
<h1>Inventory</h1>
<p>Monitor stock availability</p>
</div>

</header>

<section className="cards">

<div className="card">
<h3>Total Stock</h3>
<h2>{stats.totalStock}</h2>
</div>

<div className="card">
<h3>Low Stock</h3>
<h2>{stats.lowStock}</h2>
</div>

<div className="card">
<h3>Out of Stock</h3>
<h2>{stats.outOfStock}</h2>
</div>

<div className="card">
<h3>Total Value</h3>
<h2>₹{stats.totalValue.toLocaleString()}</h2>
</div>

</section>

<div className="table-container">

<table>

<thead>

<tr>
<th>SKU</th>
<th>Product</th>
<th>Available</th>
<th>Minimum</th>
<th>Status</th>
</tr>

</thead>

<tbody>

{inventory.map(item=>{

let statusClass="available";
let statusText="In Stock";

if(item.stock===0){

statusClass="out";
statusText="Out of Stock";

}
else if(item.stock<=item.minimum_stock){

statusClass="low";
statusText="Low Stock";

}

return(

<tr key={item.id}>

<td>{item.sku}</td>

<td>{item.name}</td>

<td>{item.stock}</td>

<td>{item.minimum_stock}</td>

<td>

<span className={statusClass}>
{statusText}
</span>

</td>

</tr>

);

})}

</tbody>

</table>

</div>

</div>

</div>

  );

}