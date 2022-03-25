const { StatusCodes } = require('http-status-codes');
const SalesService = require('../services/SalesService');

const getAll = async (_req, res, next) => {
  try {
    const sales = await SalesService.getAll();
  
    if (!sales) {
      return res.status(StatusCodes.OK).json({ message: 'Não existem produtos cadastrados' });
    }
  
    return res.status(StatusCodes.OK).json(sales);
  } catch (error) {
    return next(error);
  }
};

const getById = async (req, res) => {
  try {
    const { id } = req.params;
    const sale = await SalesService.getById(id);
  
    if (!sale.length) {
      return res.status(StatusCodes.NOT_FOUND).json({ message: 'Sale not found' });
    }
  
    return res.status(StatusCodes.OK).json(sale);
  } catch (error) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: error.message });
  }
};

const create = async (req, res) => {
  try {
    const result = await SalesService.create(req.body);
    if (result === false) {
      return res.status(StatusCodes.UNPROCESSABLE_ENTITY)
        .json({ message: 'Such amount is not permitted to sell' });
    }

    return res.status(StatusCodes.CREATED).json(result);
  } catch (error) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: error.message });
  }
};

const update = async (req, res) => {
  try {
    const { id: saleId } = req.params;
    const { productId, quantity } = req.body[0];
    const sale = await SalesService.update({ saleId, productId, quantity });
    
    return res.status(StatusCodes.OK).json(sale);
  } catch (error) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: error.message });
  }
};

const exclude = async (req, res) => {
  try {
    const { id } = req.params;
    const sale = await SalesService.exclude(id);
    if (!sale) {
      return res.status(StatusCodes.NOT_FOUND).json({ message: 'Sale not found' });
    }
    
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
