const express = require('express');
const SalesController = require('../controllers/SalesController');
const { checkData } = require('../middlewares/salesValidations');

const router = express.Router();

router.get('/', SalesController.getAll);
router.get('/:id', SalesController.getById);
router.put('/:id', checkData, SalesController.update);
router.post('/', checkData, SalesController.create);
router.delete('/:id', SalesController.exclude);

module.exports = router;
