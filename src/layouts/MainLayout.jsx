import Sidebar from "../components/Sidebar";
import "./MainLayout.css";

function MainLayout({ children }) {

    return (

        <div className="container">

            <Sidebar />

            <main className="main">

                {children}

            </main>

        </div>

    );

}

export default MainLayout;