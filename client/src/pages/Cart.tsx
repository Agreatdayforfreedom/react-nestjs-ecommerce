import { CartItem } from '../components/CartItem';
import useCart from '../context/hooks/useCart';

export const Cart = () => {
  const { cartItems } = useCart();

  return (
    <>
      {cartItems.map((c) => (
        <CartItem key={c.id} c={c} />
      ))}
    </>
  );
};
