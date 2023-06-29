//hook for generate query string like: ?a=1&b=2 and so on

import React, { useState } from 'react';
import { useSearchParams } from 'react-router-dom';

interface Props {
  //todo: complete
  search?: string;
  maxPrice?: string;
  minPrice?: string;
  order?: string;
  cat?: string;
  skip?: string;
  limit?: string;
}

export const useSearchQuery = () => {
  const [params, setParams] = useSearchParams();
  let lenght: number = 0;
  let current: number = 0;
  let query: string = '?'; // it starts with ?

  for (const _ of params.entries()) {
    lenght++;
  }
  params.forEach((value: string, key: string) => {
    query += `${key}=${value}`;
    if (++current !== lenght) {
      query += '&';
    }
  });
  return (props?: Props) => {
    if (props) {
      const lenght = Object.values(props).length;
      for (const p in props) {
        query += `${p}=${(props as any)[p]}`;
        if (query.includes(p)) continue;
        if (++current !== lenght) {
          query += '&';
        }
      }
    }

    return query;
  };
};
