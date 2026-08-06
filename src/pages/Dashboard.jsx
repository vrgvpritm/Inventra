import { useEffect, useState } from "react";
import axios from "axios";
import {
FaCubes,
FaBox,
FaTruck,
FaIndianRupeeSign,
FaTriangleExclamation,
FaBell,
FaSignOutAlt
} from "react-icons/fa";
import "./dashboard.css";

function Dashboard() {

const [data,setData]=useState({
totalProducts:0,
totalSuppliers:0,
totalSales:0,
revenue:0,
lowStock:0
});

useEffect(()=>{

loadDashboard();

},[]);

const loadDashboard=async()=>{

try{

const res=await axios.get("http://localhost:5000/api/dashboard");

setData(res.data);

}

catch(err){

console.log(err);

}

};

return(

<div className="container">

<aside className="sidebar">

<div>

<div className="logo">

<FaCubes/>

<h2>Inventra</h2>

</div>

<ul>

<li className="active">
<a href="/dashboard">
<FaBox/>
<span>Dashboard</span>
</a>
</li>

<li>
<a href="/products">
<FaBox/>
<span>Products</span>
</a>
</li>

<li>
<a href="/inventory">
<FaBox/>
<span>Inventory</span>
</a>
</li>

<li>
<a href="/suppliers">
<FaTruck/>
<span>Suppliers</span>
</a>
</li>

<li>
<a href="/sales">
<FaIndianRupeeSign/>
<span>Sales</span>
</a>
</li>

</ul>

</div>

<div className="logout">

<FaSignOutAlt/>

<span>Logout</span>

</div>

</aside>

<div className="main">

<header>

<div>

<h1>Dashboard</h1>

<p>Welcome Back</p>

</div>

<div className="top-right">

<div className="notification">

<FaBell/>

<span>3</span>

</div>

<div className="profile">

<img
src="https://i.pravatar.cc/100"
alt=""
/>

<div>

<h4>Admin</h4>

<p>Administrator</p>

</div>

</div>

</div>

</header>

<section className="cards">

<div className="card">

<div>

<h3>Total Products</h3>

<h2>{data.totalProducts}</h2>

</div>

<FaBox/>

</div>

<div className="card">

<div>

<h3>Revenue</h3>

<h2>₹{Number(data.revenue).toLocaleString()}</h2>

</div>

<FaIndianRupeeSign/>

</div>

<div className="card">

<div>

<h3>Suppliers</h3>

<h2>{data.totalSuppliers}</h2>

</div>

<FaTruck/>

</div>

<div className="card">

<div>

<h3>Low Stock</h3>

<h2>{data.lowStock}</h2>

</div>

<FaTriangleExclamation/>

</div>

</section>

<section className="content">

<div className="chart">

<h2>Dashboard Summary</h2>

<div
style={{
display:"flex",
justifyContent:"center",
alignItems:"center",
height:"350px",
fontSize:"22px",
fontWeight:"600",
color:"#64748b"
}}
>

Inventory Chart Coming From Database

</div>

</div>

<div className="recent">

<h2>Summary</h2>

<table>

<tbody>

<tr>

<td>Total Products</td>

<td>{data.totalProducts}</td>

</tr>

<tr>

<td>Total Suppliers</td>

<td>{data.totalSuppliers}</td>

</tr>

<tr>

<td>Total Sales</td>

<td>{data.totalSales}</td>

</tr>

<tr>

<td>Revenue</td>

<td>₹{Number(data.revenue).toLocaleString()}</td>

</tr>

<tr>

<td>Low Stock</td>

<td>{data.lowStock}</td>

</tr>

</tbody>

</table>

</div>

</section>

</div>

</div>

);

}

export default Dashboard;