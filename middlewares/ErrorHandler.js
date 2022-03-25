const { StatusCodes } = require('http-status-codes');

module.exports = (err, req, res, _next) => {
  if (err.isJoi) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ message: err.details[0].message });
      // até então isso tá desnecessário pq to jogando o erro direto
  }

  if (+err.message === 409) {
    return res.status(err.message).json({ message: 'Product already exists' });
  }

  // isso tá inútil até então
  const status = +err.message.slice(0, 3);
  if (status > 100 && status < 600) {
    return res
      .status(+err.message.slice(0, 3))
      .json({ message: err.message.slice(4) });
  }
  
  console.log('Erro genérico do servidor');
  return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: err.message });
};
