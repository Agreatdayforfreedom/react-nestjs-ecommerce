import { useContext } from 'react';
import { BookContext, BookContextProps } from '../BookProvider';

const useBook = () => useContext<BookContextProps>(BookContext);

export default useBook;
