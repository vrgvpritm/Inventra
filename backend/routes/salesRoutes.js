const express = require("express");

const router = express.Router();

const salesController = require("../controllers/salesController");

router.get("/", salesController.getSales);

router.get("/:id", salesController.getSale);

router.post("/", salesController.addSale);

router.delete("/:id", salesController.deleteSale);

module.exports = router;