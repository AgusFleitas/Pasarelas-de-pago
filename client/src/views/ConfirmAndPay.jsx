import { useEffect, useState } from "react";
import { initMercadoPago, Wallet } from "@mercadopago/sdk-react";

import useCart from "../hooks/useCart";

// Se inicializa MercadoPago FUERA del componente para evitar múltiples inicializaciones por si el componente se vuelve a renderizar.
const publicKey = import.meta.env.VITE_PUBLIC_KEY_TEST;
initMercadoPago(publicKey, {
  locale: "es-MX",
});

const ConfirmAndPay = () => {
  // Traer el carrito del contexto con el Hook.
  const { cart, createPreference, preferenceId } = useCart();

  // Estado para mostrar 'Cargando...' o para renderizar el botón.
  const [isLoading, setIsLoading] = useState(true);

  // Estado para saber si la preferencia fue creada.
  const [isPreferenceCreated, setIsPreferenceCreated] = useState(false)

  //TODO Setear la preferencia en el localStorage
  //TODO Ocultar el botón del carrito en este componente para evitar modificaciones en el carrito.

  // Para ejecutar una función asíncrona (createPreference()) dentro del useEffect debemos crear otra función asíncrona que la ejecute y que la espere, además, debemos ejecutarla al final del useEffect. Por eso creamos 'getPreferenceId()' para ejecutar 'createPreference()' dentro de ella y al final del useEffect ejecutamos 'getPreferenceId()'.

  // useEffect para obtener la preferencia tan pronto se monte el componente.
  useEffect(() => {
    const getPreferenceId = async () => {
      if(!isPreferenceCreated) {
        await createPreference(cart);
        setIsPreferenceCreated(true)
        setIsLoading(false);
      }
    };

    getPreferenceId();
  }, [createPreference]);

  return (
    <section>
      {isLoading ? (
        <p>Cargando...</p>
      ) : (
        <Wallet
          initialization={{ preferenceId }}
          customization={{ texts: { valueProp: "smart_option" } }}
        />
      )}
    </section>
  );
};

export default ConfirmAndPay;
