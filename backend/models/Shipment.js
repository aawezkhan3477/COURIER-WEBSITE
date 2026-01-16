const mongoose = require("mongoose");

const ShipmentSchema = new mongoose.Schema(
  {
    trackingId: {
      type: String,
      required: true,
      unique: true
    },

    sender: {
      type: String,
      required: true
    },

    receiver: {
      type: String,
      required: true
    },

    status: {
      type: String,
      enum: ["In Transit", "Out for Delivery", "Delivered", "Cancelled"],
      default: "In Transit"
    },

    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User"
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Shipment", ShipmentSchema);
