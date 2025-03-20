import { Order, OrderStatus } from '../../entities/Order';
import { User } from '../../entities/User';
import {
  OrderNotFoundError,
  InvalidOrderStatusError,
} from '../../errors/OrderErrors';

export class UpdateOrderStatusUseCase {
  execute(user: User, orderId: string, newStatus: OrderStatus): Order {
    const order = user.orders.find((o) => o.id === orderId);

    if (!order) {
      throw new OrderNotFoundError();
    }

    if (!['pending', 'completed', 'cancelled'].includes(newStatus)) {
      throw new InvalidOrderStatusError(newStatus);
    }

    order.status = newStatus;
    order.updatedAt = new Date().toISOString();

    return order;
  }
}
