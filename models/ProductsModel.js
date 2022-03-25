const connection = require('./connection');

const getAll = async () => {
  const query = 'SELECT * FROM StoreManager.products ORDER BY id;';

  const [result] = await connection.execute(query);
  return result;
};

const getById = async (id) => {
  const query = 'SELECT * FROM StoreManager.products WHERE id = ?;';

  const [result] = await connection.execute(query, [id]);
  return result[0];
};

const create = async ({ name, quantity }) => {
  const query = 'INSERT INTO StoreManager.products (name, quantity) VALUES (?, ?);';

  const [result] = await connection.execute(query, [name, quantity]);

  return { id: result.insertId, name, quantity };
};

const update = async ({ id, name, quantity }, newQuant) => {
  try {
    const query = 'UPDATE StoreManager.products SET name = ?, quantity = ? WHERE id = ?';
    
    if (newQuant) {
      await connection.execute(query, [name, newQuant, id]);

      return { id, name, newQuant };  
    }
    await connection.execute(query, [name, quantity, id]);

    return { id, name, quantity };
  } catch (err) {
    throw new Error('Erro do servidor na atualização do produto no model.');
  }
};

const exclude = async (id) => {
  try {
    const queryProduct = 'DELETE FROM StoreManager.products WHERE id = ?;';

    await connection.execute(queryProduct, [id]);
    return true;
  } catch (err) {
    throw new Error('Erro do servidor na exclusão de contato do model.');
  }
};

module.exports = { getAll, getById, create, update, exclude };
