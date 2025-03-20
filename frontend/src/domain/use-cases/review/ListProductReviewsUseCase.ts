import { Review } from '../../entities/Review';
import { Product } from '../../entities/Product';

export class ListProductReviewsUseCase {
  execute(product: Product): Review[] {
    return product.reviews;
  }
}
