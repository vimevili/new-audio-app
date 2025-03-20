import { Review } from '../../entities/Review';
import { Product } from '../../entities/Product';
import { User } from '../../entities/User';
import { InvalidProductReviewRatingError } from '../../errors/ReviewErrors';

export class CreateReviewUseCase {
  execute(
    product: Product,
    user: User,
    rating: number,
    comment: string
  ): Review {
    if (rating < 1 || rating > 5) {
      throw new InvalidProductReviewRatingError(rating);
    }

    const review = new Review(
      Date.now().toString(),
      product.id,
      user.id,
      rating,
      comment,
      new Date().toISOString(),
      new Date().toISOString()
    );

    product.reviews.push(review);
    user.reviews.push(review);

    return review;
  }
}
