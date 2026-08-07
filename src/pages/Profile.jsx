import { useEffect, useState } from "react";
import api from "../api/axios";
import MainLayout from "../layouts/MainLayout";
import Navbar from "../components/Navbar";
import "../styles/Profile.css";
import profilePic from "../assets/Author.jpg";
function Profile() {

    const [profile, setProfile] = useState({
        username: "",
        email: "",
        role: "Administrator"
    });

    const [loading, setLoading] = useState(true);

    useEffect(() => {

        loadProfile();

    }, []);

    const loadProfile = async () => {

        try {

            const res = await api.get("/profile");

            setProfile({
                username: res.data.username || "",
                email: res.data.email || "",
                role: res.data.role || "Administrator"
            });

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
                title="Profile"
                subtitle="Manage your account"
            />

            <div className="profile-card">

                <div className="profile-image">

                   <img
    src={profilePic}
    alt="Profile"
/>

                </div>

                <div className="profile-details">

                    <div className="profile-item">

                        <label>Username</label>

                        <input
                            type="text"
                            value={loading ? "Loading..." : profile.username}
                            readOnly
                        />

                    </div>

                    <div className="profile-item">

                        <label>Email</label>

                        <input
                            type="email"
                            value={loading ? "Loading..." : profile.email}
                            readOnly
                        />

                    </div>

                    <div className="profile-item">

                        <label>Role</label>

                        <input
                            type="text"
                            value={profile.role}
                            readOnly
                        />

                    </div>

                </div>

            </div>

        </MainLayout>

    );

}

export default Profile;