import React, { createContext, ReactNode } from 'react';

export interface BookContextProps {}

interface Props {
  children: ReactNode;
}

export const BookContext = createContext<BookContextProps>(
  {} as BookContextProps
);

export const BookProvider = ({ children }: Props) => {
  return <BookContext.Provider value={{}}>{children}</BookContext.Provider>;
};
