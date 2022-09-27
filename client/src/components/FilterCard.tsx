import useBook from '../context/hooks/useBook';
import { TiDelete } from 'react-icons/ti';

export const FilterCard = () => {
  const { params, setParams, getBooksLength } = useBook();

  const minPrice: string | null = params.get('minPrice');
  const maxPrice: string | null = params.get('maxPrice');

  if (!minPrice || !maxPrice) {
    return <></>;
  }
  const booksLength: number = getBooksLength(
    parseInt(minPrice, 10),
    parseInt(maxPrice, 10)
  );

  const delFilter = () => {
    if (minPrice && maxPrice) {
      console.log('hello');
      params.delete('minPrice');
      params.delete('maxPrice');
      setParams(params);
    }
  };

  return (
    <div
      className={
        minPrice
          ? 'relative flex flex- border border-slate-400 px-2 justify-center w-5/6 sm:w-1/2 mx-auto my-3 md:mx-0 md:w-full text-sm'
          : 'hidden'
      }
    >
      <h2 className="absolute -top-3 left-[15%] right-[15%] mx-auto text-center text-orange-600 font-bold bg-white z-1">
        Filtered by
      </h2>
      {minPrice === '100' ? (
        <>
          <p className={`my-3 text-center text-orange-400 font-bold`}>
            More than <span className="font-normal text-slate-800">$100</span>{' '}
            <span
              className={booksLength === 0 ? 'text-red-500' : 'text-green-500'}
            >
              ({booksLength})
            </span>
          </p>
        </>
      ) : (
        <>
          <p className={`my-3 text-center text-orange-400 font-bold`}>
            Between{' '}
            <span className="font-normal text-slate-800">${minPrice}</span> and{' '}
            <span className="font-normal text-slate-800">${maxPrice}</span>{' '}
            <span
              className={booksLength === 0 ? 'text-red-500' : 'text-green-500'}
            >
              ({booksLength})
            </span>
          </p>
        </>
      )}
      <button onClick={delFilter} className="px-2 md:p-0 text-red-700">
        <TiDelete size={20} />
      </button>
    </div>
  );
};
