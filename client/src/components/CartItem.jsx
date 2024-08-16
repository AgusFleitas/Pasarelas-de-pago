const CartItem = ({
  titulo,
  imagen,
  precio,
  quantity,
  addToCart,
  removeFromCart,
}) => {
  return (
    <li className='bg-white md:w-[40rem] border-2 border-sky-200/60 flex flex-col md:flex-row justify-between items-center gap-y-2 gap-x-2 py-2 md:py-0 px-4 rounded-md shadow-md shadow-gray-400'>
      <img className='size-20 object-contain p-2' src={imagen} alt={titulo} />
      <div className='flex justify-between md:w-48'>
        <p>{titulo}</p>
      </div>
      <span className='font-semibold'>${precio.toFixed(2)}</span>
      <p>Unidades: {quantity}</p>
      <div className='flex gap-x-2'>
        <button
          title='Añadir otra unidad de este producto.'
          className='flex justify-center items-center bg-sky-200 py-1 px-3 rounded-md text-black font-bold hover:bg-sky-400/60 hover:text-black'
          onClick={addToCart}
        >
          +
        </button>
        <button
          title='Quitar producto del carrito.'
          className='bg-sky-200 py-1 px-2 rounded-md text-black font-bold hover:bg-sky-400/60 hover:text-black'
          onClick={removeFromCart}
        >
          <svg
            xmlns='http://www.w3.org/2000/svg'
            width='18'
            height='18'
            viewBox='0 0 24 24'
            fill='none'
            stroke='currentColor'
            strokeWidth='2'
            strokeLinecap='round'
            strokeLinejoin='round'
            className='icon icon-tabler icons-tabler-outline icon-tabler-trash'
          >
            <path stroke='none' d='M0 0h24v24H0z' fill='none' />
            <path d='M4 7l16 0' />
            <path d='M10 11l0 6' />
            <path d='M14 11l0 6' />
            <path d='M5 7l1 12a2 2 0 0 0 2 2h8a2 2 0 0 0 2 -2l1 -12' />
            <path d='M9 7v-3a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v3' />
          </svg>
        </button>
      </div>
    </li>
  );
};

export default CartItem;
