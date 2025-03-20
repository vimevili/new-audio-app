import {
  HttpClientProtocol,
  HttpStatusCode,
} from '@/data/protocols/http/HttpClientProtocol';
import { Order } from '@/domain/entities/Order';
import { ListUserOrdersUseCase } from '@/domain/use-cases/order';

export class RemoteListUserOrdersUseCase implements ListUserOrdersUseCase {
  constructor(
    private readonly httpClient: HttpClientProtocol,
    private readonly url: string
  ) {}

  async execute(userId: string): Promise<Order[]> {
    const httpResponse = await this.httpClient.request({
      url: `${this.url}/?user_id=${userId}`,
      method: 'GET',
    });

    switch (httpResponse.statusCode) {
      case HttpStatusCode.ok:
        return httpResponse.body as Order[];
      default:
        throw new Error('Error listing user orders');
    }
  }
}
