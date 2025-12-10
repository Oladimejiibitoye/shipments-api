const Shipment = require('../../models/Shipment');

class ShipmentRepository {
  constructor(Shipment){
    this.shipment = Shipment
  }
  async fetchAll(query, limit, skip, sortBy, sortOrder){
    return this.shipment.find(query)
        .limit(limit)
        .skip(skip)
        .sort({ [sortBy]: sortOrder })
        .exec();    
  }

  async fetchById(id){
    return this.shipment.findById(id).exec();
  }

  async create(payload){
    return this.shipment.create(payload);
  }
  async update(id, payload) {
    return this.shipment.findByIdAndUpdate(id, payload, { new: true }).exec();
  }
  async delete(id) {
    return this.shipment.findByIdAndDelete(id).exec();
  }
  async fetchOne(query){
    return this.shipment.findOne(query).exec();
  }





}

module.exports = new ShipmentRepository(Shipment)