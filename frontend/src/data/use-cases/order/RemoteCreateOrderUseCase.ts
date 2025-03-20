import {
  HttpClientProtocol,
  HttpStatusCode,
} from '@/data/protocols/http/HttpClientProtocol';
import {
  CreateOrderInput,
  CreateOrderOutput,
  CreateOrderUseCase,
} from '@/domain/use-cases/order';

export class RemoteCreateOrderUseCase implements CreateOrderUseCase {
  constructor(
    private readonly httpClient: HttpClientProtocol,
    private readonly url: string
  ) {}

  async execute(input: CreateOrderInput): Promise<CreateOrderOutput> {
    const httpResponse = await this.httpClient.request({
      url: this.url,
      method: 'POST',
      body: input,
    });

    switch (httpResponse.statusCode) {
      case HttpStatusCode.ok:
        return httpResponse.body as CreateOrderOutput;
      default:
        throw new Error('Error creating order');
    }
  }
}
