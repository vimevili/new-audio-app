import { DomainError } from './DomainError';

export class ReviewError extends DomainError {
  constructor(message: string) {
    super(message);
    this.name = 'ReviewError';
  }
}

export class InvalidReviewError extends ReviewError {
  constructor(message: string) {
    super(message);
    this.name = 'InvalidReviewError';
  }
}

export class ReviewNotFoundError extends ReviewError {
  constructor(reviewId: number) {
    super(`Review with ID ${reviewId} not found`);
    this.name = 'ReviewNotFoundError';
  }
}

export class InvalidReviewRatingError extends ReviewError {
  constructor(rating: number) {
    super(`Rating must be between 1 and 5. Received: ${rating}`);
    this.name = 'InvalidReviewRatingError';
  }
}
