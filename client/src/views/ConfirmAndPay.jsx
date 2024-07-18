import { useEffect, useState } from "react";
import { initMercadoPago, Wallet } from "@mercadopago/sdk-react";

import axios from "axios";
import useCart from "../hooks/useCart";

// Se inicializa MercadoPago FUERA del componente para evitar múltiples inicializaciones por si el componente se vuelve a renderizar.
const publicKey = import.meta.env.VITE_PUBLIC_KEY_TEST;
initMercadoPago(publicKey, {
  locale: "es-MX",
});

const ConfirmAndPay = () => {
  // Traer el carrito del contexto con el Hook.
  const { cart } = useCart();

  // Estado local para almacenar el ID de la preferencia.
  const [preferenceId, setPreferenceId] = useState(null);
  
  // Estado local para almacenar un posible error al obtener el ID de la preferencia.
  const [error, setError] = useState(null);

  // Función que se va a ejecutar con el useEffect para solicitar la preferencia al servidor.
  const createPreference = async () => {
    console.log('Se ejecuta el createPreference');
    const cartItems = cart.map((product) => {
      return {
        name: product.titulo,
        quantity: product.quantity,
        price: product.precio,
        currency: "ARS",
        description: product.descripcion,
        image: product.imagen,
      };
    });

    try {
      const response = await axios.post(
        "http://localhost:3000/create-preference",
        {
          products: cartItems,
        }
      );

      const { id } = response.data;
      return id;
    } catch (error) {
      console.error(error);
      setError(
        "Hubo un problema al crear la preferencia de pago. Inténtalo de nuevo."
      );
      return null;
    }
  };

  // useEffect para obtener la preferencia tan pronto se monte el componente.
  // Para ejecutar una función asíncrona (createPreference()) dentro del useEffect debemos crear otra función asíncrona que la ejecute y que la espere, además, debemos ejecutarla al final del useEffect. Por eso creamos 'getPreferenceId()' para ejecutar 'createPreference()' dentro de ella y al final del useEffect ejecutamos 'getPreferenceId()'.
//   useEffect(() => {
//     const getPreferenceId = async () => {
//         console.log('Se ejecuta el getPreferenceId');
//       const id = await createPreference();
//       if (id) {
//         setPreferenceId(id);
//       }
//     };

//     getPreferenceId();
//   }, [cart]);

  return (
    <section>
      <Wallet
        initialization={{ preferenceId: preferenceId }}
        customization={{ texts: { valueProp: "smart_option" } }}
      />
    </section>
  );
};

export default ConfirmAndPay;
