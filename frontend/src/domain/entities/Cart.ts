import { CartItem } from './CartItem';

export class Cart {
  constructor(
    public readonly items: CartItem[],
    public readonly itemsQuantity: number,
    public readonly totalPrice: number
  ) {}

  public hasItem(productId: number): boolean {
    return this.items.some((item) => item.product.id === productId);
  }

  public getItem(productId: number): CartItem | undefined {
    return this.items.find((item) => item.product.id === productId);
  }

  public addNewItem(item: CartItem): Cart {
    const newItems = [...this.items, item];
    return this.calculateTotals(newItems);
  }

  public updateExistingItem(productId: number, newQuantity: number): Cart {
    const newItems = this.items.map((item) => {
      if (item.product.id === productId) {
        return new CartItem(item.product, newQuantity);
      }
      return item;
    });
    return this.calculateTotals(newItems);
  }

  public updateItemQuantity(productId: number, quantity: number): Cart {
    const newItems = this.items.map((item) => {
      if (item.product.id === productId) {
        return new CartItem(item.product, quantity);
      }
      return item;
    });

    return this.calculateTotals(newItems);
  }

  public removeItem(productId: number): Cart {
    const newItems = this.items.filter((item) => item.product.id !== productId);
    return this.calculateTotals(newItems);
  }

  public clear(): Cart {
    return new Cart([], 0, 0);
  }

  private calculateTotals(items: CartItem[]): Cart {
    const itemsQuantity = items.reduce((sum, item) => sum + item.quantity, 0);
    const totalPrice = items.reduce(
      (sum, item) => sum + item.product.price * item.quantity,
      0
    );

    return new Cart(items, itemsQuantity, totalPrice);
  }
}
