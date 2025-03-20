import { Review } from '../../entities/Review';

export interface ListProductReviewsUseCase {
  execute(products_id: number[]): Promise<Review[]>;
}
