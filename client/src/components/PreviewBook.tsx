import { ImBookmark } from 'react-icons/im';
import { IoMdRibbon } from 'react-icons/io';
import { Link } from 'react-router-dom';
import { Book } from '../interfaces';

interface Props {
  book: Book;
  best?: boolean;
  i?: number;
}

export const PreviewBook = ({ book, best, i }: Props) => {
  return (
    <>
      <div className="relative w-full text-center border">
        <div className="w-56 sm:w-36 m-auto">
          <div className="absolute h-12 -top-px right-0">
            {book.isNew && !best && (
              <div>
                <ImBookmark size="30" className="text-orange-600" />
                <p className="absolute text-[10px] font-bold top-1 left-[5px]">
                  new
                </p>
              </div>
            )}
            {best && (
              <>
                <ImBookmark size={50} className="text-blue-500" />
                <div className="text-white absolute top-0.5 left-0 right-0 font-bold">
                  <div className="flex flex-col">
                    <span className="text-xs leading-none">Top</span>
                    {i}
                  </div>
                </div>
              </>
            )}
          </div>
          <Link to={`/book/${book.id}`}>
            <img
              src={book.image}
              alt={book.name}
              className="w-56 h-80 sm:w-36 sm:h-56 m-auto hover:shadow-xl hover:shadow-slate-300 transition-all"
            />
            <p className="text-orange-600 text-xl font-light hover:underline">
              {book.name}
            </p>
          </Link>
        </div>

        <p>{book.author}</p>
        <p className="font-bold text-green-600">${book.price} usd</p>
        <button></button>
      </div>
    </>
  );
};
