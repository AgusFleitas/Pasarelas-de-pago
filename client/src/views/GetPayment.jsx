import { useState } from "react";

import useCart from "../hooks/useCart";

import mercadoPago from "../img/MercadoPago.webp";
import payPal from "../img/PayPal.webp";
import stripe from "../img/Stripe.webp";

import "./GetPayment.css";

const GetPayment = () => {
  const { getPaymentInfoWithMP } = useCart();

  const [paymentInfo, setPaymentInfo] = useState(null);

  const [form, setForm] = useState({
    paymentId: "",
    paymentMethod: null,
  });

  // Manejador PaymentID
  const handlePaymentId = (event) => {
    setForm({
      ...form,
      paymentId: event.target.value,
    });
  };

  // Manejador Método de Pago.
  const handlePaymentMethod = (event) => {
    setForm({
      ...form,
      paymentMethod: event.target.value,
    });
  };

  // Manejador Botón de confirmación.
  const handleButtonConfirm = async () => {
    switch (form.paymentMethod) {
      case "mercadopago":
        const paymentInfo = await getPaymentInfoWithMP(form.paymentId);

        const infosection = document.getElementById("check-payment");
        infosection.classList.add("payment-result");

        console.log(paymentInfo);

        setPaymentInfo(paymentInfo);
    }
  };

  const transformDate = (data) => {
    const date = new Date(data);

    // Usar Intl.DateTimeFormat para formatear la fecha
    const options = { day: "numeric", month: "long", year: "numeric" };
    const formattedDate = new Intl.DateTimeFormat("es-ES", options).format(
      date
    );

    return formattedDate;
  };

  return (
    <section className='flex flex-col items-center'>
      <h1 className='font-bold text-4xl text-center mb-1'>
        Obtener información de un pago
      </h1>
      <h2 className='text-center text-balance mb-8 max-w-[72rem] self-center'>
        Aquí podrás consultar información sobre los pagos que hayas realizado. A
        través del Payment ID (ID de la operación) podrás verificar que el pago
        ha sido concretado y leer los detalles sobre la transacción.
      </h2>

      <article
        id='check-payment'
        className='border-2 border-sky-200 rounded-md py-4 px-6 max-w-[36rem] bg-white flex flex-col gap-y-4 shadow-md shadow-gray-400'
      >
        <h4 className='text-center font-semibold text-xl'>Consultar un pago</h4>
        <p className='text-pretty'>
          Inserta el Payment ID (ID de la operación) que obtuviste al finalizar
          el pago, selecciona el método correspondiente y presiona el botón de
          'Obtener información'.
        </p>
        <label
          className='font-semibold flex flex-col gap-y-2'
          htmlFor='paymentid'
        >
          ID de la operación:
          <input
            className='border-2 border-sky-200 hover:border-sky-400 rounded-md py-1 px-3 font-normal'
            title='Inserta aquí el ID de la operación.'
            autoComplete='off'
            type='text'
            id='paymentid'
            name='paymentid'
            onChange={handlePaymentId}
          />
        </label>
        <div className='flex flex-col gap-y-4'>
          <p className='font-semibold'>Selecciona el método de pago:</p>
          <div className='flex justify-center gap-x-6'>
            <div className='flex flex-col items-center gap-y-2 '>
              <img
                title='MercadoPago'
                className='w-16 rounded-md'
                src={mercadoPago}
                alt='Logo de MercadoPago'
              />
              <input
                title='Seleccionar MercadoPago.'
                name='paymentid'
                id='mercadopago'
                type='radio'
                value='mercadopago'
                onClick={handlePaymentMethod}
              />
            </div>
            <div className='flex flex-col items-center gap-y-2 '>
              <img
                title='PayPal'
                className='w-16 rounded-md'
                src={payPal}
                alt='Logo de PayPal'
              />
              <input
                title='Seleccionar PayPal.'
                type='radio'
                name='paymentid'
                id='paypal'
                value='paypal'
                onClick={handlePaymentMethod}
              />
            </div>
            <div className='flex flex-col items-center gap-y-2 '>
              <img
                title='Stripe'
                className='w-16 rounded-md'
                src={stripe}
                alt='Logo de Stripe'
              />
              <input
                title='Seleccionar Stripe.'
                type='radio'
                name='paymentid'
                id='stripe'
                value='stripe'
                onClick={handlePaymentMethod}
              />
            </div>
          </div>
        </div>
        <button
          className='bg-sky-300/60 rounded-md py-2 font-semibold hover:bg-yellow-400 hover:scale-105 transition-transform'
          title='Confirmar y realizar la consulta.'
          onClick={handleButtonConfirm}
        >
          Obtener información
        </button>
      </article>

      {paymentInfo && (
        <article>
          <h4>Detalles sobre tu pago:</h4>
          <div>
            <p>ID de la operación:</p>
            <p>{paymentInfo.id}</p>
          </div>
          <div>
            <p>Fecha de creación del pago:</p>
            <p>{transformDate(paymentInfo.date_created)}</p>
          </div>
          <div>
            <p>Fecha de aprobación del pago:</p>
            <p>{transformDate(paymentInfo.date_approved)}</p>
          </div>
          <div>
            <p>Moneda:</p>
            <p>{paymentInfo.currency_id}</p>
          </div>
          <div>
            <p>Productos:</p>
            <ul>
              {paymentInfo.additional_info.items.map((item) => (
                <li key={item.id}>
                  <div>
                    <p>{item.title}</p>
                    <p>${parseInt(item.unit_price).toFixed(2)}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </article>
      )}
    </section>
  );
};

export default GetPayment;
