const express = require('express');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors());

app.get('/', (req, res) => {
  res.send('.');
});



app.listen(process.env.PORT, () => {
  console.log(`rabbit-server running on port ${process.env.PORT}.`);
});
