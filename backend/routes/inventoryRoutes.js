const express = require("express");

const router = express.Router();

const inventoryController = require("../controllers/inventoryController");

router.get("/", inventoryController.getInventory);

router.put("/:id", inventoryController.updateStock);

router.put("/restock/:id", inventoryController.restockProduct);

module.exports = router;