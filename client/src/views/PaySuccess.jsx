import { Link, useLocation } from "react-router-dom";

import success from "../img/success.webp";

const PaySuccess = () => {
  const useQuery = () => {
    return new URLSearchParams(useLocation().search);
  };

  const query = useQuery();
  const paymentID = query.get("payment_id");

  return (
    <section className='flex flex-col justify-center items-center'>
      <h1 className='text-5xl font-bold mb-8'>Pago realizado correctamente</h1>
      <div className='border-2 bg-white border-sky-300/60 rounded-md w-96 flex flex-col justify-center items-center py-4 p-8 shadow-md shadow-gray-400'>
        <strong className='text-2xlç'>¡Felicidades!</strong>
        <p>Tu pago ha sido aprobado de forma exitosa.</p>
        <img
          className='my-6'
          src={success}
          alt="Ilustración del símbolo 'correcto' que representa el pago con éxito."
        />
        {paymentID && (
          <div className="flex flex-col items-center gap-y-2 mb-8">
            <p className='text-2xl'>
              Payment ID: <strong>{paymentID}</strong>
            </p>
            <p className="text-center text-sm text-pretty">
              Este código te servirá para consultar información sobre el pago
              que acabas de realizar. Puedes copiarlo para realizar la consulta en la otra pestaña.
            </p>
          </div>
        )}
        <Link
          className='bg-sky-300/60 rounded-md py-1 px-3 w-32 text-center font-semibold hover:bg-sky-400/60 transition-colors'
          to='/'
        >
          Ir al inicio
        </Link>
      </div>
    </section>
  );
};

export default PaySuccess;
