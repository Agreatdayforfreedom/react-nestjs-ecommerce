import '@testing-library/jest-dom';
// import { ENVIRONMENT } from '../src/constants';
import { render, screen } from '@testing-library/react';
import {
  BookContext,
  BookContextProps,
  BookProvider,
} from '../src/context/BookProvider';
import { AsideFilter } from '../src/components/AsideFilter';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import user from '@testing-library/user-event';
import { RenderWithMemory } from './utils/RenderWithMemory';
import * as TestRenderer from 'react-test-renderer';
import React from 'react';

jest.mock('../src/constants', () => ({
  constants: {
    url: 'http://localhost:4000',
  },
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

  it('should render the <FilterCard /> component with the selected filter', async () => {
    let renderer: TestRenderer.ReactTestRenderer;
    TestRenderer.act(() => {
      renderer = TestRenderer.create(
        <RenderWithMemory initialEntries={['/']} provider={true}>
          <BookContext.Provider value={{ priceFilter } as BookContextProps}>
            <Routes>
              <Route index element={<AsideFilter />} />
            </Routes>
          </BookContext.Provider>
        </RenderWithMemory>
      );
    });

    TestRenderer.act(() => {
      renderer.root.findByProps({ 'data-testid': 'li-3' }).props.onClick();
    });

    expect(
      renderer!.root.findByProps({ 'data-testid': 'fc-between' }).props
        .children[0] //first node
    ).toBe('Between');
    TestRenderer.act(() => {
      renderer.root.findByProps({ 'data-testid': 'li-6' }).props.onClick();
    });

    expect(
      renderer!.root.findByProps({ 'data-testid': 'fc-more-than' }).props
    ).toBeDefined();
  });

  //todo: test delete filter
});
