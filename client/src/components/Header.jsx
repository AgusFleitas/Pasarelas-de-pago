import Cart from "./Cart";

import { Link } from 'react-router-dom'

const Header = () => {
  return (
    <header className='bg-sky-200/60 rounded-full flex gap-x-2 mt-5 max-w-[1400px] justify-end items-center py-2 px-4 mb-8 h-12 mx-auto shadow-md shadow-gray-400'>
        <Link
        title="Ver el catálogo." 
        to={'/'}
        className="bg-white rounded-full cursor-pointer flex justify-center items-center px-4 h-8 transition-all z-20 hover:bg-yellow-400 font-semibold"
        >
          Catálogo
        </Link>
        <Link
        title="Ver el apartado de credenciales." 
        to={'/credentials'}
        className="bg-white rounded-full cursor-pointer flex justify-center items-center px-4 h-8 transition-all z-20 hover:bg-yellow-400 font-semibold"
        >
          Credenciales
        </Link>
        <Cart />
    </header>
  );
};

export default Header;
