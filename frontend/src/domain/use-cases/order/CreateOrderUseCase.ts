import { Order, OrderStatus } from '../../entities/Order';
import { Cart } from '../../entities/Cart';
import { User } from '../../entities/User';
import { EmptyCartError } from '../../errors/OrderErrors';

export class CreateOrderUseCase {
  execute(cart: Cart, user: User): Order {
    if (cart.items.length === 0) {
      throw new EmptyCartError();
    }

    const order = new Order(
      Date.now().toString(), // Converting timestamp to string
      user.id,
      cart.items,
      cart.totalPrice,
      'pending' as OrderStatus,
      new Date().toISOString(),
      new Date().toISOString()
    );

    user.orders.push(order);
    return order;
  }
}
