const PaymentInfoST = ({ paymentInfo, handleTurnBack }) => {
  const transformUnixDate = (unixDate) => {
    const timestamp = unixDate * 1000;

    const date = new Date(timestamp);

    const dateString = date.toLocaleString();

    return dateString;
  };

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
      <div className='flex justify-between mb-4'>
        <p className='font-semibold'>ID de la sesión:</p>
        <p className='block max-w-96 break-words text-end'>
          {paymentInfo.retrievedSession.id}
        </p>
      </div>
      <div className='flex justify-between'>
        <p className='font-semibold'>ID del pago:</p>
        <p>{paymentInfo.retrievedSession.payment_intent}</p>
      </div>
      <div className='flex justify-between'>
        <p className='font-semibold'>Fecha de creación:</p>
        <p>{transformUnixDate(paymentInfo.retrievedSession.created)}</p>
      </div>
      <div className='flex justify-between'>
        <p className='font-semibold'>Moneda:</p>
        <p>{paymentInfo.retrievedSession.currency.toUpperCase()}</p>
      </div>
      <div className='flex justify-between'>
        <p className='font-semibold'>Monto total de la compra:</p>
        <p>
          $
          {parseInt(paymentInfo.retrievedSession.amount_total / 100).toFixed(2)}
        </p>
      </div>
      <div>
        <p className='font-semibold'>Productos:</p>
        <ul>
          {paymentInfo.retrievedItems.data.map((item) => (
            <li key={item.id}>
              <div className='flex justify-end gap-x-4'>
                <p className='w-48'>- {item.quantity} {item.description}</p>
                <p>${parseInt(item.amount_total / 100 * item.quantity).toFixed(2)}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
      <div className='flex justify-between'>
        <p className='font-semibold'>Correo del pagador:</p>
        <p>{paymentInfo.retrievedSession.customer_details.email}</p>
      </div>
      <div className='flex justify-between'>
        <p className='font-semibold'>Nombre y apellido:</p>
        <p>{paymentInfo.retrievedSession.customer_details.name}</p>
      </div>
    </article>
  );
};

export default PaymentInfoST;
