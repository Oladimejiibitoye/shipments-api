const express = require('express');
const router = express.Router();
const { createSchema, updateSchema, listSchema } = require('./shipment.validator');
const shipmentController = require('./shipment.controller');


const validate = (schema, source = 'body') => (req, res, next) => {
  const target = source === 'query' ? req.query : req.body;
  const { error } = schema.validate(target, { abortEarly: false, allowUnknown: false });
  if (error) return res.status(422).json({ error: 'Validation failed', details: error.details.map(d => d.message) });
  next();
};

router.get('/', validate(listSchema, 'query'), shipmentController.getAll);
router.get('/:id', shipmentController.getOne);
router.post('/', validate(createSchema), shipmentController.create);
router.put('/:id', validate(updateSchema), shipmentController.update);
router.delete('/:id', shipmentController.remove);

module.exports = router;
