const express = require("express");

const router = express.Router();

const lowStockController = require("../controllers/lowStockController");

router.get("/", lowStockController.getLowStock);

module.exports = router;