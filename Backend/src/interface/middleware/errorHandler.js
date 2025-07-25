export const errorHandler = (err, req, res, next) => {
  console.error('Error:', err);

  // Default error
  let statusCode = 500;
  let message = 'Internal server error';

  // Handle specific error types
  if (err.name === 'SequelizeValidationError') {
    statusCode = 400;
    message = err.errors.map(e => e.message).join(', ');
  } else if (err.name === 'SequelizeUniqueConstraintError') {
    statusCode = 409;
    message = 'Resource already exists';
  } else if (err.name === 'SequelizeForeignKeyConstraintError') {
    statusCode = 400;
    message = 'Invalid reference';
  } else if (err.message) {
    // Custom business logic errors
    if (err.message.includes('required')) {
      statusCode = 400;
      message = err.message;
    } else if (err.message.includes('not found')) {
      statusCode = 404;
      message = err.message;
    } else if (err.message.includes('already exists')) {
      statusCode = 409;
      message = err.message;
    } else if (err.message.includes('Invalid credentials')) {
      statusCode = 401;
      message = err.message;
    } else if (err.message.includes('cannot be negative')) {
      statusCode = 400;
      message = err.message;
    }
  }

  res.status(statusCode).json({
    success: false,
    message,
    ...(process.env.NODE_ENV === 'development' && { stack: err.stack }),
  });
}; 