import { useEffect, useRef, useState } from 'react';
import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io';
import { Link } from 'react-router-dom';
import { Book } from '../interfaces';

interface Props {
  books: Book[];
  title: string;
}

export const Slider = ({ books, title }: Props) => {
  //multiplicate transformx count
  const [count, setCount] = useState<number>(1);
  // currents items on the screen
  const [currentItem, setCurrentItem] = useState<number>(1);
  const [transformVal, setTransformVal] = useState<number>(0);

  const dotRef = useRef<any>();
  const wRef = useRef<any>();

  //random interva between 3000 and 10000 ms
  const random = Math.floor(Math.random() * (10000 - 3000) + 3000);

  useEffect(() => {
    const interval = setInterval(() => {
      if (currentItem === books.length) {
        if (wRef.current?.offsetWidth === 355) {
          //2 on screen
          setCurrentItem(2);
        } else if (wRef.current.offsetWidth === 543) {
          //3 on screen
          setCurrentItem(3);
        } else if (wRef.current.offsetWidth === 711) {
          //4 on screen
          setCurrentItem(4);
        } else {
          //5 on screen
          setCurrentItem(5);
        }
        setCount(1);
        setTransformVal(0);
        return;
      }
      setCurrentItem((prev) => prev + 1);
      setCount((prev) => prev + 1);
      setTransformVal((-144 - 32) * count);
    }, random);

    return () => clearInterval(interval);
  }, [currentItem]);

  useEffect(() => {
    dotRef.current.style.transform = `translateX(${transformVal}px)`;
  }, [transformVal]);

  useEffect(() => {
    if (wRef.current?.offsetWidth === 355) {
      //2 on screen
      setCurrentItem(2);
      setCount(1);
      dotRef.current.style.transform = `translateX(${0}px)`;
    } else if (wRef.current.offsetWidth === 543) {
      //move to start avoid blacks
      //3 on screen
      setCurrentItem(3);
      setCount(1);
      dotRef.current.style.transform = `translateX(${0}px)`;
    } else if (wRef.current.offsetWidth === 711) {
      //4 on screen
      setCurrentItem(4);
      console.log(currentItem, 'item');
      setCount(1);
      dotRef.current.style.transform = `translateX(${0}px)`;
    } else {
      //5 on screen
      setCurrentItem(5);
      setCount(1);
      dotRef.current.style.transform = `translateX(${0}px)`;
    }
  }, [wRef.current && wRef.current.offsetWidth]);

  const handleMouseProx = () => {
    if (currentItem === books.length) {
      return;
    }
    setTransformVal((-144 - 32) * count);
    setCurrentItem(currentItem + 1);
    setCount(count + 1);
  };

  const handleMousePrev = () => {
    if (transformVal === 0) {
      return;
    }
    setTransformVal(transformVal + (144 + 32));
    setCurrentItem(currentItem - 1);
    setCount(count - 1);
  };
  return (
    <div className="text-center my-5 w-full overflow  ">
      <h1 className="text-2xl font-bold text-orange-400">{title}</h1>
      <div className="relative mx-auto w-[355px] ws:w-[543px] md:w-[711px] lg:w-[888px]">
        <div
          className="mx-auto w-[355px] ws:w-[543px] md:w-[711px] lg:w-[888px] overflow-x-hidden"
          ref={wRef}
        >
          <div className="flex  transition-all" ref={dotRef}>
            {books.map((b) => (
              <SliderCard b={b} />
            ))}
          </div>
        </div>
        <button
          onClick={handleMousePrev}
          className="hidden sm:block absolute top-0 bottom-0 z-50 -left-8 text-slate-400 hover:-translate-x-2 transition-transform"
        >
          <IoIosArrowBack size={45} />
        </button>
        <button
          onClick={handleMouseProx}
          className="hidden sm:block absolute top-0 bottom-0 -right-8 text-slate-400 hover:translate-x-2 transition-transform"
        >
          <IoIosArrowForward size={45} />
        </button>
      </div>
    </div>
  );
};

const SliderCard = ({ b }: { b: Book }) => {
  return (
    <div
      className={`group h-48 w-36 min-w-[9rem] m-4 cursor-pointer hover:shadow-lg transition-shadow`}
    >
      <Link to={`/book/${b.id}`}>
        <img src={b.image} alt={b.name} className="h-full w-full"></img>
      </Link>
    </div>
  );
};
