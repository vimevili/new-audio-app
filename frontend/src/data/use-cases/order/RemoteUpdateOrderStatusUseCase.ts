import {
  UpdateOrderInput,
  UpdateOrderOutput,
  UpdateOrderUseCase,
} from '@/domain/use-cases/order';

import {
  HttpClientProtocol,
  HttpStatusCode,
} from '@/data/protocols/http/HttpClientProtocol';

export class RemoteUpdateOrderStatusUseCase implements UpdateOrderUseCase {
  constructor(
    private readonly httpClient: HttpClientProtocol,
    private readonly url: string
  ) {}

  async execute(input: UpdateOrderInput): Promise<UpdateOrderOutput> {
    const httpResponse = await this.httpClient.request({
      url: this.url,
      method: 'PUT',
      body: input,
    });

    switch (httpResponse.statusCode) {
      case HttpStatusCode.ok:
        return httpResponse.body as UpdateOrderOutput;
      default:
        throw new Error('Error updating order status');
    }
  }
}
