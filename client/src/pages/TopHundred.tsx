import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { SpawnBooksSection } from '../components/SpawnBooksSection';
import { Book } from '../interfaces';
import { configAxios } from '../utils/configAxios';

export const TopHundred = () => {
  const [topHundred, setTopHundred] = useState<Book[]>([]);

  useEffect(() => {
    const getTop = async () => {
      const { data } = await axios(
        `${import.meta.env.VITE_URL_BACK}/book/tophundred`
      );
      setTopHundred(data);
    };
    getTop();
  }, []);
  return (
    <div>
      <SpawnBooksSection books={topHundred} text="new" />
    </div>
  );
};
