import { UpdateReviewInput } from '@/domain/use-cases/review';
import { UpdateReviewOutput } from '@/domain/use-cases/review';
import {
  HttpClientProtocol,
  HttpStatusCode,
} from '@/data/protocols/http/HttpClientProtocol';
import { UpdateReviewUseCase } from '@/domain/use-cases/review';
import { ReviewError } from '@/domain/errors';

export class RemoteUpdateReviewUseCase implements UpdateReviewUseCase {
  constructor(
    private readonly httpClient: HttpClientProtocol,
    private readonly url: string
  ) {}

  async execute(input: UpdateReviewInput): Promise<UpdateReviewOutput> {
    const httpResponse = await this.httpClient.request({
      url: `${this.url}/${input.id}`,
      method: 'PUT',
      body: input,
    });

    switch (httpResponse.statusCode) {
      case HttpStatusCode.ok:
        return { success: true };
      default:
        throw new ReviewError('Error updating review');
    }
  }
}
