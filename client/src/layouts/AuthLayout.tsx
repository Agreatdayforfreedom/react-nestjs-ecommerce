import { Link, Outlet } from 'react-router-dom';
import Footer from '../components/Footer';
import { Loading } from '../components/Loading';
import { PrivateHeader } from '../components/PrivateHeader';
import useAuth from '../context/hooks/useAuth';

const AuthLayout = () => {
  const { auth, loading } = useAuth();

  if (loading) return <Loading />;
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
          <header className="border border-b-slate-600 flex justify-between">
            <Link to="/" className="p-4 font-bold">
              Logo pue
            </Link>
            <div>
              <div className="border">
                <Link to="/login" className="mx-4">
                  Login
                </Link>
                <Link to="/signup">Sign up</Link>
              </div>
              <div>search</div>
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
