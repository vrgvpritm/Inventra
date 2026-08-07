import { useState, useEffect } from "react";
import api from "../api/axios";
import "./AddProduct.css";

function AddProduct({ closeModal, refresh }) {

    const [categories, setCategories] = useState([]);
    const [suppliers, setSuppliers] = useState([]);

    const [form, setForm] = useState({
        name: "",
        sku: "",
        category_id: "",
        supplier_id: "",
        price: "",
        stock: "",
        description: ""
    });
useEffect(() => {

    setCategories([
        { id: 10, name: "Electronics" },
        { id: 11, name: "Furniture" },
        { id: 12, name: "Stationery" },
        { id: 13, name: "Accessories" }
    ]);

    setSuppliers([
        { id: 5, supplier_name: "Tech World" },
         { id: 6, supplier_name: "DELL India" },
    ]);

}, []);

    const loadData = async () => {

        try {

            const categoryRes = await api.get("/categories");
            const supplierRes = await api.get("/suppliers");

            setCategories(categoryRes.data);
            setSuppliers(supplierRes.data);

        }

        catch (err) {

            console.log(err);

        }

    };

    const handleChange = (e) => {

        setForm({
            ...form,
            [e.target.name]: e.target.value
        });

    };

    const handleSubmit = async (e) => {

        e.preventDefault();

        try {

            await api.post("/products", form);

            refresh();

            closeModal();

        }

        catch (err) {

            alert("Unable to Add Product");

        }

    };

    return (

        <div className="modal">

            <div className="modal-content">

                <h2>Add Product</h2>

                <form onSubmit={handleSubmit}>

                    <input
                        name="name"
                        placeholder="Product Name"
                        onChange={handleChange}
                        required
                    />

                    <input
                        name="sku"
                        placeholder="SKU"
                        onChange={handleChange}
                        required
                    />

                    <select
                        name="category_id"
                        onChange={handleChange}
                        required
                    >

                        <option value="">Select Category</option>

                        {categories.map(category => (

                            <option
                                key={category.id}
                                value={category.id}
                            >
                                {category.name}
                            </option>

                        ))}

                    </select>

                    <select
                        name="supplier_id"
                        onChange={handleChange}
                        required
                    >

                        <option value="">Select Supplier</option>

                        {suppliers.map(supplier => (

                            <option
                                key={supplier.id}
                                value={supplier.id}
                            >
                                {supplier.supplier_name}
                            </option>

                        ))}

                    </select>

                    <input
                        type="number"
                        name="price"
                        placeholder="Price"
                        onChange={handleChange}
                        required
                    />

                    <input
                        type="number"
                        name="stock"
                        placeholder="Stock"
                        onChange={handleChange}
                        required
                    />

                    <textarea
                        name="description"
                        placeholder="Description"
                        onChange={handleChange}
                    />

                    <div className="modal-buttons">

                        <button type="submit">

                            Save

                        </button>

                        <button
                            type="button"
                            onClick={closeModal}
                        >

                            Cancel

                        </button>

                    </div>

                </form>

            </div>

        </div>

    );

}

export default AddProduct;