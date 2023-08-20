const globalErrorHandler = (err, req, res, next) => {
  const stack = err.stack;
  const message = err.message;
  const status = err.status ? err.status : "failed";
  const statusCode = err.statusCode ? err.statusCode : 500;
  res.status(statusCode).json({
    stack,
    message,
    status,
  });
};
const notFound = (err, req, res, next) => {
  const message = new Error(`Cant find ${req.originalUrl} on the server`);

  next(message);
};

module.exports = { globalErrorHandler, notFound };
