import { MdOutlineArrowBackIos } from 'react-icons/md';
import { Link } from 'react-router-dom';

interface Props {
  to: string;
}

export const ArrowReturn = ({ to }: Props) => {
  return (
    <div className="absolute left-4 top-4 hover:left-3.5 transition-all">
      <Link to={to}>
        <MdOutlineArrowBackIos
          size={20}
          className="text-slate-700 hover:cursor-pointer"
        />
      </Link>
    </div>
  );
};
