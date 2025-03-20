import {
  HttpClientProtocol,
  HttpStatusCode,
} from '@/data/protocols/http/HttpClientProtocol';
import { Review } from '@/domain/entities/Review';
import { ProductNotFoundError } from '@/domain/errors/ProductError';
import { GetProductReviews } from '@/domain/use-cases/review/GetProductReviews';

interface RemoteReview {
  id: string;
  product_id: number;
  user_id: string;
  rating: number;
  comment: string;
  created_at: string;
  updated_at: string;
}

export class RemoteGetProductReviews implements GetProductReviews {
  constructor(
    private readonly httpClient: HttpClientProtocol,
    private readonly url: string
  ) {}

  async execute(productId: number): Promise<Review[]> {
    const httpResponse = await this.httpClient.request({
      method: 'GET',
      url: `${this.url}/?product_id=${productId}`,
    });

    switch (httpResponse.statusCode) {
      case HttpStatusCode.ok:
        return this.parse(httpResponse.body as RemoteReview[]);
      case HttpStatusCode.notFound:
        throw new ProductNotFoundError();
      default:
        throw new Error('Error getting product reviews');
    }
  }

  private parse(httpResponse: RemoteReview[]): Review[] {
    return httpResponse.map((review) => ({
      id: review.id,
      productId: review.product_id,
      userId: review.user_id,
      rating: review.rating,
      comment: review.comment,
      createdAt: review.created_at,
      updatedAt: review.updated_at,
    }));
  }
}
