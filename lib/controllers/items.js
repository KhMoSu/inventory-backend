const { Router } = require('express');
const Item = require('../models/Item');

module.exports = Router()
  .delete('/:id', async (req, res, next) => {
    try {
      const item = await Item.delete(req.params.id);
      res.json(item);
    } catch (error) {
      next(error);
    }
  })
  .put('/:id', async (req, res, next) => {
    try {
      const item = await Item.updateById(req.params.id, req.body);
      res.json(item);
    } catch (error) {
      next(error);
    }
  })
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
      const item = await Item.insert({ ...req.body });
      res.json(item);
    } catch (error) {
      next(error);
    }
  });
