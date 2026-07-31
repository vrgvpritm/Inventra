const API_URL = "http://localhost:5000/api/products";

const tableBody = document.querySelector("tbody");
const searchInput = document.querySelector(".search input");
const categoryFilter = document.querySelector("#categoryFilter");
const addBtn = document.getElementById("addProduct");

const modal = document.getElementById("productModal");
const closeModal = document.getElementById("closeModal");
const productForm = document.getElementById("productForm");

let editId = null;
let products = [];

loadProducts();

async function loadProducts() {

    try {

        const response = await fetch(API_URL);
        products = await response.json();

        renderProducts(products);

    } catch (error) {

        console.log(error);
        alert("Cannot connect to backend");

    }

}

function renderProducts(data) {

    tableBody.innerHTML = "";

    data.forEach(product => {

        const status = product.stock > 20
            ? `<span class="available">Available</span>`
            : `<span class="low">Low Stock</span>`;

        tableBody.innerHTML += `
        <tr>

            <td>
                <img src="https://placehold.co/60x60" alt="">
            </td>

            <td>${product.sku}</td>

            <td>${product.name}</td>

            <td>${product.category}</td>

            <td>${product.stock}</td>

            <td>₹${Number(product.price).toLocaleString()}</td>

            <td>${status}</td>

            <td>

                <button class="action-btn edit-btn" onclick="editProduct(${product.id})">
                    <i class="fa-solid fa-pen"></i>
                </button>

                <button class="action-btn delete-btn" onclick="deleteProduct(${product.id})">
                    <i class="fa-solid fa-trash"></i>
                </button>

            </td>

        </tr>
        `;

    });

}