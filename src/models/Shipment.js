const mongoose = require('mongoose');

const shipmentSchema = new mongoose.Schema({
  trackingNumber: { type: String, required: true, unique: true, trim: true },
  senderName: { type: String, required: true, trim: true },
  receiverName: { type: String, required: true, trim: true },
  origin: { type: String, required: true, trim: true },
  destination: { type: String, required: true, trim: true },
  status: {
    type: String,
    enum: ['pending', 'in_transit', 'delivered', 'cancelled'],
    default: 'pending'
  }
}, { timestamps: true });

module.exports = mongoose.model('Shipment', shipmentSchema);
