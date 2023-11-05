class NotFoundError extends Error {
  constructor(message) {
    super(message);
    this.name = 'NotFoundError';
    this.statusCode = 404;
  }
}

class PaymentError extends Error {
  constructor(message) {
    super(message);
    this.name = 'PaymentError';
    this.statusCode = 400;
  }
}

class ForbiddenError extends Error {
  constructor(message) {
    super(message);
    this.name = 'ForbiddenError';
    this.statusCode = 403;
  }
}

class UnauthorizedError extends Error {
  constructor(message) {
    super(message);
    this.name = 'UnauthorizedError';
    this.statusCode = 403;
  }
}

module.exports = {
  NotFoundError,
  PaymentError,
  ForbiddenError,
  UnauthorizedError,
};
