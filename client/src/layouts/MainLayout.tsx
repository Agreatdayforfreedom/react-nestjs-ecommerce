import { useEffect } from 'react';
import { Link, Outlet, Navigate } from 'react-router-dom';
import Footer from '../components/Footer';
import { PrivateHeader } from '../components/PrivateHeader';
import useAuth from '../context/hooks/useAuth';

const MainLayout = () => {
  const { auth, loading } = useAuth();

  useEffect(() => {
    console.log(auth);
  }, []);
  if (loading) return <p>loading</p>;
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
        <Navigate to="/" />
      )}
    </>
  );
};

export default MainLayout;
