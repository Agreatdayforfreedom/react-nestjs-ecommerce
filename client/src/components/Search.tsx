import { useEffect } from 'react';
import { BiSearchAlt } from 'react-icons/bi';
import { useLocation } from 'react-router-dom';
import useBook from '../context/hooks/useBook';
import { useForm } from '../hooks/useForm';

export const Search = () => {
  const { search } = useBook();
  const { form, setForm, handleChange } = useForm<{ search: string }>();
  const loc = useLocation();

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
        value={form.search}
        className="px-2 pl-0 w-full focus-visible:outline-none"
        onChange={handleChange}
      />
      <button
        className="px-2 py-2 bg-orange-500 font-bold text-white hover:bg-orange-600 transition-all"
        onClick={() => {
          search(form);
          setForm({ search: '' });
        }}
      >
        Search
      </button>
    </div>
  );
};
