import { useEffect, useState } from "react";
import api from "../api/axios";
import MainLayout from "../layouts/MainLayout";
import Navbar from "../components/Navbar";
import "../styles/LowStock.css";

function LowStock() {

    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {

        fetchLowStock();

    }, []);

    const fetchLowStock = async () => {

        try {

            const res = await api.get("/low-stock");

            setProducts(res.data);

        }

        catch (err) {

            console.log(err);

        }

        finally {

            setLoading(false);

        }

    };

    return (

        <MainLayout>

            <Navbar
                title="Low Stock"
                subtitle="Products that require immediate restocking"
            />

            <div className="table-container">

                <table>

                    <thead>

                        <tr>

                            <th>#</th>
                            <th>SKU</th>
                            <th>Product</th>
                            <th>Category</th>
                            <th>Price</th>
                            <th>Stock</th>
                            <th>Status</th>

                        </tr>

                    </thead>

                    <tbody>

                        {

                            loading ?

                                <tr>

                                    <td
                                        colSpan="7"
                                        className="loading"
                                    >

                                        Loading products...

                                    </td>

                                </tr>

                                :

                                products.length > 0 ?

                                    products.map((product, index) => (

                                        <tr key={product.id}>

                                            <td>{index + 1}</td>

                                            <td>{product.sku || "-"}</td>

                                            <td>{product.name}</td>

                                            <td>{product.category || "-"}</td>

                                            <td>

                                                ₹{Number(product.price).toLocaleString()}

                                            </td>

                                            <td>{product.stock}</td>

                                            <td>

                                                <span className="low">

                                                    Low Stock

                                                </span>

                                            </td>

                                        </tr>

                                    ))

                                    :

                                    <tr>

                                        <td
                                            colSpan="7"
                                            className="loading"
                                        >

                                            No low stock products found.

                                        </td>

                                    </tr>

                        }

                    </tbody>

                </table>

            </div>

        </MainLayout>

    );

}

export default LowStock;