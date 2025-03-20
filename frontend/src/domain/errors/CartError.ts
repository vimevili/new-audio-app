import { DomainError } from './DomainError';

export class CartError extends DomainError {
  constructor(message: string) {
    super(message);
    this.name = 'CartError';
  }
}

export class CartNotFoundError extends CartError {
  constructor(userId: string) {
    super(`Cart for user ${userId} not found`);
    this.name = 'CartNotFoundError';
  }
}

export class CartItemQuantityError extends CartError {
  constructor(productId: number, quantity: number) {
    super(`Invalid quantity ${quantity} for product ${productId}`);
    this.name = 'CartItemQuantityError';
  }
}

export class CartItemAlreadyExistsError extends CartError {
  constructor(productId: number) {
    super(`Product with ID ${productId} already exists in cart`);
    this.name = 'CartItemAlreadyExistsError';
  }
}

export class CartEmptyError extends CartError {
  constructor() {
    super('Cart is empty');
    this.name = 'CartEmptyError';
  }
}
