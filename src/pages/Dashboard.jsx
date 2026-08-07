import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import Navbar from "../components/Navbar";
import api from "../api/axios";
import "../styles/Dashboard.css";

function Dashboard() {

    const navigate = useNavigate();

    const [dashboard, setDashboard] = useState({
        totalProducts: 0,
        totalSuppliers: 0,
        totalSales: 0,
        revenue: 0,
        lowStock: 0
    });

    const [loading, setLoading] = useState(true);

    useEffect(() => {

        loadDashboard();

    }, []);

    const loadDashboard = async () => {

        try {

            const res = await api.get("/dashboard");

            setDashboard(res.data);

        }

        catch (err) {

            console.log(err);

        }

        finally {

            setLoading(false);

        }

    };

    if (loading) {

        return (

            <MainLayout>

                <Navbar
                    title="Dashboard"
                    subtitle="Welcome back to Inventra"
                />

                <div className="loading">

                    Loading Dashboard...

                </div>

            </MainLayout>

        );

    }

    return (

        <MainLayout>

            <Navbar
                title="Dashboard"
                subtitle="Welcome back to Inventra"
            />

            <section className="cards">

                <div
                    className="card"
                    onClick={() => navigate("/products")}
                >

                    <h3>Total Products</h3>

                    <h2>{dashboard.totalProducts}</h2>

                </div>

                <div
                    className="card"
                    onClick={() => navigate("/suppliers")}
                >

                    <h3>Total Suppliers</h3>

                    <h2>{dashboard.totalSuppliers}</h2>

                </div>

                <div
                    className="card"
                    onClick={() => navigate("/sales")}
                >

                    <h3>Total Sales</h3>

                    <h2>{dashboard.totalSales}</h2>

                </div>

                <div className="card">
    <h3>Total Revenue</h3>
    <h2>₹{Number(dashboard.revenue).toLocaleString()}</h2>
</div>
            </section>

            <section className="cards second-row">

                <div
                    className="card warning-card"
                    onClick={() => navigate("/low-stock")}
                >

                    <h3>Low Stock Products</h3>

                    <h2>{dashboard.lowStock}</h2>

                </div>

            </section>

        </MainLayout>

    );

}

export default Dashboard;