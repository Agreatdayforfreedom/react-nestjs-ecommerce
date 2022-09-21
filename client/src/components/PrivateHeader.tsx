import { Link } from 'react-router-dom';
import useAuth from '../context/hooks/useAuth';
import { RiShoppingCartFill } from 'react-icons/ri';
import { useEffect, useState } from 'react';
import useCart from '../context/hooks/useCart';
import { Search } from './Search';
import { MenuNav } from './MenuNav';

export const PrivateHeader = () => {
  const { auth, logout } = useAuth();
  const { cartItems } = useCart();
  const [lengthCart, setLengthCart] = useState<number>(0);

  useEffect(() => {
    setLengthCart(cartItems.length);
  }, [cartItems]);
  return (
    <header>
      <div className="flex flex-col md:flex-row md:items-start justify-between items-center">
        <div className="order-2 md:order-1 w-full">
          <Link
            to="/"
            className="
          
          px-2 text-4xl font-bold
          "
          >
            Library
          </Link>
          <div className="relative flex justify-center items-center">
            {/* menu */}
            <MenuNav />
            <Search />
          </div>
        </div>
        {/* cart */}
        <div className="order-1 md:order-2 w-full flex flex-col items-end">
          <div className="border-l-2 border-b-2 border-orange-300 border-dotted w-fit">
            <Link
              to="/my-data"
              className="px-2 
              border-orange-300
              hover:border-x-2 hover:border-dotted 
              hover:text-orange-500
              transition-all"
            >
              My data
            </Link>
            <Link
              to="/orders"
              className="px-2 
              border-orange-300
              hover:border-x-2 hover:border-dotted
              hover:text-orange-500 transition-all"
            >
              My orders
            </Link>
            <button
              onClick={logout}
              className="px-2 pb-1 border-l-2 border-dotted border-orange-600 hover:font-bold hover:text-orange-400 transition-all"
            >
              Log Out
            </button>
          </div>
          <div className="flex justify-end">
            <div className="flex items-end mr-4">
              <Link to="/cart">
                <RiShoppingCartFill
                  size="35"
                  className=" text-orange-800 hover:cursor-pointer 
                md:mt-8 hover:text-orange-900 transition-all"
                />
              </Link>
              <p className="px-1 text-2xl font-bold text-gray-700 transition-all">
                {lengthCart}
              </p>
            </div>
          </div>
        </div>
      </div>
      {/* sub header */}
      <div className="border-t text-center border-slate-600 sm:border-none">
        <nav className="hidden sm:flex justify-end">
          <div className="w-full border-t border-r border-slate-600 flex justify-center relative">
            <Link
              to="/categories"
              className="px-3 mx-0.5 bg-slate-600 text-white"
            >
              Categories
            </Link>
            <Link
              to="#"
              className="px-3 md:mx-0.5 bg-slate-600 text-white left-1/2"
            >
              Some
            </Link>
            <Link to="#" className="px-3 mx-0.5 bg-slate-600 text-white">
              Top 100
            </Link>
            <Link
              to="/news?order_news=DESC"
              className="px-3  mx-0.5 bg-slate-600 text-white left-[72%]"
            >
              News
            </Link>
          </div>
          {auth.role === 'admin' && (
            <Link
              to="/admin"
              className="w-fit border-b border-b-slate-600 px-2 shadow-md"
            >
              admin
            </Link>
          )}
        </nav>
      </div>
    </header>
  );
};
