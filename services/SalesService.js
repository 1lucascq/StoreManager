const SalesModel = require('../models/SalesModel');
const ProductsService = require('./ProductsService');

const newQuantity = (stock, changeValue, isSum) => {
  if (isSum) {
    return stock + changeValue;
  }
  return stock - changeValue;
};

const checkAmount = async (data) => {
  const checkItems = await Promise.all(data.map(async (item) => {
    const product = await ProductsService.getById(item.productId);
    return product.quantity > item.quantity;
  }));

  return checkItems.every((item) => item === true);
};

const getAll = async () => {
  const sales = await SalesModel.getAll();
  return sales;
};

const getById = async (id) => {
  const sale = await SalesModel.getById(id);
  return sale;
};

const create = async (data) => {
  const isValid = await checkAmount(data);
  if (!isValid) return false;
  const saleId = await SalesModel.createSaleId();

  const newSale = data.map(async ({ productId, quantity }) => {
    await SalesModel.createSale({ saleId, productId, quantity });
    const product = await ProductsService.getById(productId);
    const { id, name } = product;
    const newQuant = newQuantity(product.quantity, quantity);
    const updatedProduct = ProductsService.update({ id, name, quantity: newQuant });
    return updatedProduct;
  });
  
  await Promise.all(newSale);

  return { id: saleId, itemsSold: data };
};

const update = async ({ saleId, productId, quantity }) => {
  const sale = await getById(saleId);
  if (!sale) return null;

  const result = await SalesModel.update({ saleId, productId, quantity });

  return result;
};

const exclude = async (id) => {
  const sale = await getById(id);
  if (!sale.length) return null;

  sale.forEach(async ({ productId, quantity }) => {
    const product = await ProductsService.getById(productId);
    const { name } = product;
    const newQuant = newQuantity(product.quantity, quantity, true);
    await ProductsService.update({ id: productId, name, quantity: newQuant });
  });

  const isDeleted = await SalesModel.exclude(id);
  if (isDeleted) return true;
};

module.exports = { getAll, getById, create, update, exclude };