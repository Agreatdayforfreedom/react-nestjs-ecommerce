//hook for generate query string like: ?a=1&b=2 and so on

import { FunctionComponent, useEffect, useLayoutEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';

export interface Obj {
  search?: string;
  maxPrice?: string;
  minPrice?: string;
  order?: string;
  cat?: string;
  skip?: string;
  limit?: string;
  page?: string;
}
interface Props extends Obj {}
interface Options {
  navigate: boolean;
}
// const defaultProps: Props = {
//   initialState: undefined
// }

const useQueryParams = ({ ...props }: Props = {}): [
  string,
  (obj: Obj, opt?: Partial<Options>) => void,
  (obj: keyof Obj) => void
] => {
  const [searchParams, setSearchParams] = useSearchParams(props);
  const navigate = useNavigate();
  const startsQPChar = '?';

  function setParams(obj: Obj, opt?: Partial<Options>) {
    for (let i = 0; i < Object.keys(obj).length; i++) {
      let key = Object.keys(obj)[i];
      let value = obj[Object.keys(obj)[i] as keyof Obj];
      if (key && value) {
        searchParams.set(key, value);
        setSearchParams(searchParams);
        if (opt && opt.navigate) {
          navigate(`books${startsQPChar.concat(searchParams.toString())}`);
        }
      }
    }
  }

  function deleteParam(key: keyof Obj) {
    if (key) {
      if (!searchParams.get(key)) {
        return;
      }
      searchParams.delete(key);
      setSearchParams(searchParams);
    }
  }
  return [startsQPChar.concat(searchParams.toString()), setParams, deleteParam];
};

export default useQueryParams;
