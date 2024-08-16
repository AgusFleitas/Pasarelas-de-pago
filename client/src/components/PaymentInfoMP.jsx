const PaymentInfoMP = ({ paymentInfo, transformDate, handleTurnBack }) => {
  return (
    <article className='relative w-full'>
      <button
        title='Volver atrás.'
        className='absolute top-0 left-0 bg-sky-200/60 p-1 rounded-full hover:bg-sky-300'
        onClick={handleTurnBack}
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
          <path d='M5 12l14 0' />
          <path d='M5 12l6 6' />
          <path d='M5 12l6 -6' />
        </svg>
      </button>
      <h4 className='text-center font-semibold text-xl mb-10'>
        Detalles sobre tu pago:
      </h4>
      <div className='flex flex-col md:flex-row justify-between'>
        <p className='font-semibold'>ID de la operación:</p>
        <p>{paymentInfo.id}</p>
      </div>
      <div className='flex flex-col md:flex-row justify-between'>
        <p className='font-semibold'>Fecha de creación del pago:</p>
        <p>{transformDate(paymentInfo.date_created)}</p>
      </div>
      <div className='flex flex-col md:flex-row justify-between'>
        <p className='font-semibold'>Fecha de aprobación del pago:</p>
        <p>{transformDate(paymentInfo.date_approved)}</p>
      </div>
      <div className='flex flex-col md:flex-row justify-between'>
        <p className='font-semibold'>Moneda:</p>
        <p>{paymentInfo.currency_id}</p>
      </div>
      <div className='flex flex-col md:flex-row justify-between'>
        <p className='font-semibold'>Monto total de la compra:</p>
        <p>${parseInt(paymentInfo.transaction_amount).toFixed(2)}</p>
      </div>
      <div>
        <p className='font-semibold'>Productos:</p>
        <ul>
          {paymentInfo.additional_info.items.map((item) => (
            <li key={item.id}>
              <div className='flex justify-end gap-x-4'>
                <p className='w-48'>- {item.quantity} {item.title}</p>
                <p>${parseInt(item.unit_price * item.quantity).toFixed(2)}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
      <div className='flex flex-col md:flex-row justify-between'>
        <p className='font-semibold'>Correo del pagador:</p>
        <p className="truncate">{paymentInfo.payer.email}</p>
      </div>
      <div className='flex flex-col md:flex-row justify-between'>
        <p className='font-semibold'>Nombre:</p>
        {paymentInfo.payer.first_name ? (
          <p>{paymentInfo.payer.first_name}</p>
        ) : (
          <p>-</p>
        )}
      </div>
      <div className='flex flex-col md:flex-row justify-between'>
        <p className='font-semibold'>Apellido:</p>
        {paymentInfo.payer.last_name ? (
          <p>{paymentInfo.payer.last_name}</p>
        ) : (
          <p>-</p>
        )}
      </div>
    </article>
  );
};

export default PaymentInfoMP;
