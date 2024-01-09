import useBook from '../context/hooks/useBook';
import { Enum_TotalPriceFilter } from '../enums';
import useQueryParams from '../hooks/useQueryParams';

export const FilterMenu = () => {
  const { toggleActions, priceFilter, hidden } = useBook();
  const [_, setParams, deleteParams] = useQueryParams();
  return (
    <div className="flex justify-end my-1 mx-3">
      <div className="mx-2 p-1 px-8 bg-slate-900 font-bold text-white">
        <button onClick={() => toggleActions('filterby')}>Filter by</button>
        <ul
          className={`${
            hidden.filterby ? 'block transition-all' : 'hidden transition-all'
          } absolute w-full z-50 bg-slate-900/95 border border-gray-600 left-0 top-full shadow-2xl text-slate-300`}
        >
          <header className="text-center text-orange-400 border border-orange-500">
            <h2 className="p-1">Filter search</h2>
          </header>
          <ul>
            <li className="text-center border-b text-orange-400 py-1">Price</li>
            <li
              className="p-2 hover:bg-slate-900/80 border-b border-slate-400 hover:cursor-pointer"
              onClick={() => {
                setParams({ skip: '0', page: '1' });
                deleteParams('minPrice');
                deleteParams('maxPrice');
                toggleActions('filterby');
              }}
            >
              <p>
                All{' '}
                <span className="text-slate-400">
                  ({priceFilter[Enum_TotalPriceFilter[Enum_TotalPriceFilter['all']]]})
                </span>
              </p>
            </li>
            <li
              className="p-2 hover:bg-slate-900/80 border-b border-slate-400 hover:cursor-pointer"
              onClick={() => {
                setParams({ skip: '0', page: '1', minPrice: '1', maxPrice: '10' });
                toggleActions('filterby');
              }}
            >
              <p>
                $1 ~ $10{' '}
                <span className="text-slate-400">
                  ({priceFilter[Enum_TotalPriceFilter[Enum_TotalPriceFilter['1-10']]]})
                </span>
              </p>
            </li>
            <li
              className="p-2 hover:bg-slate-900/80 border-b border-slate-400 hover:cursor-pointer"
              onClick={() => {
                setParams({ skip: '0', page: '1', minPrice: '11', maxPrice: '25' });
                toggleActions('filterby');
              }}
            >
              <p>
                $11 ~ $25{' '}
                <span className="text-slate-400">
                  ({priceFilter[Enum_TotalPriceFilter[Enum_TotalPriceFilter['11-25']]]})
                </span>
              </p>
            </li>
            <li
              className="p-2 hover:bg-slate-900/80 border-b border-slate-400 hover:cursor-pointer"
              onClick={() => {
                setParams({ skip: '0', page: '1', minPrice: '26', maxPrice: '50' });
                toggleActions('filterby');
              }}
            >
              <p>
                $26 ~ $50{' '}
                <span className="text-slate-400">
                  ({priceFilter[Enum_TotalPriceFilter[Enum_TotalPriceFilter['26-50']]]})
                </span>
              </p>
            </li>
            <li
              className="p-2 hover:bg-slate-900/80 border-b border-slate-400 hover:cursor-pointer"
              onClick={() => {
                setParams({ skip: '0', page: '1', minPrice: '51', maxPrice: '100' });
                toggleActions('filterby');
              }}
            >
              <p>
                $51 ~ $100{' '}
                <span className="text-slate-400">
                  ({priceFilter[Enum_TotalPriceFilter[Enum_TotalPriceFilter['51-100']]]})
                </span>
              </p>
            </li>
            <li
              className="p-2 hover:bg-slate-900/80 border-b border-slate-400 hover:cursor-pointer"
              onClick={() => {
                setParams({ skip: '0', page: '1', minPrice: '101', maxPrice: '100000' });
                toggleActions('filterby');
              }}
            >
              <p>
                more than $100{' '}
                <span className="text-slate-400">
                  ({priceFilter[Enum_TotalPriceFilter[Enum_TotalPriceFilter['101-100000']]]})
                </span>
              </p>
            </li>
          </ul>
        </ul>
      </div>
    </div>
  );
};
