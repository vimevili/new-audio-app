import { Product } from './Product';

export class CartItem {
  constructor(
    public readonly product: Product,
    public readonly quantity: number
  ) {}
}
