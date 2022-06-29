const { Router } = require('express');
const Item = require('../models/Item');

module.exports = Router()

.get('/', async (req, res, next) => {
  try {
    const items = await Item.getAll();
    res.json(items);
  } catch (error) {
    next(error);
  }
})

.post('/', async (req, res, next) => {
  try {
    const item = await Item.insert({...req.body});
    res.json(item);
  } catch (error) {
    next(error);
  }
})
