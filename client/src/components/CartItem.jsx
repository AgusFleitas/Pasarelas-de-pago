const CartItem = ({titulo, imagen, precio, quantity, addToCart, removeFromCart}) => {
    return (
        <li className='border-b-2 pb-4 border-b-slate-600 flex flex-col gap-y-3 justify-center items-center'>
        <img className='w-40' src={imagen} alt={titulo} />
        <footer className='flex flex-col gap-2 justify-center items-center'>
          <strong>{titulo}</strong>
          <span className='font-semibold text-emerald-700'>
            ${precio.toFixed(2)}
          </span>
          <small className='font-semibold'>Cantidad: {quantity}</small>
        </footer>
        <div className='flex gap-x-2'>
          <button
            title='Añadir otra unidad de este producto.'
            className='bg-emerald-700 py-1 px-5 rounded-md text-white font-bold text-hover:scale-105 transition-transform hover:bg-emerald-600'
            onClick={addToCart}
          >
            +
          </button>
          <button
            title='Quitar producto del carrito.'
            className='border-2 border-emerald-700 py-1 px-3 rounded-md text-emerald-700 font-bold hover:scale-105 transition-transform hover:bg-emerald-700 hover:text-white'
            onClick={removeFromCart}
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
    )
}

export default CartItem;