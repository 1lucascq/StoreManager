const express = require('express');
const ProductsController = require('../controllers/ProductsController');
const { checkData } = require('../middlewares/productsValidations');

const router = express.Router();

router.get('/', ProductsController.getAll);
router.get('/:id', ProductsController.getById);
router.post('/', checkData, ProductsController.create);
router.put('/:id', checkData, ProductsController.update);
router.delete('/:id', ProductsController.exclude);

module.exports = router;
