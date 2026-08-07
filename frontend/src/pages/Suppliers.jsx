import { useEffect, useState } from "react";
import MainLayout from "../layouts/MainLayout";
import Navbar from "../components/Navbar";
import api from "../api/axios";
import "../styles/Suppliers.css";
import {
    FaMagnifyingGlass,
    FaPlus,
    FaPen,
    FaTrash
} from "react-icons/fa6";

export default function Suppliers() {

    const [suppliers, setSuppliers] = useState([]);
    const [search, setSearch] = useState("");

    useEffect(() => {

        loadSuppliers();

    }, []);

    const loadSuppliers = async () => {

        try {

            const res = await api.get("/suppliers");

            setSuppliers(res.data);

        }

        catch (err) {

            console.log(err);

        }

    };

    const deleteSupplier = async (id) => {

        if (!window.confirm("Delete this supplier?")) return;

        try {

            await api.delete(`/suppliers/${id}`);

            loadSuppliers();

        }

        catch (err) {

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

        <MainLayout>

            <Navbar
                title="Suppliers"
                subtitle="Manage supplier information"
            />

            <div className="toolbar">

                <div className="search">

                    <FaMagnifyingGlass />

                    <input
                        type="text"
                        placeholder="Search suppliers..."
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
                            <th>Supplier</th>
                            <th>Email</th>
                            <th>Phone</th>
                            <th>Location</th>
                            <th>Actions</th>

                        </tr>

                    </thead>

                    <tbody>

                        {

                            filteredSuppliers.length > 0 ?

                                filteredSuppliers.map((supplier) => (

                                    <tr key={supplier.id}>

                                        <td>{supplier.id}</td>

                                        <td>{supplier.name}</td>

                                        <td>{supplier.email}</td>

                                        <td>{supplier.phone}</td>

                                        <td>{supplier.location}</td>

                                        <td>

                                            <button
                                                className="action-btn edit-btn"
                                                disabled
                                            >

                                                <FaPen />

                                            </button>

                                            <button
                                                className="action-btn delete-btn"
                                                onClick={() => deleteSupplier(supplier.id)}
                                            >

                                                <FaTrash />

                                            </button>

                                        </td>

                                    </tr>

                                ))

                                :

                                <tr>

                                    <td
                                        colSpan="6"
                                        className="loading"
                                    >

                                        No Suppliers Found

                                    </td>

                                </tr>

                        }

                    </tbody>

                </table>

            </div>

        </MainLayout>

    );

}