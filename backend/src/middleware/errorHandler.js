module.exports = (err, req, res, next) => {
  // Log the error stack for debugging but not on production environment
  if (process.env.NODE_ENV !== 'production') {
    console.error(err.stack);
  } else {
    console.error(err.message);
  }

  // Handle Sequelize validation errors
  if (
    err.name === 'SequelizeValidationError' ||
    err.name === 'SequelizeUniqueConstraintError'
  ) {
    const messages = err.errors.map((e) => e.message);
    return res.status(400).json({ error: 'Validation error', messages });
  }

  // Handle other Sequelize errors
  if (err.name.startsWith('Sequelize')) {
    // In a real-world app, you'd probably not want to show the actual error to the client
    return res.status(500).json({ error: 'A database error occurred' });
  }

  // Handle known validation errors
  if (err.name === 'ValidationError') {
    return res.status(400).json({ error: err.message });
  }

  // Handle custom application errors
  if (err.statusCode) {
    return res.status(err.statusCode).json({ error: err.message });
  }

  // Handle unexpected errors
  return res.status(500).json({ error: 'An unexpected error occurred' });
};
