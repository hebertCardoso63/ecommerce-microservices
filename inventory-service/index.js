// index.js
const express = require('express');
const dotenv = require('dotenv');

dotenv.config();

const app = express();
const port = 3006;

const { consumeMessages } = require('./app/services/inventory_service');
const { processOrder } = require('./app/controllers/inventory_controller');

app.use(express.json());

consumeMessages('orderQueue', processOrder);

app.listen(port, () => {
  console.log(`Inventory service running on port ${port}`);
});
