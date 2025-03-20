import { Product } from '../../entities/Product';

export interface SearchProduct {
  execute(query: string): Promise<Product[]>;
}
