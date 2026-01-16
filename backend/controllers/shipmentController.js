const Shipment = require("../models/Shipment");

/* Create shipment (Admin) */
exports.createShipment = async (req, res) => {
  const shipment = await Shipment.create({
    ...req.body,
    createdBy: req.user.id
  });
  res.json(shipment);
};

/* Track shipment (Public) */
exports.trackShipment = async (req, res) => {
  const shipment = await Shipment.findOne({ trackingId: req.params.id });
  res.json(shipment);
};

/* Admin: Get all shipments */
exports.getAllShipments = async (req, res) => {
  const shipments = await Shipment.find().sort({ createdAt: -1 });
  res.json(shipments);
};

/* Admin: Update status */
exports.updateStatus = async (req, res) => {
  const shipment = await Shipment.findByIdAndUpdate(
    req.params.id,
    { status: req.body.status },
    { new: true }
  );
  res.json(shipment);
};
