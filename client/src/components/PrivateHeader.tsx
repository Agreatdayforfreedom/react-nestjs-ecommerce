import { Link } from 'react-router-dom';
import useAuth from '../context/hooks/useAuth';
import { RiShoppingCartFill } from 'react-icons/ri';

export const PrivateHeader = () => {
  const { auth, logout } = useAuth();

  return (
    <header>
      <div className="flex justify-between">
        <Link to="/" className="p-4 font-bold">
          Logo pue
        </Link>
        <div>
          <div className="border">
            {auth.role === 'admin' && (
              <>
                <Link to="create">Add Book</Link>
              </>
            )}
            <Link to="/my-data">My data</Link>
            <button onClick={logout} className="px-2 border border-orange-600">
              Log Out
            </button>
          </div>
          <Link to="/cart">
            <RiShoppingCartFill
              size="25"
              className="text-orange-800 hover:cursor-pointer hover:text-orange-900 transition-all"
            />
          </Link>
          <div>search</div>
        </div>
      </div>
      <div className="flex justify-end before:content-[''] before:w-full before:border-t before:border-r before:border-slate-600">
        <Link
          to="/admin"
          className="w-fit border-b border-b-slate-600 px-2 shadow-md"
        >
          admin
        </Link>
      </div>
    </header>
  );
};
