import { CartItem } from './CartItem';

export type OrderStatus = 'pending' | 'completed' | 'cancelled';

export class Order {
  constructor(
    public readonly id: string,
    public readonly userId: string,
    public readonly items: CartItem[],
    public readonly totalPrice: number,
    public status: OrderStatus,
    public readonly createdAt: string,
    public updatedAt: string
  ) {}
}
