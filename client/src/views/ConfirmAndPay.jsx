import { useEffect, useState } from "react";
import { useLocation, Link, useNavigate } from "react-router-dom";
import { initMercadoPago, Wallet } from "@mercadopago/sdk-react";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";

import useCart from "../hooks/useCart";

// Se inicializa MercadoPago FUERA del componente para evitar múltiples inicializaciones por si el componente se vuelve a renderizar.
const publicKey = import.meta.env.VITE_PUBLIC_KEY_TEST;
initMercadoPago(publicKey, {
  locale: "es-MX",
});

const clientId = import.meta.env.VITE_CLIENT_ID;

const ConfirmAndPay = () => {
  // Traer el carrito del contexto con el Hook.
  const {
    cart,
    createPreference,
    createOrderWithPayPal,
    createSessionWithStripe,
    preferenceId,
  } = useCart();

  // Estado para saber si la preferencia fue creada.
  const [isPreferenceCreated, setIsPreferenceCreated] = useState(false);

  // Creamos una estructura URLSearchParams utilizando el useLocation.search para obtener la query de la URL. De este modo sabremos con qué pasarela de pagos vamos a trabajar.
  const useQuery = () => {
    return new URLSearchParams(useLocation().search);
  };

  const navigate = useNavigate();

  const query = useQuery();
  const gateway = query.get("gateway");

  const styles = {
    color: "blue",
    label: "pay",
  };

  let totalPrice = 0;

  // Bucle para obtener el precio total de todo el carrito.
  cart.forEach((product) => {
    totalPrice += product.precio * product.quantity;
  });

  // Para ejecutar una función asíncrona dentro del useEffect debemos crear otra función asíncrona que la ejecute y que la espere, además, debemos ejecutarla al final del useEffect. Por eso creamos 'getPreferenceId()' para ejecutar 'createPreference()' dentro de ella.

  // useEffect para obtener la preferencia tan pronto se monte el componente.
  useEffect(() => {
    const getPreferenceId = async () => {
      if (!isPreferenceCreated) {
        await createPreference(cart);
        setIsPreferenceCreated(true);
      }
    };

    const getIdWithPayPal = async () => {
      if (!isPreferenceCreated) {
        await createOrderWithPayPal(cart);
        setIsPreferenceCreated(true);
      }
    };

    const getSessionWithStripe = async () => {
      if (!isPreferenceCreated) {
        await createSessionWithStripe(cart);
        setIsPreferenceCreated(true);
      }
    };

    //? Dependiendo la query, trabajamos con una u otra pasarela de pagos.
    switch (gateway) {
      case "mp":
        getPreferenceId();
        break;
      case "pp":
        getIdWithPayPal();
        break;
      case "st":
        getSessionWithStripe();
        break;
      default:
        null;
    }

    if (!gateway) {
      navigate("/");
    }
    null;
  }, [createPreference, createOrderWithPayPal, preferenceId]);

  return (
    <section className='w-full flex flex-col justify-center items-center'>
      <h1 className='font-bold text-4xl text-center mb-6'>Finaliza el pago</h1>
      <div className='md:w-96 h-48 px-6 py-4 bg-white rounded-md border-2 border-sky-200/60 flex flex-col mb-8'>
        <div className='w-full flex flex-col md:flex-row items-center md:justify-between text-lg'>
          <p>Monto final por tu compra:</p>
          <span>${totalPrice.toFixed(2)}</span>
        </div>
        <span className='mt-auto text-center text-xl font-semibold opacity-40'>
          ¡Gracias por elegirnos!
        </span>
      </div>
      <PayPalScriptProvider options={{ clientId: clientId }}>
        {!preferenceId && <p>Cargando método de pago...</p>}
        {gateway === "mp" && preferenceId && (
          <Wallet
            initialization={{ preferenceId }}
            customization={{ texts: { valueProp: "smart_option" } }}
          />
        )}
        {gateway === "pp" && preferenceId && (
          <PayPalButtons
          className="w-64 md:w-96"
            style={styles}
            createOrder={() => preferenceId}
            onApprove={(data, actions) => {
              actions.order
                .capture()
                .then(() => {
                  actions.redirect(`https://pasarelas-de-pago-agustin-fleitas.vercel.app/payment-success?payment_id=${data.orderID}`);
                })
                .catch(() => {
                  actions.redirect(`https://pasarelas-de-pago-agustin-fleitas.vercel.app/payment-failed`);
                });
            }}
            onCancel={(_, actions) => {
              actions.redirect(`https://pasarelas-de-pago-agustin-fleitas.vercel.app/payment-failed`);
            }}
          />
        )}
      </PayPalScriptProvider>
      {gateway === "st" && preferenceId && (
        <Link
          to={preferenceId}
          className='bg-[#6772e5] w-72 text-center font-semibold py-3 rounded-md text-white hover:scale-105 transition-transform hover:bg-[#8890e9'
        >
          Pagar con <span className='font-bold'>Stripe</span>
        </Link>
      )}
    </section>
  );
};

export default ConfirmAndPay;