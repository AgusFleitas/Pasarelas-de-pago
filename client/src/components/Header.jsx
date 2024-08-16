import { Link } from "react-router-dom";
import { useState, useEffect } from "react";

import Cart from "./Cart";
import Menu from "./Menu";

import MoneyLogo from "/money.png";

const Header = () => {
  const [openMenu, setOpenMenu] = useState(false);

  // useEffect para desactivar el scroll cuando el menú está abierto.
  useEffect(() => {
    if (openMenu) {
      document.body.classList.add("overflow-hidden");
    } else {
      document.body.classList.remove("overflow-hidden");
    }

    return () => {
      document.body.classList.remove("overflow-hidden");
    };
  }, [openMenu]);

  return (
    <header className='bg-sky-200/60 rounded-full flex gap-x-2 mt-5 mx-4 md:max-w-[680px] lg:max-w-[850px] xl:max-w-[1200px] 2xl:max-w-[1400px] justify-end items-center py-2 px-4 mb-8 h-12 md:mx-auto shadow-md shadow-gray-400'>
      <div className='flex h-full mr-auto items-center gap-x-1'>
        <img className='h-full' src={MoneyLogo} alt='Logo de Fleitas-Shop, ' />
        <span className='font-bold text-xl'>Fleitas Shop</span>
      </div>
      <Link
        title='Ir al catálogo.'
        to={"/"}
        className='hidden bg-white rounded-full cursor-pointer md:flex justify-center items-center px-4 h-8 transition-all hover:bg-yellow-400 font-semibold'
      >
        Catálogo
      </Link>
      <Link
        title='Ir al apartado de credenciales.'
        to={"/credentials"}
        className='hidden bg-white rounded-full cursor-pointer md:flex justify-center items-center px-4 h-8 transition-all hover:bg-yellow-400 font-semibold'
      >
        Credenciales
      </Link>
      <Link
        title='Ir a la sección para consultar sobre pagos.'
        to={"/get-payment-info"}
        className='hidden bg-white rounded-full cursor-pointer md:flex justify-center items-center px-4 h-8 transition-all hover:bg-yellow-400 font-semibold'
      >
        Consultar pago
      </Link>
      <Cart />
      <button
        onClick={() => setOpenMenu(true)}
        className='bg-white rounded-full cursor-pointer md:hidden justify-center items-center px-4 h-8 transition-all hover:bg-yellow-400 font-semibold'
      >
        <svg
          xmlns='http://www.w3.org/2000/svg'
          width='24'
          height='24'
          viewBox='0 0 24 24'
          fill='none'
          stroke='currentColor'
          strokeWidth='2'
          strokeLinecap='round'
          strokeLinejoin='round'
        >
          <path stroke='none' d='M0 0h24v24H0z' fill='none' />
          <path d='M4 6l16 0' />
          <path d='M4 12l16 0' />
          <path d='M4 18l16 0' />
        </svg>
      </button>
      {openMenu && <Menu close={() => setOpenMenu(false)} />}
    </header>
  );
};

export default Header;
