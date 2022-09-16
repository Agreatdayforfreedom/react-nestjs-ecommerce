import { useEffect, useState } from 'react';
import { CartItem } from '../components/CartItem';
import useCart from '../context/hooks/useCart';

export const Cart = () => {
  const [total, setTotal] = useState<number>(0);
  const { cartItems, newOrder } = useCart();

  const sum = cartItems.reduce((p, c) => p + c.book.price * c.quantity, 0);
  const qty = cartItems.reduce((p, c) => p + c.quantity, 0);

  useEffect(() => {
    setTotal(sum);
  }, [cartItems]);
  return (
    <section>
      {cartItems.map((c) => (
        <>
          <CartItem key={c.id} c={c} />
        </>
      ))}
      <div className="flex justify-between m-2 border rounded bg-lime-700">
        <div>
          <p className="text-white mt-1 mx-2 ">Items: {qty}</p>
          <h3 className="text-lg mb-2 mx-2 text-white">Subtotal: ${total}</h3>
        </div>
        <button
          onClick={newOrder}
          className="m-3 mt-7 bg-orange-600 px-4 py-2 rounded-lg font-bold text-white border border-orange-900"
        >
          Buy
        </button>
      </div>
    </section>
  );
};
