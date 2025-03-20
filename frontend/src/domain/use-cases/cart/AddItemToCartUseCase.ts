import { Cart } from '../../entities/Cart';
import { CartItem } from '../../entities/CartItem';
import { Product } from '../../entities/Product';
import { InvalidQuantityError } from '../../errors/ProductError';

export class AddItemToCartUseCase {
  execute(cart: Cart, product: Product, quantity: number): Cart {
    if (quantity <= 0) {
      throw new InvalidQuantityError(quantity);
    }

    const newItem = new CartItem(product, quantity);

    if (cart.hasItem(product.id)) {
      const existingItem = cart.getItem(product.id)!;
      return cart.updateExistingItem(
        product.id,
        existingItem.quantity + quantity
      );
    }

    return cart.addNewItem(newItem);
  }
}
