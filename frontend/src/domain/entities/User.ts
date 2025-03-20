import { Order } from './Order';
import { Review } from './Review';

export class User {
  constructor(
    public readonly id: string,
    public readonly name: string,
    public readonly email: string,
    public readonly avatar: string,
    public readonly last_name?: string,
    public readonly orders: Order[] = [],
    public readonly reviews: Review[] = []
  ) {}
}
