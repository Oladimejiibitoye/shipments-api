const {StatusCodes} = require("http-status-codes")
const { errorResMsg } = require('../utils/response');
exports.notFound = (req, res, next) => {
  return errorResMsg(res, StatusCodes.NOT_FOUND, 'Not Found');
};

exports.errorHandler = (err, req, res, next) => {
  console.error(err);
  if (res.headersSent) return next(err);
  return errorResMsg(res, err?.statusCode || StatusCodes.INTERNAL_SERVER_ERROR, err.message);
};
