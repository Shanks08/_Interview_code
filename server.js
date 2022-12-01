//* Imports
const express = require('express');
const dotenv = require('dotenv');

//* App Config
const app = express();
dotenv.config();

//* Middlewares
app.use(express.json());

//* DB connection
require('./database.js');
require('./models/user.js');

//* Routes
app.get('/', (req, res) => {
  res.send('All Good');
});

app.use('/api/users', require('./routes/user.js'));

app.use(function (req, res, next) {
  res.status(404).send('No Such Url');
});

//* Listen
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server up at port http://localhost:${PORT}`);
});
