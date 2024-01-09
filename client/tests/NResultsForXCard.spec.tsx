import { Route } from 'react-router-dom';
import { RenderWithMemory } from './utils/RenderWithMemory';
import * as TestRenderer from 'react-test-renderer';
import NResultsForXCard from '../src/components/NResultsForXCard';

describe('<NResultsForXCard />', () => {
  it('renders n-Resultfor-x card where x = params.search', () => {
    let renderer = {} as TestRenderer.ReactTestRenderer;
    TestRenderer.act(() => {
      renderer = TestRenderer.create(
        <RenderWithMemory initialEntries={['/?search=rustlang']}>
          <Route index element={<NResultsForXCard booksLength={243} />} />
        </RenderWithMemory>
      );
    });

    let tree = renderer.toJSON() as TestRenderer.ReactTestRendererJSON;
    expect(tree).toMatchInlineSnapshot(`
      <div
        className="bg-orange-200 border-y my-2 border-yellow-900 text-center p-2"
      >
        <h2
          className="text-black font-bold"
          data-testid="title"
        >
          <span
            className="text-orange-600"
          >
            243
          </span>
           Results for
           
          <span
            className="text-orange-600"
          >
            rustlang
          </span>
        </h2>
      </div>
    `);
  });

  it('renders n-Resultfor-x card where x = params.category', () => {
    let renderer = {} as TestRenderer.ReactTestRenderer;
    TestRenderer.act(() => {
      renderer = TestRenderer.create(
        <RenderWithMemory initialEntries={['/?category=rustlang']}>
          <Route index element={<NResultsForXCard booksLength={243} />} />
        </RenderWithMemory>
      );
    });

    let tree = renderer.toJSON() as TestRenderer.ReactTestRendererJSON;
    expect(tree).toMatchInlineSnapshot(`
      <div
        className="bg-orange-200 border-y my-2 border-yellow-900 text-center p-2"
      >
        <h2
          className="text-black font-bold"
          data-testid="title"
        >
          <span
            className="text-orange-600"
          >
            243
          </span>
           Results for
           
          <span
            className="text-orange-600"
          >
            rustlang
          </span>
        </h2>
      </div>
    `);
  });
});
