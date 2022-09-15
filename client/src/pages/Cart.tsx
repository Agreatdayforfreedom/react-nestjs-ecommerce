import { CartItem } from '../components/CartItem';
import useCart from '../context/hooks/useCart';

export const Cart = () => {
  const { cartItems, loading } = useCart();

  console.log(cartItems);
  if (loading && !cartItems) return <p>loading</p>;
  return (
    <>
      {cartItems.map((c) => (
        <CartItem key={c.id} c={c} />
      ))}
    </>
  );
};
