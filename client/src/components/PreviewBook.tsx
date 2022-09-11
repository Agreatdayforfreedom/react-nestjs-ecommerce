import { Book } from '../interfaces';

interface Props {
  book: Book;
}

export const PreviewBook = ({ book }: Props) => {
  return (
    <>
      <div className="bg-slate-400 mx-2 p-1">
        <p>{book.name}</p>
        <p>{book.author}</p>
        <p>{book.review}</p>
      </div>
    </>
  );
};
