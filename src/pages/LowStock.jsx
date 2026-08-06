import { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import axios from "axios";
import { FaExclamationTriangle } from "react-icons/fa";
import "./LowStock.css";

const API_URL = "http://localhost:5000/api/low-stock";

function LowStock() {

    const [products, setProducts] = useState([]);

    useEffect(() => {
        loadProducts();
    }, []);

    const loadProducts = async () => {
        try {
            const res = await axios.get(API_URL);
            setProducts(res.data);
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <div className="container">

            <Sidebar />

            <div className="main">

                <header>

                    <div>
                        <h1>Low Stock Products</h1>
                        <p>Products that need immediate restocking</p>
                    </div>

                </header>

                <div className="table-container">

                    <table>

                        <thead>

                            <tr>
                                <th>ID</th>
                                <th>SKU</th>
                                <th>Product</th>
                                <th>Category</th>
                                <th>Stock</th>
                                <th>Status</th>
                            </tr>

                        </thead>

                        <tbody>

                            {products.length > 0 ? (

                                products.map(product => (

                                    <tr key={product.id}>

                                        <td>{product.id}</td>

                                        <td>{product.sku}</td>

                                        <td>{product.name}</td>

                                        <td>{product.category}</td>

                                        <td>{product.stock}</td>

                                        <td>

                                            <span className="low-stock">

                                                <FaExclamationTriangle />

                                                Low Stock

                                            </span>

                                        </td>

                                    </tr>

                                ))

                            ) : (

                                <tr>

                                    <td colSpan="6" className="empty">

                                        No Low Stock Products

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

export default LowStock;