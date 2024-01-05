import '@testing-library/jest-dom';
import { render, screen, waitFor } from '@testing-library/react';
import { Search } from '../src/components/Search';
import { BookProvider } from '../src/context/BookProvider';
import user from '@testing-library/user-event';
import { AsideFilter } from '../src/components/AsideFilter';
import axios, { AxiosResponse } from 'axios';
import { BrowserRouter } from 'react-router-dom';
import { SearchBooksByParams } from '../src/pages/SearchBooksByParams';
import MockAdapter from 'axios-mock-adapter';
import apiAxios from '../src/utils/apiAxios';
const mockResponse = {
  books: [[], 20],
  filter: [
    {
      '1-10': '184',
      '11-25': '280',
      '26-50': '40',
      '51-100': '13',
      '101-100000': '1',
      all: '518',
    },
  ],
} as unknown as AxiosResponse;

global.scrollTo = jest.fn();

const mock = new MockAdapter(apiAxios);

mock
  .onGet('/book/category?&skip=0&limit=50')
  .replyOnce(200, {
    ...mockResponse,
  })
  .onGet('/book/category?page=1&limit=50&search=nietzsche&')
  .replyOnce(200, {
    ...mockResponse,
  });

// afterEach(() => {
//   jest.restoreAllMocks();
//   mock.restore();
//   mock.reset();
// });

jest.mock('../src/constants', () => ({
  constants: {
    url: 'http://localhost:4000',
  },
}));

describe('Seach logic', () => {
  it('should search valid book name', async () => {
    user.setup();
    render(
      <BrowserRouter>
        <BookProvider>
          <Search />
          <SearchBooksByParams />
        </BookProvider>
      </BrowserRouter>
    );

    const btnSearch = screen.getByRole('button', {
      name: 'Search',
    });
    const inputSearch = screen.getByPlaceholderText('Search for anything');
    expect(btnSearch).toBeInTheDocument();
    await user.type(inputSearch, 'nietzsche');
    expect(inputSearch).toHaveValue('nietzsche');
    await user.click(btnSearch);

    await waitFor(() => {
      const titleSearch = screen.getByTestId('title');

      expect(titleSearch).toBeInTheDocument();
    });
  });
});
