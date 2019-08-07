function errorHandler(err, req, res, next) {
  if (res.headerSent) {
    return next(err);
  }
  res.status(404);
  res.render("error", { error: err });
}

function NotFound(msg) {
  this.name = "NotFound";
  Error.call(this, msg);
  Error.captureStackTrace(this, arguments.callee);
}
NotFound.prototype.__proto__ = Error.prototype;

module.exports = {
  NotFound
};
