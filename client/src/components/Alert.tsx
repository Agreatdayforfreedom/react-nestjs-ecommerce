import React from 'react';
import { MdErrorOutline, MdOutlineCheckCircle } from 'react-icons/md';

import { Alert as IAlert } from '../interfaces';

interface Props {
  alert: IAlert;
}

export const Alert = ({ alert }: Props) => {
  return (
    <div
      className={`${
        alert.err
          ? 'border-red-600 text-red-500'
          : ' border-green-600 text-green-600'
      } border-l-2 flex items-center justify-around font-bold w-3/4`}
    >
      {alert.err ? (
        <MdErrorOutline size={20} />
      ) : (
        <MdOutlineCheckCircle size={20} />
      )}
      <p className="text-sm">{alert.message}</p>
    </div>
  );
};
