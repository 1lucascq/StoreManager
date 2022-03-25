const { StatusCodes } = require('http-status-codes');
const Joi = require('joi');

const checkFields = (req, res, next) => {
  const { name, quantity } = req.body;
  
  const { error } = Joi.object({
    name: Joi.string().not().empty().required(),
    quantity: Joi.number().not().empty().required(),
  }).validate({ name, quantity });
  
  if (error) {
    return res.status(StatusCodes.BAD_REQUEST).json({ message: error.details[0].message });
  }
  next();
};

const checkLength = (req, res, next) => {
  const { name, quantity } = req.body;
  
  const { error } = Joi.object({
    name: Joi.string().min(5).required(),
    quantity: Joi.number().min(1).required(),
  }).validate({ name, quantity });
  
  if (error) {
    return res.status(StatusCodes.UNPROCESSABLE_ENTITY).json({ message: error.message });
  }
  next();
};

const checkData = [checkFields, checkLength];

module.exports = { checkData };
