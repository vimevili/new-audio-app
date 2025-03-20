import { Product } from '@/domain/entities';
import { OrderStatus } from '@/domain/entities/Order';

export interface CreateOrderUseCase {
  execute(input: CreateOrderInput): Promise<CreateOrderOutput>;
}

export type CreateOrderInput = {
  user_id: string;
  items: Product[];
  total_price: number;
  status: OrderStatus;
  created_at: string;
  updated_at: string;
};

export type CreateOrderOutput = {
  success: boolean;
  id?: number;
};
