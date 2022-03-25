const { StatusCodes } = require('http-status-codes');

const ProductsService = require('../services/ProductsService');

const getAll = async (_req, res) => {
  try {
    const products = await ProductsService.getAll();

    if (!products) {
      return res.status(StatusCodes.OK).json({ message: 'Não existem produtos cadastrados' }); 
    }

    return res.status(StatusCodes.OK).json(products);
    } catch (error) {
      return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: error.message });
    }
};

const getById = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await ProductsService.getById(id);
    if (!product) return res.status(StatusCodes.NOT_FOUND).json({ message: 'Product not found' });
  
    return res.status(StatusCodes.OK).json(product);
  } catch (error) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: error.message });
  }
};

const create = async (req, res, next) => {
  try {
    const { name, quantity } = req.body;

    const result = await ProductsService.create({ name, quantity });

    return res.status(StatusCodes.CREATED).json(result);
  } catch (error) {
    return next(error);
  }
};

const update = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, quantity } = req.body;
    const product = await ProductsService.update({ id, name, quantity });
    if (!product) return res.status(StatusCodes.NOT_FOUND).json({ message: 'Product not found' });
    
    return res.status(StatusCodes.OK).json(product);
  } catch (error) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: error.message });
  }
};

const exclude = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await ProductsService.exclude(id);
    if (!product) return res.status(StatusCodes.NOT_FOUND).json({ message: 'Product not found' });
    
    return res.status(StatusCodes.NO_CONTENT).end();
  } catch (error) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: error.message });
  }
};

module.exports = {
  getAll,
  getById,
  create,
  update,
  exclude,
};
