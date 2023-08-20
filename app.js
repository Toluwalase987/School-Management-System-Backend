const express = require("express");
const app = express();
const morgan = require("morgan");
const {
  globalErrorHandler,
  notFound,
} = require("./middlewares/globalErrorHandler");

// Apply the rate limiting middleware to all requests
app.use(express.json());

app.use((req, res, next) => {
  console.log(req.originalUrl, req.method, req.statusCode);
  next();
});
app.use(notFound);
app.use(globalErrorHandler)

module.exports = app;
