import { useEffect, useState } from 'react';
import { CartItem } from '../components/CartItem';
import useCart from '../context/hooks/useCart';
import { Alert } from '../interfaces';
import { FormCustomer } from './MyData';

export const Cart = () => {
  const [total, setTotal] = useState<number>(0);
  const { cartItems, newOrder, alert, setAlert } = useCart();

  useEffect(() => {
    setAlert({} as Alert);
  }, []);
  const sum = cartItems.reduce((p, c) => p + c.book.price * c.quantity, 0);
  const qty = cartItems.reduce((p, c) => p + c.quantity, 0);

  useEffect(() => {
    setTotal(sum);
  }, [cartItems]);

  const { message } = alert;
  return (
    <section>
      {cartItems.length === 0 && (
        <div className="text-center">
          <p className="text-slate-600 text-2xl py-2">The cart is empty</p>
        </div>
      )}
      {cartItems.map((c) => (
        <CartItem key={c.id} c={c} />
      ))}
      <div>
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
        {message && message.charAt(0) === 'C' ? (
          <p className="text-center text-lg font-bold text-red-700">
            Complete you data
          </p>
        ) : (
          ''
        )}
        {message && message.charAt(0) !== 'C' ? (
          <p className="text-center text-lg font-bold text-red-700">
            Add some products to your cart
          </p>
        ) : (
          ''
        )}
        {/* {message && message.charAt(0) === 'C' && <FormCustomer isCart={true} />} */}
      </div>
    </section>
  );
};
