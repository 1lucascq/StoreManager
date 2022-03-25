const { StatusCodes } = require('http-status-codes');

const ProductsModel = require('../models/ProductsModel');

const getAll = async () => {
  const products = await ProductsModel.getAll();
  return products;
};

const getById = async (id) => {
  const product = await ProductsModel.getById(id);
  // console.log('PS.getById', product);

  return product;
};

const create = async ({ name, quantity }) => {
  const data = await getAll();
  const isRepeated = data.find((product) => product.name.toLowerCase() === name.toLowerCase());

  if (isRepeated) throw new Error(StatusCodes.CONFLICT);

  const result = await ProductsModel.create({ name, quantity });

  return result;
};

const update = async ({ id, name, quantity }, newQuant) => {
  const product = await getById(id);
  if (!product) return null;
  if (newQuant) {
    const result = await ProductsModel.update({ id, name }, newQuant);
    return result;  
  }
  const result = await ProductsModel.update({ id, name, quantity });
  return result;
};

const exclude = async (id) => {
  const product = await getById(id);
  if (!product) return null;

  const isDeleted = await ProductsModel.exclude(id);
  if (isDeleted) return true;
};

module.exports = { getAll, getById, create, update, exclude };