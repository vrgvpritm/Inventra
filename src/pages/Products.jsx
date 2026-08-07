import { useState, useEffect } from "react";
import MainLayout from "../layouts/MainLayout";
import Navbar from "../components/Navbar";
import AddProduct from "../components/AddProduct";
import api from "../api/axios";
import "../styles/Products.css";
import {
    FaPlus,
    FaPen,
    FaTrash,
    FaMagnifyingGlass
} from "react-icons/fa6";

function Products() {

    const [products, setProducts] = useState([]);
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [search, setSearch] = useState("");
    const [category, setCategory] = useState("All");

    useEffect(() => {

        loadProducts();

    }, []);

    useEffect(() => {

        filterProducts();

    }, [products, search, category]);

    const loadProducts = async () => {

        try {

            const res = await api.get("/products");

            setProducts(res.data);

        }

        catch (err) {

            console.log(err);

        }

    };

    const filterProducts = () => {

        let data = [...products];

        if (search) {

            data = data.filter(product =>

                product.name.toLowerCase().includes(search.toLowerCase()) ||

                product.sku.toLowerCase().includes(search.toLowerCase())

            );

        }

        if (category !== "All") {

            data = data.filter(product =>

                product.category === category

            );

        }

        setFilteredProducts(data);

    };

    const deleteProduct = async (id) => {

        if (!window.confirm("Delete this product?")) return;

        try {

            await api.delete(`/products/${id}`);

            loadProducts();

        }

        catch (err) {

            console.log(err);

        }

    };
    return (

    <MainLayout>

        <Navbar
            title="Products"
            subtitle="Manage all products stored in Inventra"
        />

        <div className="toolbar">

            <div className="search">

                <FaMagnifyingGlass />

                <input
                    type="text"
                    placeholder="Search Products..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />

            </div>

            <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
            >

                <option value="All">All Categories</option>
                <option value="Electronics">Electronics</option>
                <option value="Furniture">Furniture</option>
                <option value="Accessories">Accessories</option>
                <option value="Stationery">Stationery</option>

            </select>

            <button
                className="add-btn"
                onClick={() => setShowModal(true)}
            >

                <FaPlus />

                Add Product

            </button>

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

                <tbody>

                    {

                        filteredProducts.length > 0 ?

                            filteredProducts.map(product => (

                                <tr key={product.id}>

                                    <td>{product.id}</td>

                                    <td>{product.sku}</td>

                                    <td>{product.name}</td>

                                    <td>{product.category}</td>

                                    <td>{product.supplier}</td>

                                    <td>

                                        ₹{Number(product.price).toLocaleString()}

                                    </td>

                                    <td>{product.stock}</td>

                                    <td>

                                        <span
                                            className={
                                                product.stock > 20
                                                    ? "available"
                                                    : "low"
                                            }
                                        >

                                            {

                                                product.stock > 20
                                                    ? "Available"
                                                    : "Low Stock"

                                            }

                                        </span>

                                    </td>

                                    <td>
<button
    className="action-btn edit-btn"
    disabled
>

    <FaPen />

</button>
                                        <button
                                            className="action-btn delete-btn"
                                            onClick={() => deleteProduct(product.id)}
                                        >

                                            <FaTrash />

                                        </button>

                                    </td>

                                </tr>

                            ))

                            :

                            <tr>

                                <td
                                    colSpan="9"
                                    className="loading"
                                >

                                    No Products Found

                                </td>

                            </tr>

                    }

                </tbody>

            </table>

        </div>

        {

            showModal &&

            <AddProduct
                closeModal={() => setShowModal(false)}
                refresh={loadProducts}
            />

        }

    </MainLayout>

);

}

export default Products;