import { Link, Outlet } from 'react-router-dom';
import Footer from '../components/Footer';
import { PrivateHeader } from '../components/PrivateHeader';
import useAuth from '../context/hooks/useAuth';

const AuthLayout = () => {
  const { auth, loading } = useAuth();

  if (loading) return <p>loading</p>;
  return (
    <>
      {auth.id ? (
        <>
          <PrivateHeader />
          <main className="h-full min-h-screen">
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
          <Outlet />
        </>
      )}
    </>
  );
};

export default AuthLayout;
