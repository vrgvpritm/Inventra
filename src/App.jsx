import {
    BrowserRouter,
    Routes,
    Route,
    Navigate
} from "react-router-dom";

import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Products from "./pages/Products";
import Inventory from "./pages/Inventory";
import Suppliers from "./pages/Suppliers";
import Sales from "./pages/Sales";
import LowStock from "./pages/LowStock";
import Settings from "./pages/Settings";
import Profile from "./pages/Profile";

function PrivateRoute({ children }) {

    const token = localStorage.getItem("token");

    return token
        ? children
        : <Navigate to="/" replace />;

}

function PublicRoute({ children }) {

    const token = localStorage.getItem("token");

    return token
        ? <Navigate to="/dashboard" replace />
        : children;

}

function App() {

    return (

        <BrowserRouter>

            <Routes>

                <Route
                    path="/"
                    element={
                        <PublicRoute>
                            <Login />
                        </PublicRoute>
                    }
                />

                <Route
                    path="/register"
                    element={
                        <PublicRoute>
                            <Register />
                        </PublicRoute>
                    }
                />

                <Route
                    path="/dashboard"
                    element={
                        <PrivateRoute>
                            <Dashboard />
                        </PrivateRoute>
                    }
                />

                <Route
                    path="/products"
                    element={
                        <PrivateRoute>
                            <Products />
                        </PrivateRoute>
                    }
                />

                <Route
                    path="/inventory"
                    element={
                        <PrivateRoute>
                            <Inventory />
                        </PrivateRoute>
                    }
                />

                <Route
                    path="/suppliers"
                    element={
                        <PrivateRoute>
                            <Suppliers />
                        </PrivateRoute>
                    }
                />

                <Route
                    path="/sales"
                    element={
                        <PrivateRoute>
                            <Sales />
                        </PrivateRoute>
                    }
                />

                <Route
                    path="/low-stock"
                    element={
                        <PrivateRoute>
                            <LowStock />
                        </PrivateRoute>
                    }
                />

                <Route
                    path="/settings"
                    element={
                        <PrivateRoute>
                            <Settings />
                        </PrivateRoute>
                    }
                />

                <Route
                    path="/profile"
                    element={
                        <PrivateRoute>
                            <Profile />
                        </PrivateRoute>
                    }
                />

                <Route
                    path="*"
                    element={<Navigate to="/" replace />}
                />

            </Routes>

        </BrowserRouter>

    );

}

export default App;