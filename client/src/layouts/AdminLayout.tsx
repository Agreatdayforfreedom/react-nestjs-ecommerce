import useAuth from '../context/hooks/useAuth';
import { Navigate, Outlet } from 'react-router-dom';
import { PrivateHeader } from '../components/PrivateHeader';
import Footer from '../components/Footer';
import { Loading } from '../components/Loading';

export const AdminLayout = () => {
  const { auth, loading } = useAuth();
  if (loading) return <Loading />;
  return (
    <div>
      {auth.id && auth.role === 'admin' ? (
        <>
          <PrivateHeader />
          <main className="pb-20">
            <Outlet />
          </main>
          <Footer />
        </>
      ) : (
        <Navigate to="/" />
      )}
    </div>
  );
};
