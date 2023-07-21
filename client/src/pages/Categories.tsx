import axios from 'axios';
import { useEffect, useState } from 'react';
import { Link, useLocation, useSearchParams } from 'react-router-dom';
import { Spinner } from '../components/Spinner';
import useBook from '../context/hooks/useBook';
import { SpawnBooksSection } from '../components/SpawnBooksSection';
import { fetchAndCache } from '../utils/fetchAndCache';
import { Category } from '../interfaces';
import { nanoid } from 'nanoid';
import { useSearchQuery } from '../hooks/useSearchQuery';

export interface CatBooks {
  cat: string;
  books: Array<any>;
}
export const Categories = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [categories, setCategories] = useState<Category[]>([]);

  const { fetchBooksBy, booksFiltered, setBooksFiltered } = useBook();
  const [loading, setLoading] = useState(true);
  const page = parseInt(searchParams.get('page') || '1');
  const cat = searchParams.get('category');

  const loc = useLocation();

  useEffect(() => {
    const cacheName: string = 'categoryList';
    const url = `${import.meta.env.VITE_URL_BACK}/categories`;
    const fetch = async () => {
      setLoading(true);
      const data = await fetchAndCache(cacheName, url);
      setCategories(data);
      setLoading(false);
    };
    fetch();
  }, []);

  useEffect(() => {
    // setCategoriesBooks({} as CatBooks);
    const cacheName = `booksByCategory${cat}`;

    const minPrice = searchParams.get('minPrice');
    const maxPrice = searchParams.get('maxPrice');
    let pagination = `&skip=${(page - 1) * 50}&limit=50`;
    let query = `?category=${cat}`;
    // const limit = 50;
    // const skip = ((page - 1) * limit).toString();
    //persist the price filter if exists
    if (minPrice && maxPrice) {
      query += `&minPrice=${minPrice}&maxPrice=${maxPrice}`;
    }

    if (loc.search !== '') {
      query = loc.search.concat(pagination);
    }
    const url = `${import.meta.env.VITE_URL_BACK}/book/category${query}`;
    const fetch = async () => {
      const data = await fetchBooksBy(cacheName, url);
      setBooksFiltered(data);
    };
    fetch();
  }, [page, cat]);
  if (loading || !booksFiltered) return <Spinner />;
  if (!booksFiltered.books) {
    return (
      <div className="grid sm:grid-cols-3 md:grid-cols-5 text-center w-fit m-auto mt-10">
        {categories.map((c) => (
          <CategoryText key={nanoid()} category={c} />
        ))}
      </div>
    );
  } else
    return (
      <>
        <SpawnBooksSection
          books={booksFiltered.books[0]}
          count={booksFiltered.books[1]}
          text={booksFiltered.cat}
        />
      </>
    );
};

const CategoryText = ({ category }: any) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const setParam = () => {
    searchParams.set('category', `${category.name}${category.id}`);
    searchParams.set('page', '1');
    setSearchParams(searchParams);
  };

  return (
    <div className="w-full h-full border grid content-center">
      <span
        onClick={setParam}
        className="inline-block break-all text-2xl  px-4 py-2 text-amber-500 font-bold hover:cursor-pointer after:content-[''] after:w-0 after:block after:bg-amber-600 after:h-1 hover:after:w-full after:transition-all"
      >
        {category.name}
      </span>
    </div>
  );
};
