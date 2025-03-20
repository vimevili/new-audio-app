import { Review } from './Review';

export class Product {
  constructor(
    public readonly id: number,
    public readonly name: string,
    public readonly category: string,
    public readonly description: string,
    public readonly image_url: string,
    public readonly price: number,
    public readonly rating: number,
    public readonly reviews: Review[] = []
  ) {}
}
