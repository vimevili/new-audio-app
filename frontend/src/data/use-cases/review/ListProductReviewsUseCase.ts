import {
  HttpClientProtocol,
  HttpStatusCode,
} from '@/data/protocols/http/HttpClientProtocol';
import { Review } from '@/domain/entities/Review';
import { ListProductReviewsUseCase } from '@/domain/use-cases/review';
import { ReviewError } from '@/domain/errors';

export class RemoteListProductReviewsUseCase
  implements ListProductReviewsUseCase
{
  constructor(
    private readonly httpClient: HttpClientProtocol,
    private readonly url: string
  ) {}

  async execute(products_id: number[]): Promise<Review[]> {
    const httpResponse = await this.httpClient.request({
      url: `${this.url}/?product_id=${products_id.join(',')}`,
      method: 'GET',
    });

    switch (httpResponse.statusCode) {
      case HttpStatusCode.ok:
        return httpResponse.body as Review[];
      default:
        throw new ReviewError('Error listing product reviews');
    }
  }
}
