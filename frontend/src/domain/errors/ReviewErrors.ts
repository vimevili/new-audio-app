export class ProductReviewNotFoundError extends Error {
  constructor() {
    super('Review not found');
    this.name = 'ProductReviewNotFoundError';
  }
}

export class UnauthorizedProductReviewError extends Error {
  constructor() {
    super('User is not authorized to modify this review');
    this.name = 'UnauthorizedProductReviewError';
  }
}

export class InvalidProductReviewRatingError extends Error {
  constructor(rating: number) {
    super(`Rating must be between 1 and 5. Received: ${rating}`);
    this.name = 'InvalidProductReviewRatingError';
  }
}
