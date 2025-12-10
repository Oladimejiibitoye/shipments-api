const Shipment = require('../../models/Shipment');

const { NotFoundError, AlreadyApprovedError } = require('../../utils/errors');
const { getPagination, getPagingData } = require('../../utils/pagination');
const shipmentRepository = require('./shipment.repository');

class ShipmentService {
    constructor(ShipmentRepository){
        this.shipmentRepository = shipmentRepository
    }

    async create(payload){
        const existing = await this.shipmentRepository.fetchOne({ trackingNumber: payload.trackingNumber });
        if (existing) throw new AlreadyApprovedError('trackingNumber already exists');
        return this.shipmentRepository.create(payload);
    }

    async update(id, updatePayload) {
        const existingShipment = await this.shipmentRepository.fetchById(id);
        if (!existingShipment) {
            throw new NotFoundError('Shipment not found');
        }
        if (updatePayload.trackingNumber) {
            const trackingNumberExists = await this.shipmentRepository.fetchOne({ trackingNumber: updatePayload.trackingNumber });
            if (trackingNumberExists && trackingNumberExists.id !== id) {
                throw new AlreadyApprovedError('Tracking number already exists for another shipment');
            }
        }

        return this.shipmentRepository.update(id, updatePayload);
    }

    async fetchAll(queryObj){
        let {filters, search, page, size, sortBy, order } = queryObj

        const pageNumber = parseInt(page);
        const sizeNumber = parseInt(size);
        const {limit, skip} = getPagination(pageNumber, sizeNumber);

        if (!sortBy) {
        sortBy = 'createdAt'
        }

        if (!order){
            order = 'asc'
        }

        const sortOrder = order === 'asc' ? 1 : -1;


        const query = {};

        // Add search functionality
        if (search) {
            query.$or = [
                { trackingNumber: { $regex: search, $options: 'i' } },
                { destination: { $regex: search, $options: 'i' } },
                { origin: { $regex: search, $options: 'i' } }
            ];
        }

        const data = await this.shipmentRepository.fetchAll(query, limit, skip, sortBy, sortOrder)
        const pagingObj = {data, Model: Shipment, query, page: pageNumber, size: sizeNumber   }
        return getPagingData(pagingObj)
    }

    async fetchById(id) {
        const shipment = await this.shipmentRepository.fetchById(id);
        if (!shipment) {
            throw new NotFoundError('Shipment not found');
        }
        return shipment;
    }

    async delete(id) {
        const existingShipment = await this.shipmentRepository.fetchById(id);
        if (!existingShipment) {
            throw new NotFoundError('Shipment not found');
        }
        return this.shipmentRepository.delete(id);
    }

}

module.exports = new ShipmentService(shipmentRepository)