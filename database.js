const mongoose = require('mongoose');

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    console.log('DB Connected');
  })
  .catch((err) => {
    console.error(err);
  });
