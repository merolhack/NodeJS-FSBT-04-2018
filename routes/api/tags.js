const express = require('express');
const router = express.Router();
const Tag = require('../../models/tag');

/* GET / */
router.get('/', async (req, res, next) => {
  try {
    const tags = await Tag.find().exec()
    return res.json({
      data: tags
    });
  } catch (err) {
    // TODO: Cath exception
  }
});

module.exports = router;