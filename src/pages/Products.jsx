import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import {
FaHouse,
FaBox,
FaWarehouse,
FaTruck,
FaCartShopping,
FaChartColumn,
FaGear,
FaPlus,
FaMagnifyingGlass,
FaPen,
FaTrash,
FaCubesStacked
} from "react-icons/fa6";
import "./products.css";

const API = "http://localhost:5000/api/products";

export default function Products(){

const [products,setProducts]=useState([]);
const [filteredProducts,setFilteredProducts]=useState([]);
const [showModal,setShowModal]=useState(false);
const [editId,setEditId]=useState(null);

const [form,setForm]=useState({
name:"",
sku:"",
category_id:10,
supplier_id:4,
price:"",
stock:"",
description:""
});

const [search,setSearch]=useState("");
const [category,setCategory]=useState("All");

useEffect(()=>{
loadProducts();
},[]);

useEffect(()=>{
filterProducts();
},[products,search,category]);

const loadProducts=async()=>{

try{

const res=await axios.get(API);

setProducts(res.data);

}

catch(err){

console.log(err);

}

};

const filterProducts=()=>{

let data=[...products];

if(search!==""){

data=data.filter(product=>

product.name.toLowerCase().includes(search.toLowerCase()) ||

product.sku.toLowerCase().includes(search.toLowerCase())

);

}

if(category!=="All"){

data=data.filter(product=>product.category===category);

}

setFilteredProducts(data);

};

const openAddModal=()=>{

setEditId(null);

setForm({

name:"",
sku:"",
category_id:10,
supplier_id:4,
price:"",
stock:"",
description:""

});

setShowModal(true);

};

const handleChange=e=>{

setForm({

...form,

[e.target.name]:e.target.value

});

};

const saveProduct=async(e)=>{

e.preventDefault();

try{

if(editId){

await axios.put(`${API}/${editId}`,form);

}

else{

await axios.post(API,form);

}

setShowModal(false);

loadProducts();

}

catch(err){

console.log(err);

alert("Something went wrong");

}

};

const editProduct=product=>{

setEditId(product.id);

setForm({

name:product.name,
sku:product.sku,
category_id:product.category_id || 10,
supplier_id:product.supplier_id || 4,
price:product.price,
stock:product.stock,
description:product.description || ""

});

setShowModal(true);

};

const deleteProduct=async(id)=>{

if(!window.confirm("Delete this product?")) return;

try{

await axios.delete(`${API}/${id}`);

loadProducts();

}

catch(err){

console.log(err);

}

};

return(

<div className="container">

<aside className="sidebar">

<div className="logo">

<FaCubesStacked/>

<h2>Inventra</h2>

</div>

<ul>

<li>
<li>

<Link to="/dashboard">

<FaHouse/>

<span>Dashboard</span>

</Link>

</li>

<li className="active">

<Link to="/products">

<FaBox/>

<span>Products</span>

</Link>

</li>

<li>

<Link to="/inventory">

<FaWarehouse/>

<span>Inventory</span>

</Link>

</li>

<li>

<Link to="/suppliers">

<FaTruck/>

<span>Suppliers</span>

</Link>

</li>

<li>

<Link to="/sales">

<FaCartShopping/>

<span>Sales</span>

</Link>

</li>

<li>

<Link to="/reports">

<FaChartColumn/>

<span>Reports</span>

</Link>

</li>

<li>

<Link to="/settings">

<FaGear/>

<span>Settings</span>

</Link>

</li>

</ul>

</aside>

<div className="main">

<header>

<div>

<h1>Products</h1>

<p>Manage all products stored in Inventra</p>

</div>

<button id="addProductBtn" onClick={openAddModal}>

<FaPlus/>

&nbsp;

Add Product

</button>

</header>

<div className="toolbar">

<div className="search">

<FaMagnifyingGlass/>

<input

type="text"

placeholder="Search Products..."

value={search}

onChange={(e)=>setSearch(e.target.value)}

/>

</div>

<select

value={category}

onChange={(e)=>setCategory(e.target.value)}

>

<option value="All">All Categories</option>

<option value="Electronics">Electronics</option>

<option value="Furniture">Furniture</option>

<option value="Accessories">Accessories</option>

<option value="Stationery">Stationery</option>

</select>

</div>

<div className="table-container">

<table>

<thead>

<tr>

<th>ID</th>
<th>SKU</th>
<th>Name</th>
<th>Category</th>
<th>Supplier</th>
<th>Price</th>
<th>Stock</th>
<th>Status</th>
<th>Actions</th>

</tr>

</thead>

<tbody>{filteredProducts.map((product)=>(

<tr key={product.id}>

<td>{product.id}</td>

<td>{product.sku}</td>

<td>{product.name}</td>

<td>{product.category}</td>

<td>{product.supplier}</td>

<td>₹{Number(product.price).toLocaleString()}</td>

<td>{product.stock}</td>

<td>

<span className={product.stock>20?"available":"low"}>

{product.stock>20?"Available":"Low Stock"}

</span>

</td>

<td>

<button
className="action-btn edit-btn"
onClick={()=>editProduct(product)}
>

<FaPen/>

</button>

<button
className="action-btn delete-btn"
onClick={()=>deleteProduct(product.id)}
>

<FaTrash/>

</button>

</td>

</tr>

))}

</tbody>

</table>

</div>

{showModal && (

<div className="modal show">

<div className="modal-content">

<h2>

{editId ? "Edit Product" : "Add Product"}

</h2>

<form onSubmit={saveProduct}>

<div className="form-group">

<label>Product Name</label>

<input
type="text"
name="name"
value={form.name}
onChange={handleChange}
required
/>

</div>

<div className="form-group">

<label>SKU</label>

<input
type="text"
name="sku"
value={form.sku}
onChange={handleChange}
required
/>

</div>

<div className="form-group">

<label>Category</label>

<select
name="category_id"
value={form.category_id}
onChange={handleChange}
>

<option value="10">Electronics</option>
<option value="13">Accessories</option>
<option value="11">Furniture</option>
<option value="12">Stationery</option>

</select>

</div>

<div className="form-group">

<label>Supplier</label>

<select
name="supplier_id"
value={form.supplier_id}
onChange={handleChange}
>

<option value="4">ABC Technologies</option>
<option value="5">Tech World</option>

</select>

</div>

<div className="form-row">

<div className="form-group">

<label>Price</label>

<input
type="number"
name="price"
value={form.price}
onChange={handleChange}
required
/>

</div>

<div className="form-group">

<label>Stock</label>

<input
type="number"
name="stock"
value={form.stock}
onChange={handleChange}
required
/>

</div>

</div>

<div className="form-group">

<label>Description</label>

<textarea
name="description"
rows="4"
value={form.description}
onChange={handleChange}
/>

</div>

<div className="modal-buttons">

<button
type="button"
className="secondary-btn"
onClick={()=>setShowModal(false)}
>

Cancel

</button>

<button
type="submit"
className="primary-btn"
>

{editId ? "Update Product" : "Save Product"}

</button>

</div>

</form>

</div>

</div>

)}

</div>

</div>

);

}