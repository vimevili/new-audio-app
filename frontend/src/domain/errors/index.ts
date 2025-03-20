import { DomainError } from './DomainError';
import {
  ProductError,
  InvalidProductError,
  InvalidPriceError,
  InvalidRatingError,
  ProductNotAvailableError,
} from './ProductError';
import {
  ReviewError,
  InvalidReviewError,
  InvalidReviewRatingError,
  ReviewNotFoundError,
} from './ReviewError';
import {
  AuthError,
  UnauthorizedError,
  ForbiddenError,
  InvalidCredentialsError,
  UserNotFoundError,
  UserAlreadyExistsError,
  InvalidTokenError,
} from './AuthError';
import {
  CartError,
  CartNotFoundError,
  CartItemQuantityError,
  CartItemAlreadyExistsError,
  CartEmptyError,
} from './CartError';
import {
  EmptyCartError,
  OrderNotFoundError,
  InvalidOrderStatusError,
} from './OrderErrors';
import {
  ProductReviewNotFoundError,
  UnauthorizedProductReviewError,
  InvalidProductReviewRatingError,
} from './ReviewErrors';

export * from './DomainError';
export * from './ProductError';
export * from './ReviewError';
export * from './AuthError';
export * from './CartError';
export * from './OrderErrors';
export * from './ReviewErrors';

// Type guard functions
export const isDomainError = (error: unknown): error is DomainError => {
  return error instanceof DomainError;
};

export const isProductError = (error: unknown): error is ProductError => {
  return error instanceof ProductError;
};

export const isReviewError = (error: unknown): error is ReviewError => {
  return error instanceof ReviewError;
};

export const isAuthError = (error: unknown): error is AuthError => {
  return error instanceof AuthError;
};

export const isCartError = (error: unknown): error is CartError => {
  return error instanceof CartError;
};

// Error type for better type safety
export type DomainErrorType =
  | InvalidProductError
  | InvalidPriceError
  | InvalidRatingError
  | InvalidReviewError
  | ReviewNotFoundError
  | InvalidReviewRatingError
  | ProductNotAvailableError
  | UnauthorizedError
  | ForbiddenError
  | InvalidCredentialsError
  | UserNotFoundError
  | UserAlreadyExistsError
  | InvalidTokenError
  | CartNotFoundError
  | CartItemQuantityError
  | CartItemAlreadyExistsError
  | CartEmptyError
  | EmptyCartError
  | OrderNotFoundError
  | InvalidOrderStatusError
  | ProductReviewNotFoundError
  | UnauthorizedProductReviewError
  | InvalidProductReviewRatingError;
