import { OrderStatus } from '@/domain/entities/Order';

export interface UpdateOrderUseCase {
  execute(input: UpdateOrderInput): Promise<UpdateOrderOutput>;
}

export type UpdateOrderInput = {
  id: string;
  status: OrderStatus;
  updated_at: string;
};

export type UpdateOrderOutput = {
  success: boolean;
  id?: number;
};
