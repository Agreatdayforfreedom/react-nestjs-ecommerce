import React from 'react';
import { Link, Outlet } from 'react-router-dom';
import useAuth from '../context/hooks/useAuth';

const AuthLayout = () => {
  const { auth, loading, logout } = useAuth();
  console.log('AUTH', auth);

  if (loading) return <p>loading</p>;
  return (
    <>
      {auth.id ? (
        <>
          <header className="border border-b-slate-600 flex justify-between">
            <Link to="/" className="p-4 font-bold">
              Logo pue
            </Link>
            <div>
              <div className="border">
                <button onClick={logout}>Log Out</button>
              </div>
              <div>search</div>
            </div>
          </header>
          <Outlet />
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
