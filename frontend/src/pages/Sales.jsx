import { useState, useEffect } from "react";
import MainLayout from "../layouts/MainLayout";
import Navbar from "../components/Navbar";
import api from "../api/axios";
import "../styles/Sales.css";
import { FaPlus, FaMagnifyingGlass } from "react-icons/fa6";

function Sales() {

    const [sales, setSales] = useState([]);
    const [search, setSearch] = useState("");

    useEffect(() => {

        fetchSales();

    }, []);

    const fetchSales = async () => {

        try {

            const res = await api.get("/sales");

            setSales(res.data);

        }

        catch (err) {

            console.log(err);

            alert("Unable to load sales");

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

        <MainLayout>

            <Navbar
                title="Sales"
                subtitle="Manage customer sales"
            />

            <div className="toolbar">

                <div className="search">

                    <FaMagnifyingGlass />

                    <input
                        type="text"
                        placeholder="Search sales..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />

                </div>

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

                        {

                            filteredSales.length > 0 ?

                                filteredSales.map((sale) => (

                                    <tr key={sale.id}>

                                        <td>{sale.id}</td>

                                        <td>{sale.name}</td>

                                        <td>{sale.sku}</td>

                                        <td>{sale.quantity}</td>

                                        <td>

                                            ₹{Number(sale.selling_price).toLocaleString()}

                                        </td>

                                        <td>

                                            ₹{Number(sale.total).toLocaleString()}

                                        </td>

                                        <td>

                                            {new Date(sale.sale_date).toLocaleDateString()}

                                        </td>

                                    </tr>

                                ))

                                :

                                <tr>

                                    <td
                                        colSpan="7"
                                        className="loading"
                                    >

                                        No Sales Found

                                    </td>

                                </tr>

                        }

                    </tbody>

                </table>

            </div>

        </MainLayout>

    );

}

export default Sales;