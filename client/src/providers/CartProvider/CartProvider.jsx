import { useEffect, useState } from "react";
import {
  addCart,
  clearCart,
  editCart,
  getCart,
  removeFromCart,
} from "../../api";
import { CartContext } from "../../context";

function CartProvider({ children }) {
  const [cart, setCart] = useState({ items: [] });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchProduct() {
      setIsLoading(true);

      const data = await getCart();
      console.log(data);
      setCart(data || { items: [] });
      setIsLoading(false);
    }

    fetchProduct();
  }, []);

  async function addToCart(productID, quantity = 1) {
    setIsLoading(true);
    const updateCart = await addCart(productID, quantity);
    setCart({ ...updateCart });
    setIsLoading(false);
  }

  async function deleteFromCart(productID) {
    const updateCart = await removeFromCart(productID);
    setCart(updateCart);
  }

  async function updateQuantity(productID, quantity) {
    const updateCart = await editCart(productID, quantity);
    setCart(updateCart);
  }

  function isInCart(productID) {
    return cart.items.some((item) => item.product._id === productID);
  }

  async function clearAllFromCart() {
    const updateCart = await clearCart();
    setCart(updateCart);
  }

  return (
    <CartContext.Provider
      value={{
        cart,
        isLoading,
        addToCart,
        deleteFromCart,
        updateQuantity,
        isInCart,
        clearAllFromCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}
export default CartProvider;
