import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";

import useCart from "../hooks/useCart";
import success from "../img/success.webp";

const PaySuccess = () => {
  const { retrieveSessionWithStripe } = useCart();

  // Creo un elemento URLSearchParams para obtener la query.
  const useQuery = () => {
    return new URLSearchParams(useLocation().search);
  };

  const query = useQuery();

  // Estado para almacenar el PaymentID.
  const [paymentID, setPaymentID] = useState(null);

  useEffect(() => {
    const retrieveSession = async (sessionID) => {
      setPaymentID(await retrieveSessionWithStripe(sessionID))
    };

    if (query.get("session_id")) {
      const sessionID = query.get("session_id");

      retrieveSession(sessionID);
    } setPaymentID(query.get("payment_id"));
  }, []);

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
          <div className='flex flex-col items-center gap-y-2 mb-8'>
            <div className='flex flex-col items-center text-xl gap-y-1'>
              Payment ID: <strong className="bg-sky-200/50 py-1 px-2 rounded-md">{paymentID}</strong>
            </div>
            <p className='text-center text-sm text-pretty'>
              Este código te servirá para consultar información sobre el pago
              que acabas de realizar. Puedes copiarlo para realizar la consulta
              en la pestaña de 'Consultar pago'.
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
