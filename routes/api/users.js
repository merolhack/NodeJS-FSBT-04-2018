const express = require('express');
const router = express.Router();
const Validator = require('validatorjs');
const User = require('../../models/user');

/* GET / */
router.get('/', async (req, res, next) => {
  try {
    const users = await User.find().exec()
    return res.json({
      data: users
    });
  } catch (err) {
    // TODO: Cath exception
  }
});

/* GET /:slug */
router.get('/:_id', async (req, res, next) => {
  try {
    const _id = req.params._id;
    const user = await User.findOne({ _id }).exec();
    console.log(user);
    return res.json(user);
  } catch (err) {
    // TODO: Cath exception
  }
});

/* POST / */
router.post('/', (req, res, next) => {
  try {
    const data = req.body
    const rules = {
    };
    const validation = new Validator(data, rules)
    if (validation.fails()) {
      return res.json({
        errors: validation.errors.errors
      });
    }
    const createdUser = new User(data);
    createdUser.save();
    return res.json({ message: 'User created!' });
  } catch (err) {
    // TODO: Cath exception
  }
});

/* PUT /:id */
router.put('/:_id', async (req, res, next) => {
  try {
    const _id = req.params._id;
    const data = req.body;
    const rules = {
    };
    const validation = new Validator(data, rules)
    if (validation.fails()) {
      return res.json({
        errors: validation.errors.errors
      });
    }
    const updatedUser = await User.findOneAndUpdate({ _id }, data, { new: true }).exec()
    return res.json(updatedUser);
  } catch (err) {
    // TODO: Cath exception
  }
});

/* DELETE /:id */
router.delete('/:_id', async (req, res, next) => {
  try {
    const _id = req.params._id;
    const deletedUser = await User.findOneAndRemove({ _id }).exec();
    return res.status(204).json();
  } catch (err) {
    // TODO: Cath exception
  }
});

module.exports = router;