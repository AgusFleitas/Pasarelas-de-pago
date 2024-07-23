import Cart from "./Cart";

import { Link } from 'react-router-dom'

const Header = () => {
  return (
    <header className='border-2 border-emerald-600 rounded-md flex gap-x-2 mt-8 max-w-[1400px] justify-end items-center py-2 px-2 mb-8 h-12 mx-auto'>
        <Link 
        to={'/'}
        className="bg-emerald-800/60 rounded-md cursor-pointer flex h-8 justify-center py-1 px-3 transition-all z-20 hover:bg-emerald-700 font-semibold"
        >
          Ir al catálogo
        </Link>
        <Cart />
    </header>
  );
};

export default Header;
