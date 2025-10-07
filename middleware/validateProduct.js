const { ValidationError } = require('../utils/errors');

module.exports = (req, res, next) => {
  const { name, price, category, inStock } = req.body;
  if (!name || !price || !category || typeof inStock !== 'boolean') {
    throw new ValidationError('Missing or invalid product fields');
  }
  next();
};
