import { DomainError } from './DomainError';

export class ProductError extends DomainError {
  constructor(message: string) {
    super(message);
    this.name = 'ProductError';
  }
}

export class InvalidProductError extends ProductError {
  constructor(message: string) {
    super(message);
    this.name = 'InvalidProductError';
  }
}

export class ProductNotFoundError extends ProductError {
  constructor() {
    super(`Product not found`);
    this.name = 'ProductNotFoundError';
  }
}

export class InvalidPriceError extends ProductError {
  constructor(price: number) {
    super(`Invalid price value: ${price}. Price must be greater than 0`);
    this.name = 'InvalidPriceError';
  }
}

export class InvalidRatingError extends ProductError {
  constructor(rating: number) {
    super(`Invalid rating value: ${rating}. Rating must be between 0 and 5`);
    this.name = 'InvalidRatingError';
  }
}

export class ProductNotAvailableError extends ProductError {
  constructor(productId: number) {
    super(`Product with ID ${productId} is not available`);
    this.name = 'ProductNotAvailableError';
  }
}

export class InvalidQuantityError extends ProductError {
  constructor(quantity: number) {
    super(`Invalid quantity: ${quantity}. Quantity must be greater than 0`);
    this.name = 'InvalidQuantityError';
  }
}

export class ProductReviewsLoadError extends ProductError {
  constructor(productId: number) {
    super(`Failed to load reviews for product ${productId}`);
    this.name = 'ProductReviewsLoadError';
  }
}

export class ProductSearchError extends ProductError {
  constructor() {
    super('There was an error while searching products');
    this.name = 'ProductSearchError';
  }
}
