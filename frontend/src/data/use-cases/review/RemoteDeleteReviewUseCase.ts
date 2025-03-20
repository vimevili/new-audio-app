import {
  HttpClientProtocol,
  HttpStatusCode,
} from '@/data/protocols/http/HttpClientProtocol';
import { ReviewError } from '@/domain/errors';
import {
  DeleteReviewUseCase,
  DeleteReviewInput,
  DeleteReviewOutput,
} from '@/domain/use-cases/review';

export class RemoteDeleteReviewUseCase implements DeleteReviewUseCase {
  constructor(
    private readonly httpClient: HttpClientProtocol,
    private readonly url: string
  ) {}

  async execute(input: DeleteReviewInput): Promise<DeleteReviewOutput> {
    const httpResponse = await this.httpClient.request({
      url: `${this.url}/${input.id}`,
      method: 'DELETE',
    });

    switch (httpResponse.statusCode) {
      case HttpStatusCode.ok:
        return { success: true };
      default:
        throw new ReviewError('Error deleting review');
    }
  }
}
