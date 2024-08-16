const Credentials = () => {
  return (
    <section className='flex flex-col justify-center'>
      <h1 className='font-bold text-4xl text-center mb-2'>
        Credenciales de prueba
      </h1>
      <h2 className='text-center text-balance mb-8 max-w-[72rem] self-center'>
        En este apartado podrás ver los datos para iniciar sesión y completar un
        pago ya sea a través de MercadoPago, PayPal o Stripe. De esta forma
        podrás probar el funcionamiento de la aplicación.
      </h2>
      <div className='flex flex-col md:grid grid-cols-2 grid-rows-2 mx-auto gap-x-6 gap-y-4 auto-rows-[24rem]'>
        <article className='md:w-80 row-span-2 bg-white border-2 border-[#00B1EA] flex flex-col items-center justify-around py-2 px-4 rounded-md shadow-md shadow-gray-400'>
          <h3 className='text-center font-semibold text-xl '>MercadoPago</h3>
          <div className='w-full'>
            <div className='w-full flex flex-col gap-y-1 justify-between mb-1'>
              <strong>Usuario:</strong>
              <p>TESTUSER1269503424</p>
            </div>
            <div className='w-full flex flex-col gap-y-1 justify-between'>
              <strong>Contraseña:</strong>
              <p>zGJqNgGXjJ</p>
            </div>
          </div>
          <div className='w-full'>
            <span className='block text-center font-semibold'>Aclaración</span>
            <p>
              Puede que al momento de finalizar el pago, se solicite un código
              enviado a través de correo electrónico. En ese caso utiliza los
              siguiente números:
            </p>
          </div>
          <p className='text-xl text-center font-semibold'>078071</p>
        </article>
        <article className=' bg-white border-2 border-[#003087] flex flex-col items-center justify-around p-3 md:p-4 rounded-md shadow-md shadow-gray-400'>
          <h3 className='text-center font-semibold text-xl'>PayPal</h3>
          <div className='w-full'>
            <div className='w-full flex flex-col gap-y-1 justify-between'>
              <strong>Correo:</strong>
              <p>sb-szavk32050@personal.example.com</p>
            </div>
            <div className='w-full flex flex-col gap-y-1 justify-between'>
              <strong>Contraseña:</strong>
              <p>4'tlA(?%</p>
            </div>
          </div>
        </article>
        <article className='col-start-2 border-2 border-[#6772e5] bg-white flex flex-col justify-around p-4 rounded-md shadow-md shadow-gray-400'>
          <h3 className='text-center font-semibold text-xl '>Stripe</h3>
          <div className='w-full'>
            <div className='w-full flex flex-col gap-y-1 justify-between'>
              <strong>Número de tarjeta:</strong>
              <p>4242 4242 4242 4242</p>
            </div>
            <div className='flex'>
              <div className='w-full flex flex-col gap-y-1 justify-between'>
                <strong>Vencimiento:</strong>
                <p>12/28</p>
              </div>
              <div className='w-full flex flex-col gap-y-1 items-center'>
                <strong>CVV:</strong>
                <p>123</p>
              </div>
            </div>
          </div>
        </article>
      </div>
        <span className="self-center font-semibold bg-yellow-400/40 text-center text-balance rounded-md py-1 px-2 my-8 xl:mt-24">Estos datos son para realizar pruebas, no pertenecen a ninguna persona y no son admitidos en transacciones reales. Por favor, no intentes realizar ningún pago con estos datos.</span>
    </section>
  );
};

export default Credentials;
