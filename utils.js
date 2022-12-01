const jwt = require('jsonwebtoken');
const User = require('./models/user.js');

const getJWTToken = async (data) => {
  const token = await jwt.sign(
    {
      _id: data?._id,
    },
    process.env.JWT_SECRET
  );
  data.token = token;
};

const auth = async (req, res, next) => {
  const data = await User.findOne({ _id: req.params.id });
  console.log(data);
  if (!data) {
    return res.status(400).send('Invalid id');
  }
  // let token = data.token;
  if (!data.token) {
    return res.status(400).send('Not Logged in');
  }
  const isValid = await jwt.verify(data.token, process.env.JWT_SECRET);
  if (!isValid) {
    return res.status(400).send('Invalid Token');
  }
  next();
};

module.exports = {
  getJWTToken,
  auth,
};
