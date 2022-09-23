import useBook from '../context/hooks/useBook';

export const FilterMenu = () => {
  const { search, getBooksLength, toggleActions, hidden } = useBook();
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
          <li
            className="p-2 hover:bg-slate-900/80 border-b border-slate-400 hover:cursor-pointer"
            onClick={() => {
              search({ min_price: '0', max_price: '0' });
              toggleActions('filterby');
            }}
          >
            <p>
              All{' '}
              <span className="text-slate-400">({getBooksLength('all')})</span>
            </p>
          </li>
          <li
            className="p-2 hover:bg-slate-900/80 border-b border-slate-400 hover:cursor-pointer"
            onClick={() => {
              search({ min_price: '1', max_price: '10' });
              toggleActions('filterby');
            }}
          >
            <p>
              $1 ~ $10{' '}
              <span className="text-slate-400">({getBooksLength(1, 10)})</span>
            </p>
          </li>
          <li
            className="p-2 hover:bg-slate-900/80 border-b border-slate-400 hover:cursor-pointer"
            onClick={() => {
              search({ min_price: '10', max_price: '20' });
              toggleActions('filterby');
            }}
          >
            <p>
              $10 ~ $20{' '}
              <span className="text-slate-400">({getBooksLength(10, 20)})</span>
            </p>
          </li>
          <li
            className="p-2 hover:bg-slate-900/80 border-b border-slate-400 hover:cursor-pointer"
            onClick={() => {
              search({ min_price: '20', max_price: '50' });
              toggleActions('filterby');
            }}
          >
            <p>
              $20 ~ $50{' '}
              <span className="text-slate-400">({getBooksLength(20, 50)})</span>
            </p>
          </li>
          <li
            className="p-2 hover:bg-slate-900/80 border-b border-slate-400 hover:cursor-pointer"
            onClick={() => {
              search({ min_price: '50', max_price: '100' });
              toggleActions('filterby');
            }}
          >
            <p>
              $50 ~ $100{' '}
              <span className="text-slate-400">
                ({getBooksLength(50, 100)})
              </span>
            </p>
          </li>
          <li
            className="p-2 hover:bg-slate-900/80 border-b border-slate-400 hover:cursor-pointer"
            onClick={() => {
              search({ min_price: '100', max_price: '10000' });
              toggleActions('filterby');
            }}
          >
            <p>
              more than $100{' '}
              <span className="text-slate-400">
                ({getBooksLength(100, 10000)})
              </span>
            </p>
          </li>
        </ul>
      </div>
    </div>
  );
};
