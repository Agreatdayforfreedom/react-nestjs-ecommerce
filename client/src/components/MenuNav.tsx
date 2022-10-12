import React, { useState } from 'react';
import { HiOutlineMenuAlt2 } from 'react-icons/hi';
import { Link } from 'react-router-dom';
import useAuth from '../context/hooks/useAuth';
import useBook from '../context/hooks/useBook';

export const MenuNav = () => {
  const { auth } = useAuth();

  const { toggleActions, hidden } = useBook();

  return (
    <div className="md:hidden z-50">
      <button onClick={() => toggleActions('menunav')}>
        <HiOutlineMenuAlt2 size="40" />
      </button>

      <div
        className={
          hidden.menunav
            ? 'flex flex-col z-50 items-center absolute left-0 w-full -bottom-44 bg-slate-900/90 py-2'
            : 'hidden'
        }
      >
        <Link
          to="/categories"
          className="font-bold text-white p-1 hover:bg-slate-900/90 w-full text-center"
          onClick={() => toggleActions('menunav')}
        >
          Categories
        </Link>
        <Link
          to="#"
          className="font-bold text-white p-1 hover:bg-slate-900/90 w-full text-center"
          onClick={() => toggleActions('menunav')}
        >
          Some
        </Link>
        <Link
          to="/bestsellers"
          className="font-bold text-white p-1 hover:bg-slate-900/90 w-full text-center"
          onClick={() => toggleActions('menunav')}
        >
          Best Sellers
        </Link>
        <Link
          to="/new?order_news=DESC"
          className="font-bold text-white p-1 hover:bg-slate-900/90 w-full text-center"
          onClick={() => toggleActions('menunav')}
        >
          New
        </Link>
        {auth.role === 'admin' && (
          <Link
            to="/admin"
            className="font-bold text-orange-400 p-1 hover:bg-slate-900/90 w-full text-center"
            onClick={() => toggleActions('menunav')}
          >
            Admin
          </Link>
        )}
      </div>
    </div>
  );
};
