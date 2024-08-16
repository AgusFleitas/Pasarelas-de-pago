import { Link } from "react-router-dom";

const Menu = ({ close }) => {
  return (
    <aside id='menu' className='inset-0 z-20'>
      <div onClick={close} className='absolute inset-0 bg-black opacity-50' />
      <aside className='bg-sky-200 absolute top-0 right-0 w-64 h-screen px-4 py-8'>
        <button
          onClick={close}
          className='absolute top-1 right-3 text-xl font-bold hover:text-red-700'
        >
          ✖
        </button>
        <h2 className='text-center font-semibold text-xl mb-8'>Navegación</h2>
        <ul className='flex flex-col items-center gap-y-6'>
          <Link
            onClick={close}
            to={"/"}
            className='font-semibold bg-white rounded-md py-1 px-4 w-full text-center shadow-md shadow-gray-400'
          >
            Catálogo
          </Link>
          <Link
            onClick={close}
            to={"/credentials"}
            className='font-semibold bg-white rounded-md py-1 px-4 w-full text-center shadow-md shadow-gray-400'
          >
            Credenciales
          </Link>
          <Link
            onClick={close}
            to={"/get-payment-info"}
            className='font-semibold bg-white rounded-md py-1 px-4 w-full text-center shadow-md shadow-gray-400'
          >
            Consultar pago
          </Link>
        </ul>
      </aside>
    </aside>
  );
};

export default Menu;
