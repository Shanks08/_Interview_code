const express = require('express');
const User = require('../models/user.js');
const { getJWTToken, auth } = require('../utils.js');

const router = express.Router();

router.get('/allUsers/:id', auth, async (req, res) => {
  try {
    const data = await User.find({});
    if (!data) {
      throw new Error('Couldnt find user');
    }
    res.send(data);
  } catch (err) {
    console.error(err);
  }
});

router.get('/:id', async (req, res) => {
  try {
    const data = await User.findOne({ _id: req.params.id });
    res.send(data);
  } catch (err) {
    console.error(err);
  }
});

router.post('/create', async (req, res) => {
  try {
    const data = new User(req.body);
    await data.save();
    res.status(201).send({ message: 'DATA CREATED', data });
  } catch (err) {
    res.status(500).send(err.message || 'Sever Error During creation of User');
  }
});

router.post('/login/:id', async (req, res) => {
  try {
    let data = User.find({ _id: req.params.id });
    if (!data) {
      return res.status(404).send({ message: 'User dosent exist' });
    }

    await getJWTToken(data);
    data = await User.updateOne({ _id: req.params.id }, { token: data.token });
    if (!data.acknowledged) {
      throw new Error();
    }
    res.send({ message: 'User Logged in', data });
  } catch (err) {
    res.status(500).send(err.message || 'Sever Error During creation of User');
  }
});

router.post('/logout/:id', auth, async (req, res) => {
  try {
    let data = User.find({ _id: req.params.id });
    if (!data) {
      return res.status(404).send({ message: 'User dosent exist' });
    }
    data = await User.updateOne({ _id: req.params.id }, { token: '' });
    res.send({ message: 'User Logged Out', data });
  } catch (err) {
    res.status(500).send(err.message || 'Sever Error During creation of User');
  }
});

module.exports = router;
