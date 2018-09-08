const express = require('express');
const router = express.Router();
const Validator = require('validatorjs');
const Comment = require('../../models/comment');

/* GET / */
router.get('/', async (req, res, next) => {
  try {
    const comments = await Comment.find().exec()
    return res.json({
      data: comments
    });
  } catch (err) {
    // TODO: Cath exception
  }
});

/* GET /:slug */
router.get('/:_id', async (req, res, next) => {
  try {
    const _id = req.params._id;
    const comment = await Comment.findOne({ _id }).exec();
    console.log(comment);
    return res.json(comment);
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
    const createdComment = new Comment(data);
    createdComment.save();
    return res.json({ message: 'Comment created!' });
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
    const updatedComment = await Comment.findOneAndUpdate({ _id }, data, { new: true }).exec()
    return res.json(updatedComment);
  } catch (err) {
    // TODO: Cath exception
  }
});

/* DELETE /:id */
router.delete('/:_id', async (req, res, next) => {
  try {
    const _id = req.params._id;
    const deletedComment = await Comment.findOneAndRemove({ _id }).exec();
    return res.status(204).json();
  } catch (err) {
    // TODO: Cath exception
  }
});

module.exports = router;