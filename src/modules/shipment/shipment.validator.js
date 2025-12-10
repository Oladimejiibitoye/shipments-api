const Joi = require('joi');

const createSchema = Joi.object({
  trackingNumber: Joi.string().trim().required(),
  senderName: Joi.string().trim().required(),
  receiverName: Joi.string().trim().required(),
  origin: Joi.string().trim().required(),
  destination: Joi.string().trim().required(),
  status: Joi.string().valid('pending','in_transit','delivered','cancelled').optional()
});

const updateSchema = Joi.object({
  senderName: Joi.string().trim().optional(),
  receiverName: Joi.string().trim().optional(),
  origin: Joi.string().trim().optional(),
  destination: Joi.string().trim().optional(),
  status: Joi.string().valid('pending','in_transit','delivered','cancelled').optional()
}).min(1);

// Validation for list/query params on GET /api/shipments
const listSchema = Joi.object({
  filters: Joi.alternatives().try(
    Joi.string(),
    Joi.object().unknown(true)
  ).optional(),
  search: Joi.string().optional(),
  page: Joi.number().integer().min(0).optional(),
  size: Joi.number().integer().min(1).optional(),
  sortBy: Joi.string().optional(),
  order: Joi.string().valid('asc', 'desc').optional()
}).optional();

module.exports = { createSchema, updateSchema, listSchema };
