import { useEffect, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { fetchAndCache } from '../utils/fetchAndCache';
import { Category as ICategory } from '../interfaces';
import { Spinner } from '../components/Spinner';

export const Categories = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [loading, setLoading] = useState(true);
  const [categories, setCategories] = useState<ICategory[]>([]);

  useEffect(() => {
    const cacheName: string = 'categoryList';
    const url = `${import.meta.env.VITE_URL_BACK}/categories`;
    console.log('xD');

    const fetch = async () => {
      setLoading(true);
      const data = await fetchAndCache(cacheName, url);
      setCategories(data);
      setLoading(false);
    };
    fetch();
  }, []);

  const setParam = (category: ICategory) => {
    // searchParams.set('category', `${category.name}${category.id}`);
    // searchParams.set('page', '1');
    // setSearchParams(searchParams);
  };

  if (loading) return <Spinner />;
  return (
    <div className="grid sm:grid-cols-3 md:grid-cols-5 text-center w-fit m-auto mt-10">
      {categories.map((category) => (
        <div className="w-full h-full border grid content-center">
          <Link to={`/books?category=${category.name}${category.id}&page=1`}>
            <span
              // onClick={() => setParam(category)}
              className="inline-block break-all text-2xl  px-4 py-2 text-amber-500 font-bold hover:cursor-pointer after:content-[''] after:w-0 after:block after:bg-amber-600 after:h-1 hover:after:w-full after:transition-all"
            >
              {category.name}
            </span>
          </Link>
        </div>
      ))}
    </div>
  );
};
