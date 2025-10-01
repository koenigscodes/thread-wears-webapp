import { useContext, useReducer } from 'react';

import CartLogo from '../../assets/shopping-bag.svg?react';

import { CartContext } from '../../contexts/cart.context';

import './cart-icon.style.scss';

const CartIcon = () => {
  const { isCartOpen, setIsCartOpen, cartCount } = useContext(CartContext);
  
  const changeIsCartOpen = () => setIsCartOpen(!isCartOpen);

  return (
    <div className='cart-icon-container' onClick={changeIsCartOpen}>
      <CartLogo className='shopping-icon' />
      <span className='item-count'>{cartCount}</span>
    </div>
  )
}

export default CartIcon;