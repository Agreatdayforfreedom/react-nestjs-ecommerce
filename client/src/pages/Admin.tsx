import React from 'react';
import { Link } from 'react-router-dom';

export const Admin = () => {
  return (
    <div className="flex flex-col my-10 mx-4 bg-amber-600 rounded p-2">
      <Link
        to="/create"
        className="bg-white p-2 rounded hover:text-white hover:font-bold hover:bg-amber-600 hover:border transition-all"
      >
        Add book
      </Link>
      <Link
        to="/create/category"
        className="bg-white p-2 my-1 rounded hover:text-white hover:font-bold hover:bg-amber-600 hover:border transition-all"
      >
        Add Categories
      </Link>
    </div>
  );
};
