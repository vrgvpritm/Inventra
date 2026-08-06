import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Products from "./pages/Products";
import Inventory from "./pages/Inventory";
import Suppliers from "./pages/Suppliers";
import Sales from "./pages/Sales";
import Reports from "./pages/Reports";
import LowStock from "./pages/LowStock";

function App() {

  const token = localStorage.getItem("token");

  return (

    <BrowserRouter>

      <Routes>

        <Route
          path="/"
          element={token ? <Navigate to="/dashboard" /> : <Login />}
        />

        <Route
          path="/dashboard"
          element={token ? <Dashboard /> : <Navigate to="/" />}
        />

        <Route
          path="/products"
          element={token ? <Products /> : <Navigate to="/" />}
        />

        <Route
          path="/inventory"
          element={token ? <Inventory /> : <Navigate to="/" />}
        />

        <Route
          path="/suppliers"
          element={token ? <Suppliers /> : <Navigate to="/" />}
        />

        <Route
          path="/sales"
          element={token ? <Sales /> : <Navigate to="/" />}
        />

        <Route
          path="/reports"
          element={token ? <Reports /> : <Navigate to="/" />}
        />

        <Route
          path="/low-stock"
          element={token ? <LowStock /> : <Navigate to="/" />}
        />

      </Routes>

    </BrowserRouter>

  );

}

export default App;