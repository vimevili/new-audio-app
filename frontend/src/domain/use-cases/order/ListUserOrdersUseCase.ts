import { Order } from '../../entities/Order';

export interface ListUserOrdersUseCase {
  execute(userId: string): Promise<Order[]>;
}
