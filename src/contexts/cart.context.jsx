import { useEffect } from "react";
import { createContext, useState } from "react";

const addCartItem = (cartItems, productToAdd) => {
  const existingCartItem = cartItems.find((cartItem) => cartItem.id === productToAdd.id);

  if (existingCartItem) {
    return cartItems.map((cartItem) => cartItem.id === productToAdd.id ? 
      {...cartItem, quantity: cartItem.quantity + 1}
      : cartItem
    )
  }

  return [...cartItems, {...productToAdd, quantity: 1}];
}

const removeCartItem = (cartItems, productToRemove) => {
  const existingCartItem = cartItems.find((cartItem) => cartItem.id === productToRemove.id);

  if (existingCartItem.quantity === 1) {
    return cartItems.filter((cartItem) => cartItem.id !== productToRemove.id);
  }

  return cartItems.map((cartItem) => cartItem.id === productToRemove.id ? 
    {...cartItem, quantity: cartItem.quantity - 1}
    : cartItem
  )  
}

const clearCartItem = (cartItems, itemToClear) => {
  return cartItems.filter((cartItem) => cartItem.id !== itemToClear.id);
}


export const CartContext = createContext({
  isCartOpen: false, 
  setIsCartOpen: () => {},
  cartItems: [],
  addItemToCart: () => {},
  removeItemFromCart: () => {},
  clearItemFromCart: () => {},
  cartCount: 0,
  total: 0,
});

export const CartProvider = ({ children }) => {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [cartCount, setCartCount] = useState(0);
  const [cartTotal, setCartTotal] = useState(0);

  useEffect(() => {
    const itemCount = cartItems.reduce((total, item) => {
      return  total + item.quantity
    }, 0);
    setCartCount(itemCount);
  }, [cartItems])

  useEffect(() => {
    const totalCartAmount = cartItems.reduce((total, item) => {
      return total + (item.quantity * item.price); 
    }, 0);
    setCartTotal(totalCartAmount);
  }, [cartItems])

  const addItemToCart = (productToAdd) => {
    setCartItems(cartItems => addCartItem(cartItems, productToAdd));
  }

  const removeItemFromCart = (productToRemove) => {
    setCartItems(cartItems => removeCartItem(cartItems, productToRemove));
  }

  const clearItemFromCart = (itemToClear) => {
    setCartItems(cartItems => clearCartItem(cartItems, itemToClear));
  }

  const value = { isCartOpen, setIsCartOpen, addItemToCart, removeItemFromCart, clearItemFromCart, cartItems, cartCount, cartTotal };

  return (
    <CartContext.Provider value={value}>{children}</CartContext.Provider>
  )
};