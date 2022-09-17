import useAuth from '../context/hooks/useAuth';
import { Navigate, Outlet } from 'react-router-dom';
import { PrivateHeader } from '../components/PrivateHeader';
import Footer from '../components/Footer';

export const AdminLayout = () => {
  const { auth, loading } = useAuth();
  console.log(auth);
  if (loading) return <p>Loading</p>;
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
