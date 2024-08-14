const PaymentInfoPP = ({ paymentInfo, transformDate, handleTurnBack }) => {
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
        <div className='flex justify-between'>
          <p className='font-semibold'>ID de la operación:</p>
          <p>{paymentInfo.id}</p>
        </div>
        <div className='flex justify-between'>
          <p className='font-semibold'>Última actualización del pago:</p>
          <p>{transformDate(paymentInfo.update_time)}</p>
        </div>
        <div className='flex justify-between'>
          <p className='font-semibold'>Moneda:</p>
          <p>{paymentInfo.purchase_units[0].amount.currency_code}</p>
        </div>
        <div className='flex justify-between'>
          <p className='font-semibold'>Monto total de la compra:</p>
          <p>${parseInt(paymentInfo.purchase_units[0].amount.value).toFixed(2)}</p>
        </div>
        <div>
          <p className='font-semibold'>Productos:</p>
          <ul>
            {paymentInfo.purchase_units[0].items.map((item) => (
              <li key={item.name}>
                <div className='flex justify-end gap-x-4'>
                  <p className='w-48'>- {item.name}</p>
                  <p>${parseInt(item.unit_amount.value).toFixed(2)}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
        <div className='flex justify-between'>
          <p className='font-semibold'>Correo del pagador:</p>
          <p>{paymentInfo.payer.email_address}</p>
        </div>
        <div className='flex justify-between'>
          <p className='font-semibold'>Nombre y apellido:</p>
          <p>{Object.values(paymentInfo.payer.name).join(' ')}</p>
        </div>
      </article>
    );
  };
  
  export default PaymentInfoPP;
  