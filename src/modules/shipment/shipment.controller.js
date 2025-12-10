const mongoose = require('mongoose');
const { successResMsg } = require("../../utils/response");
const {StatusCodes} = require("http-status-codes");
const shipmentService = require('./shipment.service');
const { ValidationError } = require('../../utils/errors');

class ShipmentController {
  // this controller provide all the provider data in paginated form
  async create(req, res, next) {
    try {
      const shipment = await shipmentService.create(req.body)
      return successResMsg(res, StatusCodes.CREATED, {
        data: shipment,
        message: 'Shipment created successfully'
      })
    } catch (error) {
      next(error)
    }
  }
  async update(req, res, next) {
    try {
      const { id } = req.params;
      if (!mongoose.isValidObjectId(id)) {
        throw new ValidationError('Invalid ID');
      }
      const updatedShipment = await shipmentService.update(id, req.body);
      return successResMsg(res, StatusCodes.OK, {
        data: updatedShipment,
        message: 'Shipment updated successfully'
      });
    } catch (error) {
      next(error);
    }
  }

  async getOne(req, res, next) {
    try {
      const { id } = req.params;
      if (!mongoose.isValidObjectId(id)) {
        throw new ValidationError('Invalid ID');
      }
      const shipment = await shipmentService.fetchById(id);
      return successResMsg(res, StatusCodes.OK, {
        data: shipment,
        message: 'Shipment retrieved successfully'
      });
    } catch (error) {
      next(error);
    }
  }

  async getAll(req, res, next) {
    try {
      const shipments = await shipmentService.fetchAll(req.query);
      return successResMsg(res, StatusCodes.OK, {
      data: shipments,
      message: 'Shipments retrieved successfully'
      });
    } catch (error) {
      next(error);
    }
  }

  async remove(req, res, next) {
    try {
      const { id } = req.params;
      if (!mongoose.isValidObjectId(id)) {
        throw new ValidationError('Invalid ID');
      }
      await shipmentService.delete(id);
      return successResMsg(res, StatusCodes.OK, {
      message: 'Shipment deleted successfully'
      });
    } catch (error) {
      next(error);
    }
  }

}


module.exports = new ShipmentController()


exports.remove = async (req, res, next) => {
  try {
    const { id } = req.params;
    if (!mongoose.isValidObjectId(id)) return res.status(400).json({ error: 'Invalid ID' });
    const deleted = await Shipment.findByIdAndDelete(id);
    if (!deleted) return res.status(404).json({ error: 'Shipment not found' });
    res.json({ data: deleted });
  } catch (err) { next(err); }
};
