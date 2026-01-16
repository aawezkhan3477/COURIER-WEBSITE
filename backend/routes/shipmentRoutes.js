const express = require("express");
const {
  createShipment,
  trackShipment,
  getAllShipments,
  updateStatus
} = require("../controllers/shipmentController");
const { protect, adminOnly } = require("../middleware/authMiddleware");

const router = express.Router();

router.get("/track/:id", trackShipment);

/* Admin routes */
router.post("/create", protect, adminOnly, createShipment);
router.get("/all", protect, adminOnly, getAllShipments);
router.put("/update/:id", protect, adminOnly, updateStatus);

module.exports = router;
