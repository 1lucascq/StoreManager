const { StatusCodes } = require('http-status-codes');
const Joi = require('joi');

const checkFields = (req, res, next) => {
  const { productId, quantity } = req.body[0];
  
  const { error } = Joi.object({
    productId: Joi.number().not().empty().required(),
    quantity: Joi.number().not().empty().required(),
  }).validate({ productId, quantity });
  
  if (error) {
    return res.status(StatusCodes.BAD_REQUEST).json({ message: error.details[0].message });
  }
  next();
};

const checkLength = (req, res, next) => {
  const { quantity } = req.body[0];
  
  const { error } = Joi.object({
    quantity: Joi.number().min(1).required(),
  }).validate({ quantity });
  
  if (error) {
    return res.status(StatusCodes.UNPROCESSABLE_ENTITY).json({ message: error.message });
  }
  next();
};

const checkData = [checkFields, checkLength];

module.exports = { checkData };
