import '@testing-library/jest-dom';
// import { ENVIRONMENT } from '../src/constants';
import { getByTestId, render, screen } from '@testing-library/react';
import {
  BookContext,
  BookContextProps,
  BookProvider,
} from '../src/context/BookProvider';
import { AsideFilter } from '../src/components/AsideFilter';
import { BrowserRouter, Route, Router } from 'react-router-dom';
import user from '@testing-library/user-event';
jest.mock('../src/constants', () => ({
  url: 'url',
}));
afterEach(() => {
  jest.clearAllMocks();
});
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useSearchParams: () => [
    new URLSearchParams({ minPrice: '0', maxPrice: '0' }),
  ],
}));

const priceFilter = {
  '1-10': '184',
  '11-25': '280',
  '26-50': '40',
  '51-100': '13',
  '101-100000': '1',
  all: '518',
};
describe('<AsideFilter /> and BookContext', () => {
  it('should render the component', () => {
    render(
      <BrowserRouter>
        <BookContext.Provider value={{ priceFilter } as BookContextProps}>
          <AsideFilter />
        </BookContext.Provider>
      </BrowserRouter>
    );
    const heading = screen.getByRole('heading', {
      name: 'Filter By',
    });
    expect(heading).toBeInTheDocument();
  });

  it('should render the length of books in each price range', () => {
    render(
      <BrowserRouter>
        <BookContext.Provider value={{ priceFilter } as BookContextProps}>
          <AsideFilter />
        </BookContext.Provider>
      </BrowserRouter>
    );
    const liElement = screen.getAllByRole('listitem');
    expect(liElement).toHaveLength(Object.keys(priceFilter).length);
  });
});
