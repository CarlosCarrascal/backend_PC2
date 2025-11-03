// Middleware de manejo de errores centralizado
const errorHandler = (err, req, res, next) => {
  // Manejar errores de Joi
  if (err.isJoi === true) {
    return res.status(400).json({
      error: err.details[0].message
    });
  }

  // Manejar errores de Sequelize
  if (err.name === 'SequelizeValidationError') {
    return res.status(400).json({
      error: err.errors.map(e => e.message).join(', ')
    });
  }

  if (err.name === 'SequelizeUniqueConstraintError') {
    return res.status(409).json({
      error: 'Resource already exists'
    });
  }

  if (err.name === 'SequelizeForeignKeyConstraintError') {
    return res.status(400).json({
      error: 'Invalid foreign key reference'
    });
  }

  if (err.name === 'SequelizeDatabaseError') {
    return res.status(500).json({
      error: 'Database error occurred'
    });
  }

  // Log error en desarrollo
  if (process.env.NODE_ENV !== 'production') {
    console.error('Error:', err);
  }

  // Error genérico
  res.status(err.status || 500).json({
    error: process.env.NODE_ENV === 'production' 
      ? 'Internal server error' 
      : err.message || 'Internal server error'
  });
};

module.exports = errorHandler;
