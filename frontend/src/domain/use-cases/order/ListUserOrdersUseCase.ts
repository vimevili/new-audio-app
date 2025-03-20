import { Order } from '../../entities/Order';
import { User } from '../../entities/User';

export class ListUserOrdersUseCase {
  execute(user: User): Order[] {
    return user.orders;
  }
}
