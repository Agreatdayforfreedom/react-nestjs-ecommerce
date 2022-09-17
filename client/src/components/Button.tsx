import React from 'react';

interface Props {
  bName: string;
}
export const Button = ({ bName }: Props) => {
  return (
    <button
      type="submit"
      className="border px-4 py-3 bg-orange-400 
rounded-md font-bold text-white hover:bg-orange-500 transition-all"
    >
      {bName}
    </button>
  );
};
