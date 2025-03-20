import { DomainError } from './DomainError';

export class AuthError extends DomainError {
  constructor(message: string) {
    super(message);
    this.name = 'AuthError';
  }
}

export class UnauthorizedError extends AuthError {
  constructor(message: string = 'User is not authenticated') {
    super(message);
    this.name = 'UnauthorizedError';
  }
}

export class ForbiddenError extends AuthError {
  constructor(
    message: string = 'User does not have permission to perform this action'
  ) {
    super(message);
    this.name = 'ForbiddenError';
  }
}

export class InvalidCredentialsError extends AuthError {
  constructor(message: string = 'Invalid email or password') {
    super(message);
    this.name = 'InvalidCredentialsError';
  }
}

export class UserNotFoundError extends AuthError {
  constructor(userId: string) {
    super(`User with ID ${userId} not found`);
    this.name = 'UserNotFoundError';
  }
}

export class UserAlreadyExistsError extends AuthError {
  constructor(email: string) {
    super(`User with email ${email} already exists`);
    this.name = 'UserAlreadyExistsError';
  }
}

export class InvalidTokenError extends AuthError {
  constructor(message: string = 'Invalid or expired authentication token') {
    super(message);
    this.name = 'InvalidTokenError';
  }
}
