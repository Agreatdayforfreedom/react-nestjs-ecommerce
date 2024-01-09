import { IoMdArrowDropright } from 'react-icons/io';
import useBook from '../context/hooks/useBook';
import { FilterCard } from './FilterCard';
import { Enum_TotalPriceFilter } from '../enums';
import useQueryParams from '../hooks/useQueryParams';
import { Spinner } from './Spinner';

export const AsideFilter = () => {
  const { priceFilter } = useBook();
  const [_, setParams, deleteParams] = useQueryParams();

  if (priceFilter.length === 0) return <Spinner />;
  return (
    <div className="hidden md:block md:w-1/4 lg:w-1/5 lg mx-2">
      <FilterCard />
      <aside className="relative border w-full h-96 border-slate-400 mt-4">
        <h2 className="absolute w-3/4 -top-4 left-5 text-orange-600 text-center text-xl bg-white ">
          Filter By
        </h2>

        <h3 className="mt-3 bg-orange-100 text-center font-bold">Price</h3>
        <ul className="px-2">
          <li
            className="flex items-center text-sm text-slate-500 hover:text-slate-900 hover:cursor-pointer"
            onClick={() => {
              setParams({ skip: '0', page: '1' });
              deleteParams('minPrice');
              deleteParams('maxPrice');
            }}
            data-testid="li-1"
          >
            <IoMdArrowDropright size="17" />
            <p>
              All <span>({priceFilter[Enum_TotalPriceFilter[Enum_TotalPriceFilter['all']]]})</span>
            </p>
          </li>
          <li
            className="flex items-center text-sm text-slate-500 hover:text-slate-900 hover:cursor-pointer"
            onClick={() => {
              setParams({ skip: '0', page: '1', minPrice: '1', maxPrice: '10' });
            }}
          >
            <IoMdArrowDropright size="17" />
            <p>
              $1 ~ $10{' '}
              <span>({priceFilter[Enum_TotalPriceFilter[Enum_TotalPriceFilter['1-10']]]})</span>
            </p>
          </li>
          <li
            className="flex items-center text-sm text-slate-500 hover:text-slate-900 hover:cursor-pointer"
            onClick={() => {
              setParams({ skip: '0', page: '1', minPrice: '11', maxPrice: '25' });
            }}
            data-testid="li-3"
          >
            <IoMdArrowDropright size="17" />
            <p>
              $11 ~ $25{' '}
              <span>({priceFilter[Enum_TotalPriceFilter[Enum_TotalPriceFilter['11-25']]]})</span>
            </p>
          </li>
          <li
            className="flex items-center text-sm text-slate-500 hover:text-slate-900 hover:cursor-pointer"
            onClick={() => {
              setParams({ skip: '0', page: '1', minPrice: '26', maxPrice: '50' });
            }}
          >
            <IoMdArrowDropright size="17" />
            <p>
              $26 ~ $50{' '}
              <span>({priceFilter[Enum_TotalPriceFilter[Enum_TotalPriceFilter['26-50']]]})</span>
            </p>
          </li>
          <li
            className="flex items-center text-sm text-slate-500 hover:text-slate-900 hover:cursor-pointer"
            onClick={() => {
              setParams({ skip: '0', page: '1', minPrice: '51', maxPrice: '100' });
            }}
          >
            <IoMdArrowDropright size="17" />
            <p>
              $51 ~ $100{' '}
              <span>({priceFilter[Enum_TotalPriceFilter[Enum_TotalPriceFilter['51-100']]]})</span>
            </p>
          </li>
          <li
            className="flex items-center text-sm text-slate-500 hover:text-slate-900 hover:cursor-pointer"
            data-testid="li-6"
            onClick={() => {
              setParams({ skip: '0', page: '1', minPrice: '101', maxPrice: '100000' });
            }}
          >
            <IoMdArrowDropright size="17" />
            <p>
              more than $100{' '}
              <span>
                ({priceFilter[Enum_TotalPriceFilter[Enum_TotalPriceFilter['101-100000']]]})
              </span>
            </p>
          </li>
        </ul>
      </aside>
    </div>
  );
};
