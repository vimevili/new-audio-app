export class Review {
  constructor(
    public readonly id: string,
    public readonly productId: number,
    public readonly userId: string,
    public rating: number,
    public comment: string,
    public readonly createdAt: string,
    public updatedAt: string
  ) {}
}
