import { useContext } from 'react';
import { CartContext } from '../CartProvider';

const useCart = () => useContext(CartContext);

export default useCart;
