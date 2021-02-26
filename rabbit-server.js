const express = require('express');
// const router = express.Router();
const cors = require('cors');
const inventory = require('./controllers/inventory.js');
const rabbitInquiry = require('./controllers/rabbit_inquiry.js');

const app = express();
app.use(express.json());
app.use(cors());

app.get('/', (req, res) => { res.send('.') });
app.get('/inventory', (req, res) => { inventory.handleInventoryGet(req, res) });
app.post('/rabbit-inquiry', (req, res) => { rabbitInquiry.handleRabbitInquiry(req, res) });

app.listen(process.env.PORT, () => {
  console.log(`netherlandbunnies.com backend running on port ${process.env.PORT}.`);
});
