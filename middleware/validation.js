const Joi = require('joi');

// Esquema de validación para productos
const productSchema = Joi.object({
  name: Joi.string().min(3).required(),
  description: Joi.string().optional().allow(''),
  price: Joi.number().min(0).required(),
  stock: Joi.number().integer().min(0).required()
});

// Middleware de validación
const validateProduct = (req, res, next) => {
  const { error } = productSchema.validate(req.body, {
    abortEarly: false,
    stripUnknown: true
  });

  if (error) {
    const errorMessage = error.details.map(detail => detail.message).join(', ');
    return res.status(400).json({ error: errorMessage });
  }

  next();
};

module.exports = { validateProduct };
