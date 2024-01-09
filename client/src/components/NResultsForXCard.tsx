import React, { useEffect, useState } from 'react';
import useBook from '../context/hooks/useBook';
import { Navigate, useNavigate, useSearchParams } from 'react-router-dom';

interface Props {
  booksLength: number;
}

const NResultsForXCard = ({ booksLength }: Props) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [x, setX] = useState('');
  const [loading, setLoading] = useState(true);
  const search = searchParams.get('search');
  const category = searchParams.get('category');
  const navigate = useNavigate();
  useEffect(() => {
    if (search) {
      setX(search);
    } else if (category) {
      setX(category.replace(/\d+/g, '')); //without numbers from string
    } else {
      navigate('/');
    }
    setLoading(false);
  }, []);
  if (loading)
    return (
      <div className="bg-orange-200 border-y my-2 border-yellow-900 text-center p-2">
        <h2 className="flex items-baseline justify-center text-black font-bold" data-testid="title">
          <span className="w-12 h-3 rounded-lg mx-1 bg-slate-300"></span>
          <span>Results for </span>
          <span className="w-4 h-3 rounded-lg mx-1 bg-slate-300"></span>
        </h2>
      </div>
    );
  return (
    <div className="bg-orange-200 border-y my-2 border-yellow-900 text-center p-2">
      <h2 className="text-black font-bold" data-testid="title">
        <span className="text-orange-600">{booksLength}</span> Results for{' '}
        <span className="text-orange-600">{x}</span>
      </h2>
    </div>
  );
};

export default NResultsForXCard;
