import { Review } from '../../entities/Review';
import { Product } from '../../entities/Product';
import { User } from '../../entities/User';
import {
  ProductReviewNotFoundError,
  UnauthorizedProductReviewError,
  InvalidProductReviewRatingError,
} from '../../errors/ReviewErrors';

export class UpdateReviewUseCase {
  execute(
    product: Product,
    user: User,
    reviewId: string,
    rating: number,
    comment: string
  ): Review {
    if (rating < 1 || rating > 5) {
      throw new InvalidProductReviewRatingError(rating);
    }

    const review = product.reviews.find((r) => r.id === reviewId);

    if (!review) {
      throw new ProductReviewNotFoundError();
    }

    if (review.userId !== user.id) {
      throw new UnauthorizedProductReviewError();
    }

    review.rating = rating;
    review.description = comment;
    review.updatedAt = new Date().toISOString();

    return review;
  }
}
