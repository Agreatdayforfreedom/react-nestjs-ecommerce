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

// this hook does not format the query correctly
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
  // return query;
  return (props?: Props) => {
    //props is the source of truth
    if (props) {
      const lenght = Object.values(props).length;
      for (const p in props) {
        //!note that the last filter still lives in the params, debug: console.log(params.get(p));
        if (query.includes(p))
          if (query.split(`${p}=${params.get(p)}`)[0] === '?') {
            // if it is the first param to remove, don't add "&" as firts character
            query = query.replace(`${p}=${params.get(p)}`, ''); //remove param without "&"
          } else {
            query = query.replace(`&${p}=${params.get(p)}`, ''); //remove param
          }

        if (props.maxPrice !== '0' || props.minPrice !== '0') {
          query += `&${p}=${(props as any)[p]}`; // add param
        }
        if (++current !== lenght) {
          query += '&';
        }
      }
      return query;
    }
  };
};
