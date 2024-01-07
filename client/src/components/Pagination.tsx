import { useEffect, useState } from 'react';
import { usePagination, DOTS } from '../hooks/usePagination';
import { RiArrowLeftSFill, RiArrowRightSFill } from 'react-icons/ri';
import { Navigate, useSearchParams } from 'react-router-dom';
import useQueryParams from '../hooks/useQueryParams';
// import { nanoid } from 'nanoid';

interface Props {
  totalCount: number;
  limit: number;
  currentPage: number;
  setCurrentPage: (state: number) => void;
}

const Pagination = ({
  totalCount,
  limit,
  currentPage,
  setCurrentPage,
}: Props) => {
  const [searchParams, setSearchParams] = useSearchParams();

  // const [currentPage, setCurrentPage] = useState<number>(
  //   parseInt(searchParams.get('page') || '1')
  // );
  const [_, setParams, __] = useQueryParams();

  let siblingCount = 1;
  const paginationRange = usePagination({
    currentPage,
    totalCount,
    siblingCount,
    limit,
  });

  const onPageChange = (p: number) => setCurrentPage(p);

  useEffect(() => {
    if (currentPage === 0) {
      return;
    }
    setParams({
      page: currentPage.toString(),
      skip: ((currentPage - 1) * 50).toString(),
      limit: limit.toString(),
    });
    // searchParams.set('page', currentPage.toString()); //todo repair pagination
    // searchParams.set('limit', limit.toString() || '50');
    // setSearchParams(searchParams);
    window.scrollTo(0, 0);
  }, [currentPage]);
  const onNext = () => {
    onPageChange(currentPage + 1);
  };

  const onPrevious = () => {
    onPageChange(currentPage - 1);
  };

  return (
    <ul className="flex items-center mt-2 mx-2 justify-center">
      {currentPage > 1 && (
        <li onClick={onPrevious}>
          <RiArrowLeftSFill
            size={48}
            className="cursor-pointer fill-[#9c9c9c] hover:fill-[#ef9714]"
          />
        </li>
      )}
      {paginationRange?.map((pageNumber, i) => {
        if (pageNumber === DOTS) {
          return (
            <li key={i} className="font-bold text-gray-600 mx-1">
              &#8230;
            </li>
          );
        }

        return (
          <li
            key={i}
            className={`px-3 py-1 mx-px text-gray-600 border w-8 h-8 flex items-center justify-center border-gray-400 ${
              pageNumber === currentPage &&
              'text-orange-400 bg-orange-100 font-semibold hover:!bg-orange-100 !border-orange-500'
            } hover:cursor-pointer hover:bg-gray-200  rounded-full transition-colors`}
            onClick={() => onPageChange(pageNumber as number)}
          >
            {pageNumber}
          </li>
        );
      })}
      {typeof paginationRange?.at(-1) === 'number' &&
        currentPage < (paginationRange.at(-1) as number) && (
          <li onClick={onNext}>
            <RiArrowRightSFill
              size={48}
              className="cursor-pointer fill-[#9c9c9c] hover:fill-[#ef9714]"
            />
          </li>
        )}
    </ul>
  );
};

export default Pagination;
