import '@testing-library/jest-dom';
import useQueryParams, { Obj } from '../src/hooks/useQueryParams';
import * as TestRenderer from 'react-test-renderer';
import { Route } from 'react-router-dom';
import { RenderWithMemory } from './utils/RenderWithMemory';
import { useState } from 'react';
import { waitFor } from '@testing-library/react';

function RenderQueryParamsHook({
  obj = { limit: '50' },
  initialQuery = {},
}: {
  obj?: Obj;
  initialQuery?: Obj;
}) {
  const [qp, setParams, deleteParam] = useQueryParams(initialQuery);

  return (
    <div>
      <header>{qp}</header>;
      <button id="add" onClick={() => setParams(obj)}>
        addParam
      </button>
      <button id="delete" onClick={() => deleteParam('limit')}>
        DeleteParam
      </button>
    </div>
  );
}

describe('useQueryParams HOOK', () => {
  it('should return the query params', async () => {
    let renderer: TestRenderer.ReactTestRenderer;
    TestRenderer.act(() => {
      renderer = TestRenderer.create(
        <RenderWithMemory initialEntries={['/?limit=50']}>
          <Route index element={<RenderQueryParamsHook />} />
        </RenderWithMemory>
      );
    });

    expect(renderer!.root.findByType('header').props.children).toBe(
      '?limit=50'
    );
  });

  it('should set a new key-value pair', async () => {
    let renderer: TestRenderer.ReactTestRenderer;
    TestRenderer.act(() => {
      renderer = TestRenderer.create(
        <RenderWithMemory initialEntries={['/']}>
          <Route
            index
            element={
              <RenderQueryParamsHook obj={{ limit: '50', skip: '40' }} />
            }
          />
        </RenderWithMemory>
      );
    });

    TestRenderer.act(() => {
      renderer!.root.findByProps({ id: 'add' }).props.onClick();
    });
    expect(renderer!.root.findByType('header').props.children).toBe(
      '?limit=50&skip=40'
    );
  });

  it('should delete key-value pair', () => {
    let renderer: TestRenderer.ReactTestRenderer;
    TestRenderer.act(() => {
      renderer = TestRenderer.create(
        <RenderWithMemory initialEntries={['/']}>
          <Route
            index
            element={
              <RenderQueryParamsHook
                obj={{ limit: '50', skip: '40', search: 'charlesbukowski' }}
              />
            }
          />
        </RenderWithMemory>
      );
    });

    TestRenderer.act(() => {
      renderer!.root.findByProps({ id: 'add' }).props.onClick();
      renderer!.root.findByProps({ id: 'delete' }).props.onClick();
    });

    expect(renderer!.root.findByType('header').props.children).toEqual(
      '?skip=40&search=charlesbukowski'
    );
  });

  it('should have the initial state during initial render', () => {
    let renderer: TestRenderer.ReactTestRenderer;
    TestRenderer.act(() => {
      renderer = TestRenderer.create(
        <RenderWithMemory initialEntries={['/']}>
          <Route
            index
            element={
              <RenderQueryParamsHook initialQuery={{ search: 'hellooo' }} />
            }
          />
        </RenderWithMemory>
      );
    });

    expect(renderer!.root.findByType('header').props.children).toBe(
      '?search=hellooo'
    );
  });
});
