import React from 'react';

interface Props {
  bName: string;
}
export const Button = ({ bName }: Props) => {
  return (
    <button
      type="submit"
      className="px-4 py-2 mx-2 rounded bg-orange-400 font-bold text-white hover:bg-orange-500 transition-all"
    >
      {bName}
    </button>
  );
};
