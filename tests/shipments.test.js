const request = require('supertest');
require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const shipmentsRouter = require('../src/modules/shipment/shipments.route');
const Shipment = require('../src/models/Shipment');

const app = express();
app.use(express.json());
app.use('/api/shipments', shipmentsRouter);

describe('Shipments API (basic)', () => {
  beforeAll(async () => {
    await mongoose.connect(process.env.MONGO_URI_TEST, { });
  });

  afterAll(async () => {
    await mongoose.disconnect();
  });

  afterEach(async () => {
    await Shipment.deleteMany({});
  });

  test('create -> get -> update -> delete flow', async () => {
    const payload = {
      trackingNumber: 'TEST123',
      senderName: 'Alice',
      receiverName: 'Bob',
      origin: 'X',
      destination: 'Y'
    };
    // create
    const createRes = await request(app).post('/api/shipments').send(payload);
    expect(createRes.status).toBe(201);
    expect(createRes.body.data.trackingNumber).toBe('TEST123');

    const id = createRes.body.data._id;
    // get
    const getRes = await request(app).get(`/api/shipments/${id}`);
    expect(getRes.status).toBe(200);
    // update
    const updRes = await request(app).put(`/api/shipments/${id}`).send({ status: 'in_transit' });
    expect(updRes.status).toBe(200);
    expect(updRes.body.data.status).toBe('in_transit');
    // delete
    const delRes = await request(app).delete(`/api/shipments/${id}`);
    expect(delRes.status).toBe(200);
  });
});
