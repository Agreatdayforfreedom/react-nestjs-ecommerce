import { useEffect } from 'react';
import { BiSearchAlt } from 'react-icons/bi';
import { useLocation, useNavigate } from 'react-router-dom';
import useBook from '../context/hooks/useBook';
import { useForm } from '../hooks/useForm';
import useQueryParams from '../hooks/useQueryParams';

export const Search = () => {
  const { search } = useBook();
  const { form, handleChange } = useForm<{ search: string }>();
  const [_, setParams, __] = useQueryParams();

  //TODO: TRIGGER ONCLICK WITH ENTER
  return (
    <div className="flex items-center border border-black mx-2 my-3">
      <label className="flex justify-center w-8" htmlFor="searc">
        <BiSearchAlt size="25" />
      </label>
      <input
        type="text"
        placeholder="Search for anything"
        id="search"
        name="search"
        value={form.search ? form.search : ''}
        className="px-2 pl-0 w-full focus-visible:outline-none"
        onChange={handleChange}
      />
      <button
        className="px-2 py-2 bg-orange-500 font-bold text-white hover:bg-orange-600 transition-all"
        onClick={() => {
          if (form.search) {
            setParams(
              {
                ...form,
                skip: `${(1 - 1) * 50}`,
                limit: '50',
                page: '1',
              },
              { navigate: true }
            );
          }
        }}
      >
        Search
      </button>
    </div>
  );
};
