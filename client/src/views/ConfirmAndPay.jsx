import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
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
  const { cart, createPreference, createOrderWithPayPal, preferenceId } =
    useCart();

  // Estado para mostrar 'Cargando...' o para renderizar el botón.
  const [isLoading, setIsLoading] = useState(true);

  // Estado para saber si la preferencia fue creada.
  const [isPreferenceCreated, setIsPreferenceCreated] = useState(false);

  // Creamos una estructura URLSearchParams utilizando el useLocation.search para obtener la query de la URL. De este modo sabremos con qué pasarela de pagos vamos a trabajar.
  const useQuery = () => {
    return new URLSearchParams(useLocation().search);
  };

  const query = useQuery();
  const gateway = query.get("gateway");

  const styles = {
    color: "blue",
    label: "pay",
  };

  //TODO Setear la preferencia en el localStorage
  //TODO Colocar un botón para volver al carrito.

  // Para ejecutar una función asíncrona (createPreference()) dentro del useEffect debemos crear otra función asíncrona que la ejecute y que la espere, además, debemos ejecutarla al final del useEffect. Por eso creamos 'getPreferenceId()' para ejecutar 'createPreference()' dentro de ella y al final del useEffect ejecutamos 'getPreferenceId()'.

  // useEffect para obtener la preferencia tan pronto se monte el componente.
  useEffect(() => {
    const getPreferenceId = async () => {
      if (!isPreferenceCreated) {
        await createPreference(cart);
        setIsPreferenceCreated(true);
        setIsLoading(false);
      }
    };

    const getIdWithPayPal = async () => {
      if (!isPreferenceCreated) await createOrderWithPayPal(cart);
      setIsPreferenceCreated(true);
      setIsLoading(false);
    };

    // getPreferenceId();

    //? Dependiendo la query, trabajamos con una u otra pasarela de pagos.
    switch (gateway) {
      case "mp":
        getPreferenceId();
        break;
      case "pp":
        getIdWithPayPal();
        break;
      case "st":
        createOrderWithStripe();
        break;
      default:
        null;
    }
  }, [createPreference, createOrderWithPayPal, preferenceId]);

  return (
    <section className='w-full flex flex-col justify-center items-center'>
      <PayPalScriptProvider options={{ clientId: clientId }}>
        {gateway === "mp" ? (
          <Wallet
            initialization={{ preferenceId }}
            customization={{ texts: { valueProp: "smart_option" } }}
          />
        ) : null}
        {gateway === "pp" && preferenceId && (
          <PayPalButtons
            style={styles}
            createOrder={() => preferenceId}
            onApprove={(data, actions) => {
              actions.order.capture();
            }}
            onCancel={() => {}}
          />
        )}
      </PayPalScriptProvider>
    </section>
  );
};

export default ConfirmAndPay;
