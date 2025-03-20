import {
  HttpClientProtocol,
  HttpStatusCode,
} from '@/data/protocols/http/HttpClientProtocol';
import { ReviewError } from '@/domain/errors';
import {
  CreateReviewUseCase,
  CreateReviewInput,
  CreateReviewOutput,
} from '@/domain/use-cases/review';

export class RemoteCreateReview implements CreateReviewUseCase {
  constructor(
    private readonly httpClient: HttpClientProtocol,
    private readonly url: string
  ) {}

  async execute(input: CreateReviewInput): Promise<CreateReviewOutput> {
    const httpResponse = await this.httpClient.request({
      url: this.url,
      method: 'POST',
      body: input,
    });

    switch (httpResponse.statusCode) {
      case HttpStatusCode.created:
        return {
          success: true,
          id: (httpResponse.body as { id: number }).id,
        };
      default:
        throw new ReviewError('Error creating review');
    }
  }
}
