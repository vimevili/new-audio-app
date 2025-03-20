import { Product } from '../../entities/Product';
import { User } from '../../entities/User';
import {
  ProductReviewNotFoundError,
  UnauthorizedProductReviewError,
} from '../../errors/ReviewErrors';

export class DeleteReviewUseCase {
  execute(product: Product, user: User, reviewId: string): void {
    const review = product.reviews.find((r) => r.id === reviewId);

    if (!review) {
      throw new ProductReviewNotFoundError();
    }

    if (review.userId !== user.id) {
      throw new UnauthorizedProductReviewError();
    }

    const reviewIndex = product.reviews.findIndex((r) => r.id === reviewId);
    product.reviews.splice(reviewIndex, 1);

    const userReviewIndex = user.reviews.findIndex((r) => r.id === reviewId);
    user.reviews.splice(userReviewIndex, 1);
  }
}
