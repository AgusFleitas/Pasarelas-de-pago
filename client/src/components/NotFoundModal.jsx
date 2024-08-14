const NotFoundModal = ({closeFunc}) => {
  return (
    <div className='fixed inset-0 flex items-center justify-center z-50'>
      <div className='absolute inset-0 bg-black opacity-50' />
      <div className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20 flex flex-col w-[44rem] h-fit items-center gap-y-4 border-[3px] border-sky-200 bg-white py-2 px-4 rounded-md '>
        <span className='text-xl font-semibold text-center'>¡Oh, vaya!</span>
        <svg
          xmlns='http://www.w3.org/2000/svg'
          width='24'
          height='24'
          viewBox='0 0 24 24'
          fill='none'
          stroke='currentColor'
          strokeWidth='1'
          strokeLinecap='round'
          strokeLinejoin='round'
          className='size-12 text-red-800'
        >
          <path stroke='none' d='M0 0h24v24H0z' fill='none' />
          <path d='M12 12m-9 0a9 9 0 1 0 18 0a9 9 0 1 0 -18 0' />
          <path d='M14.5 16.05a3.5 3.5 0 0 0 -5 0' />
          <path d='M8 9l2 2' />
          <path d='M10 9l-2 2' />
          <path d='M14 9l2 2' />
          <path d='M16 9l-2 2' />
        </svg>
        <p className='text-center text-pretty'>
          No se ha encontrado ninguna operación con ese código. Por favor,
          verifica la información e inténtalo nuevamente.
        </p>
        <button
        title="Cerrar mensaje." 
        onClick={closeFunc}
        className='bg-sky-200/60 py-2 px-4 rounded-md hover:bg-sky-300 font-semibold'
        >
          Cerrar
        </button>
      </div>
    </div>
  );
};

export default NotFoundModal;
