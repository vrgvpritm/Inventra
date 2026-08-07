import { useEffect, useState } from "react";
import api from "../api/axios";
import MainLayout from "../layouts/MainLayout";
import Navbar from "../components/Navbar";
import "../styles/Settings.css";

function Settings() {

    const [settings, setSettings] = useState({
        companyName: "",
        email: "",
        phone: "",
        address: "",
        currency: "INR"
    });

    const [loading, setLoading] = useState(true);

    useEffect(() => {

        loadSettings();

    }, []);

    const loadSettings = async () => {

        try {

            const res = await api.get("/settings");

            setSettings({
                companyName: res.data.companyName || "Inventra",
                email: res.data.email || "admin@inventra.com",
                phone: res.data.phone || "+91 9876543210",
                address: res.data.address || "Guwahati, Assam",
                currency: res.data.currency || "INR"
            });

        }

        catch (err) {

            console.log(err);

            setSettings({
                companyName: "Inventra",
                email: "admin@inventra.com",
                phone: "+91 9876543210",
                address: "Guwahati, Assam",
                currency: "INR"
            });

        }

        finally {

            setLoading(false);

        }

    };

    const handleChange = (e) => {

        setSettings({
            ...settings,
            [e.target.name]: e.target.value
        });

    };

    const handleSave = async () => {

        try {

            await api.put("/settings", settings);

            alert("Settings Saved Successfully");

        }

        catch (err) {

            console.log(err);

            alert("Unable to save settings");

        }

    };

    return (

        <MainLayout>

            <Navbar
                title="Settings"
                subtitle="Manage your application settings"
            />

            <div className="settings-container">

                <div className="settings-card">

                    <h2>Company Information</h2>

                    <div className="form-group">

                        <label>Company Name</label>

                        <input
                            type="text"
                            name="companyName"
                            value={loading ? "" : settings.companyName}
                            onChange={handleChange}
                        />

                    </div>

                    <div className="form-group">

                        <label>Email</label>

                        <input
                            type="email"
                            name="email"
                            value={loading ? "" : settings.email}
                            onChange={handleChange}
                        />

                    </div>

                    <div className="form-group">

                        <label>Phone</label>

                        <input
                            type="text"
                            name="phone"
                            value={loading ? "" : settings.phone}
                            onChange={handleChange}
                        />

                    </div>

                    <div className="form-group">

                        <label>Address</label>

                        <input
                            type="text"
                            name="address"
                            value={loading ? "" : settings.address}
                            onChange={handleChange}
                        />

                    </div>

                    <div className="form-group">

                        <label>Currency</label>

                        <select
                            name="currency"
                            value={settings.currency}
                            onChange={handleChange}
                        >

                            <option value="INR">INR (₹)</option>
                            <option value="USD">USD ($)</option>
                            <option value="EUR">EUR (€)</option>

                        </select>

                    </div>

                    <button
                        className="save-btn"
                        onClick={handleSave}
                    >

                        Save Changes

                    </button>

                </div>

            </div>

        </MainLayout>

    );

}

export default Settings;