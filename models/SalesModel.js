const connection = require('./connection');

const serialize = (sales) => sales.map((sale) => (
    {
      saleId: sale.sale_id,
      productId: sale.product_id,
      quantity: sale.quantity,
      date: sale.date,
    }));

const getAll = async () => {
  const q1 = 'SELECT * FROM StoreManager.sales_products sp ';
  const q2 = 'INNER JOIN StoreManager.sales s ON sp.sale_id = s.id ';
  const q3 = 'ORDER BY sale_id, product_id;';
  const [result] = await connection.execute(q1.concat(q2, q3));
  return serialize(result);
};

const getById = async (id) => {
  const q1 = 'SELECT * FROM StoreManager.sales_products sp ';
  const q2 = 'INNER JOIN StoreManager.sales s ON sp.sale_id = s.id ';
  const q3 = 'WHERE s.id = ? ORDER BY sale_id, product_id;';
  const [result] = await connection.execute(q1.concat(q2, q3), [id]);
  const filteredResult = result.map((sale) => (
    {
      productId: sale.product_id,
      quantity: sale.quantity,
      date: sale.date,
    }));
  return filteredResult;
};

const createSaleId = async () => {
  const query = 'INSERT INTO StoreManager.sales (date) VALUES (NOW());';

  const [result] = await connection.execute(query);

  return result.insertId;
};

const createSale = async ({ saleId, productId, quantity }) => {
  const query1 = 'INSERT INTO StoreManager.sales_products (sale_id, ';
  const query2 = 'product_id, quantity) VALUES (?, ?, ?);';

  await connection.execute(query1.concat(query2), [saleId, productId, quantity]);
};

const update = async ({ saleId, productId, quantity }) => {
  try {
    const query1 = 'UPDATE StoreManager.sales_products SET product_id = ?, ';
    const query2 = 'quantity = ? WHERE sale_id = ?';
    await connection.execute(query1.concat(query2), [productId, quantity, saleId]);

    return { saleId, itemUpdated: [{ productId, quantity }] };
  } catch (err) {
    throw new Error('Erro do servidor na atualização do produto no model.');
  }
};

const exclude = async (id) => {
  try {
    const queryProduct = 'DELETE FROM StoreManager.sales_products WHERE sale_id = ?;';

    await connection.execute(queryProduct, [id]);
    return true;
  } catch (err) {
    throw new Error('Erro do servidor na exclusão de contato do model.');
  }
};

module.exports = { getAll, getById, createSaleId, createSale, update, exclude };
