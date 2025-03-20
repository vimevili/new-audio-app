import { Cart } from '../../entities/Cart';

export class RemoveItemFromCartUseCase {
  execute(cart: Cart, productId: number): Cart {
    const newItems = cart.items.filter((item) => item.product.id !== productId);
    const newItemsQuantity = newItems.reduce(
      (sum, item) => sum + item.quantity,
      0
    );
    const newTotalPrice = newItems.reduce(
      (sum, item) => sum + item.product.price * item.quantity,
      0
    );

    return new Cart(newItems, newItemsQuantity, newTotalPrice);
  }
}
