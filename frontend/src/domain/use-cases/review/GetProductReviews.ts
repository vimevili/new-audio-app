import { Review } from '@/domain/entities/Review';

export interface GetProductReviews {
  execute: (productId: number) => Promise<Review[]>;
}
