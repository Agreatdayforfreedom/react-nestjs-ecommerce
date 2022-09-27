import { ImBookmark } from 'react-icons/im';
import { Link } from 'react-router-dom';
import { Book } from '../interfaces';

interface Props {
  book: Book;
}

export const PreviewBook = ({ book }: Props) => {
  return (
    <>
      <div className="relative w-full text-center border">
        <div className="w-56 sm:w-36 m-auto">
          <div className="absolute -top-px">
            {book.isNew && (
              <>
                <ImBookmark size="30" className="text-orange-600" />
                <p className="absolute text-[10px] font-bold top-1 left-[5px]">
                  new
                </p>
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
