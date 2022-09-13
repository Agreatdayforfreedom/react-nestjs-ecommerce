import React from 'react';
import { Link, Outlet } from 'react-router-dom';
import useAuth from '../context/hooks/useAuth';

export const PrivateHeader = () => {
  const { auth, logout } = useAuth();

  return (
    <>
      <header className="border border-b-slate-600 flex justify-between">
        <Link to="/" className="p-4 font-bold">
          Logo pue
        </Link>
        <div>
          <div className="border">
            {auth.role === 'admin' && <Link to="create">Add Book</Link>}
            <button onClick={logout} className="px-2 border border-orange-600">
              Log Out
            </button>
          </div>
          <div>search</div>
        </div>
      </header>
      <Outlet />
    </>
  );
};
