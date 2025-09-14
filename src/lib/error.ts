// src/lib/errors.ts
export class AppError extends Error {
  status: number;
  code: string;
  meta?: unknown;

  constructor(message: string, status = 500, code = "INTERNAL_ERROR", meta?: unknown) {
    super(message);
    this.name = this.constructor.name;
    this.status = status;
    this.code = code;
    this.meta = meta;
  }
}

export class BadRequestError extends AppError {
  constructor(message = "Bad request", meta?: unknown) {
    super(message, 400, "BAD_REQUEST", meta);
  }
}

export class UnauthorizedError extends AppError {
  constructor(message = "Unauthorized") {
    super(message, 401, "UNAUTHORIZED");
  }
}

export class ForbiddenError extends AppError {
  constructor(message = "Forbidden") {
    super(message, 403, "FORBIDDEN");
  }
}

export class NotFoundError extends AppError {
  constructor(message = "Not found") {
    super(message, 404, "NOT_FOUND");
  }
}

export class ConflictError extends AppError {
  constructor(message = "Conflict") {
    super(message, 409, "CONFLICT");
  }
}
