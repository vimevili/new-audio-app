export class EmptyCartError extends Error {
  constructor() {
    super('Cannot create order with empty cart');
    this.name = 'EmptyCartError';
  }
}

export class OrderNotFoundError extends Error {
  constructor() {
    super('Order not found');
    this.name = 'OrderNotFoundError';
  }
}

export class InvalidOrderStatusError extends Error {
  constructor(status: string) {
    super(`Invalid order status: ${status}`);
    this.name = 'InvalidOrderStatusError';
  }
}
