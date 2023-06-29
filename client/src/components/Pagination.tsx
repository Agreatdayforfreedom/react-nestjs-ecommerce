import { useEffect, useState } from 'react';
import { usePagination, DOTS } from '../hooks/usePagination';
import { RiArrowLeftSFill, RiArrowRightSFill } from 'react-icons/ri';
import { Navigate, useSearchParams } from 'react-router-dom';
// import { nanoid } from 'nanoid';

interface Props {
  totalCount: number;
  limit: number;
}

const Pagination = ({ totalCount, limit }: Props) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [currentPage, setCurrentPage] = useState(
    parseInt(searchParams.get('page') || '1')
  );
  let siblingCount = 1;
  const paginationRange = usePagination({
    currentPage,
    totalCount,
    siblingCount,
    limit,
  });

  const onPageChange = (p: number) => setCurrentPage(p);

  useEffect(() => {
    if (
      currentPage === 0 ||
      currentPage === Math.ceil(totalCount / limit - 1)
    ) {
      return;
    }
    console.log({ currentPage });
    searchParams.set('page', currentPage.toString());
    searchParams.set('limit', limit.toString() || '50');
    setSearchParams(searchParams);
    window.scrollTo(0, 0);
    // refetch({
    //   limit,
    //   offset: limit * (currentPage - 1),
    // });
  }, [currentPage]);
  const onNext = () => {
    onPageChange(currentPage + 1);
  };

  const onPrevious = () => {
    onPageChange(currentPage - 1);
  };
  return (
    <ul className="flex items-center mt-2 mx-2 justify-end">
      {currentPage > 1 && (
        <li onClick={onPrevious}>
          <RiArrowLeftSFill
            size={28}
            className="cursor-pointer fill-[#7644ff] hover:fill-[#490bf3]"
          />
        </li>
      )}
      {paginationRange?.map((pageNumber, i) => {
        if (pageNumber === DOTS) {
          return <li className="font-bold text-gray-600 mx-1">&#8230;</li>;
        }

        return (
          <li
            className={`px-3 py-1 mx-px border w-8 h-8 flex items-center justify-center border-gray-400 ${
              pageNumber === currentPage &&
              'text-orange-400 bg-orange-100 font-semibold hover:!bg-orange-100 !border-orange-500'
            } hover:cursor-pointer hover:bg-gray-200  rounded-full transition-colors`}
            onClick={() => onPageChange(pageNumber as number)}
          >
            <p className="w-3">{i + 1}</p>
          </li>
        );
      })}
      {typeof paginationRange?.at(-1) === 'number' &&
        currentPage < (paginationRange.at(-1) as number) && (
          <li onClick={onNext}>
            <RiArrowRightSFill
              size={28}
              className="cursor-pointer fill-[#7644ff] hover:fill-[#490bf3]"
            />
          </li>
        )}
    </ul>
  );
};

export default Pagination;
