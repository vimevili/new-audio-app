import { Cart } from '../../entities/Cart';
import { InvalidQuantityError } from '../../errors/ProductError';

export class UpdateCartItemQuantityUseCase {
  execute(cart: Cart, productId: number, newQuantity: number): Cart {
    if (newQuantity <= 0) {
      throw new InvalidQuantityError(newQuantity);
    }

    const item = cart.items.find((item) => item.product.id === productId);
    if (!item) {
      throw new Error('Item not found in cart');
    }

    return cart.updateItemQuantity(productId, newQuantity);
  }
}
