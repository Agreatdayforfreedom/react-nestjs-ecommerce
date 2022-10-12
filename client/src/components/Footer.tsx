import { Link } from 'react-router-dom';

const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <footer className="absolute bottom-0 h-20 w-full border-t-2 border-orange-900 bg-orange-500">
      <div className="flex flex-col justify-between h-full">
        <ul className="flex justify-center">
          <li className="px-2 text-white font-bold hover:underline">
            <Link to="/">Home</Link>
          </li>
          <li className="px-2 text-white font-bold hover:underline">
            <Link to="/new">Newest</Link>
          </li>
          <li className="px-2 text-white font-bold hover:underline">
            <Link to="/bestsellers">Best sellers</Link>
          </li>
          <li className="px-2 text-white font-bold hover:underline">
            <Link to="/categories">Categories</Link>
          </li>
        </ul>

        <p className="text-white">
          Copyright &#169; 2022-{year} -{' '}
          <span className="font-bold">Library</span>
        </p>
      </div>
    </footer>
  );
};

export default Footer;
