import { RiShoppingCartFill } from 'react-icons/ri';
import { Link, Outlet } from 'react-router-dom';
import Footer from '../components/Footer';
import { Spinner } from '../components/Loading';
import { MenuNav } from '../components/MenuNav';
import { PrivateHeader } from '../components/PrivateHeader';
import { Search } from '../components/Search';
import useAuth from '../context/hooks/useAuth';

const AuthLayout = () => {
  const { auth, loading } = useAuth();

  if (loading) return <Spinner />;
  return (
    <>
      {auth.id ? (
        <>
          <PrivateHeader />
          <main className="pb-20">
            <Outlet />
          </main>
          <Footer />
        </>
      ) : (
        <>
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
                    to="/login"
                    className="px-2 
              border-orange-300
              hover:border-x-2 hover:border-dotted 
              hover:text-orange-500
              transition-all"
                  >
                    Login
                  </Link>
                  <Link
                    to="/signup"
                    className="px-2 
              border-orange-300
              hover:border-x-2 hover:border-dotted
              hover:text-orange-500 transition-all"
                  >
                    Sign Up
                  </Link>
                </div>
                <div className="flex justify-end">
                  <div className="flex items-end mr-4">
                    <Link to="#">
                      <RiShoppingCartFill
                        size="35"
                        className=" text-orange-800 hover:cursor-pointer 
                md:mt-8 hover:text-orange-900 transition-all"
                      />
                    </Link>
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
                    className="px-6 py-1 mx-2 bg-slate-600 text-white"
                  >
                    Categories
                  </Link>
                  <Link
                    to="#"
                    className="px-6 py-1 mx-2 md:mx-0.5 bg-slate-600 text-white left-1/2"
                  >
                    Some
                  </Link>
                  <Link
                    to="#"
                    className="px-6 py-1 mx-2 bg-slate-600 text-white"
                  >
                    Top 100
                  </Link>
                  <Link
                    to="/news?order_news=DESC"
                    className="px-6 py-1 mx-2 bg-slate-600 text-white left-[72%]"
                  >
                    News
                  </Link>
                </div>
              </nav>
            </div>
          </header>
          <main className="pb-20">
            <Outlet />
          </main>
          <Footer />
        </>
      )}
    </>
  );
};

export default AuthLayout;
