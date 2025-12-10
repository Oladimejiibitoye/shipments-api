const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
require('dotenv').config();
const connectDB = require('./utils/db');
const shipmentsRouter = require('./modules/shipment/shipments.route');
const { errorHandler, notFound } = require('./middlewares/errorHandler');

const app = express();
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

app.use('/api/shipments', shipmentsRouter);

app.get('/', (req,res) => res.send({ message: 'Shipments API is running' }));

app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 3000;

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
}).catch(err => {
  console.error('Failed DB connect:', err);
  process.exit(1);
});
