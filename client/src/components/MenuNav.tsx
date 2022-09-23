import React, { useState } from 'react';
import { HiOutlineMenuAlt2 } from 'react-icons/hi';
import { Link } from 'react-router-dom';
import useAuth from '../context/hooks/useAuth';
import useBook from '../context/hooks/useBook';

export const MenuNav = () => {
  const { auth } = useAuth();

  const { toggleActions, hidden } = useBook();

  return (
    <div className="md:hidden">
      <button onClick={() => toggleActions('menunav')}>
        <HiOutlineMenuAlt2 size="40" />
      </button>

      <div
        className={
          hidden.menunav
            ? 'flex flex-col z-50 items-center absolute left-0 w-full -bottom-32 bg-slate-900/90 py-2'
            : 'hidden'
        }
      >
        <Link
          to="/categories"
          className="flex flex-col relative px-3 w-full text-white text-center after:content-[''] after:absolute after:left-1/2 after:bottom-0 after:h-px after:w-0 after:bg-slate-500 after:hover:w-full after:transition-all
          before:content-[''] before:absolute before:right-1/2 before:bottom-0 before:h-px before:w-0 before:bg-slate-500 before:hover:w-full before:transition-all"
          onClick={() => toggleActions('menunav')}
        >
          Categories
        </Link>
        <Link
          to="#"
          className="flex flex-col relative px-3 w-full text-white text-center after:content-[''] after:absolute after:left-1/2 after:bottom-0 after:h-px after:w-0 after:bg-slate-500 after:hover:w-full after:transition-all
          before:content-[''] before:absolute before:right-1/2 before:bottom-0 before:h-px before:w-0 before:bg-slate-500 before:hover:w-full before:transition-all"
          onClick={() => toggleActions('menunav')}
        >
          Some
        </Link>
        <Link
          to="#"
          className="flex flex-col relative px-3 w-full text-white text-center after:content-[''] after:absolute after:left-1/2 after:bottom-0 after:h-px after:w-0 after:bg-slate-500 after:hover:w-full after:transition-all
          before:content-[''] before:absolute before:right-1/2 before:bottom-0 before:h-px before:w-0 before:bg-slate-500 before:hover:w-full before:transition-all"
          onClick={() => toggleActions('menunav')}
        >
          Top 100
        </Link>
        <Link
          to="/news?order_news=DESC"
          className="flex flex-col relative px-3 w-full text-white text-center after:content-[''] after:absolute after:left-1/2 after:bottom-0 after:h-px after:w-0 after:bg-slate-500 after:hover:w-full after:transition-all
          before:content-[''] before:absolute before:right-1/2 before:bottom-0 before:h-px before:w-0 before:bg-slate-500 before:hover:w-full before:transition-all"
          onClick={() => toggleActions('menunav')}
        >
          News
        </Link>
        {auth.role === 'admin' && (
          <Link
            to="/admin"
            className="flex flex-col relative px-3 w-full text-white text-center after:content-[''] after:absolute after:left-1/2 after:bottom-0 after:h-px after:w-0 after:bg-slate-500 after:hover:w-full after:transition-all
          before:content-[''] before:absolute before:right-1/2 before:bottom-0 before:h-px before:w-0 before:bg-slate-500 before:hover:w-full before:transition-all"
            onClick={() => toggleActions('menunav')}
          >
            admin
          </Link>
        )}
      </div>
    </div>
  );
};
