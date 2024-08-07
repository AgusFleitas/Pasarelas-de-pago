import { Link } from "react-router-dom";

import CartItem from "../components/CartItem";
import useCart from "../hooks/useCart";

import "./PayCart.css";
import { useEffect } from "react";

const PayCart = () => {

  const { cart, addToCart, removeFromCart, clearPreferenceId } = useCart();

  // useEffect para limpiar el preferenceId por si el usuario cancela y vuelve a querer pagar.
  useEffect(() => {
    clearPreferenceId();
  }, [])

  let totalPrice = 0;

  // Bucle para obtener el precio total de todo el carrito.
  cart.forEach((product) => {
    totalPrice += product.precio * product.quantity;
  });

  function openModal() {
    const modal = document.getElementById("payment-modal");
    modal.showModal();
  }

  function closeModal() {
    const modal = document.getElementById("payment-modal");
    modal.close();
  }

  return (
    <section className='flex flex-col justify-center'>
      <h1 className='font-bold text-4xl text-center mb-1'>Tu carrito</h1>
      <h2 className='text-center text-balance mb-8 max-w-[72rem] self-center'>
        Verifica los productos en tu carrito, puedes agregar unidades
        adicionales de cualquier producto o eliminarlos del carrito. Luego
        presiona 'Confirmar y pagar' y selecciona tu método de pago favorito.
      </h2>
      <div className='flex w-full justify-center gap-x-20'>
        <ul className='flex flex-col gap-y-4'>
          {cart.map((product) => (
            <CartItem
              key={product.id}
              addToCart={() => addToCart(product)}
              removeFromCart={() => removeFromCart(product)}
              {...product}
            />
          ))}
        </ul>
        <aside className='flex flex-col gap-y-2 border-2 border-black bg-white shadow-md shadow-gray-400 rounded-md py-4 px-6 w-96 h-[32rem]'>
          <h4 className='font-semibold text-2xl text-center'>Resumen</h4>
          <div className='w-full flex justify-between text-lg'>
            <p>Total por productos:</p>
            <span>${totalPrice.toFixed(2)}</span>
          </div>
          <div className='w-full flex justify-between text-lg'>
            <p>Gastos de envío:</p>
            <span>$00.00</span>
          </div>
          <div className='w-full flex justify-between text-lg'>
            <p>Costos adicionales:</p>
            <span>$00.00</span>
          </div>
          <div className='w-full mt-auto font-semibold flex justify-between text-lg'>
            <p>Total a pagar:</p>
            <span>${totalPrice.toFixed(2)}</span>
          </div>
          <button
            title='Proceder con la compra y elegir método de pago.'
            className='w-full mt-2 bg-sky-300/60 rounded-md py-2 font-semibold hover:bg-yellow-400 hover:scale-105 transition-transform'
            onClick={openModal}
          >
            Confirmar y pagar
          </button>
        </aside>
        <dialog
          id='payment-modal'
          className='relative w-[42rem] h-72 m-auto rounded-md shadow-lg shadow-black'
        >
          <div className='size-full flex flex-col px-6'>
            <strong className='text-center text-xl my-6'>
              Elige un método de pago
            </strong>
            <button
              title='Cerrar y volver.'
              id='close-modal'
              className='absolute text-xl font-black text-black top-4 right-6 hover:scale-125 hover:text-red-500 transition-transform'
              onClick={closeModal}
            >
              ✖
            </button>
            <div className='flex flex-col gap-y-2'>
              <span className='text-center'>Quiero pagar con:</span>
              <Link
                to='/confirm-and-pay?gateway=mp'
                className='text-center font-semibold py-2 rounded-md text-white bg-[#00B1EA] hover:scale-105 transition-transform'
              >
                MercadoPago
              </Link>
              <Link
                to='/confirm-and-pay?gateway=pp'
                className='text-center font-semibold py-2 rounded-md text-white bg-[#003087] hover:scale-105 transition-transform'
              >
                PayPal
              </Link>
              <Link
                to='/confirm-and-pay?gateway=st'
                className='text-center font-semibold py-2 rounded-md text-white bg-[#6772e5] hover:scale-105 transition-transform'
              >
                Stripe
              </Link>
            </div>
          </div>
        </dialog>
      </div>
    </section>
  );
};

export default PayCart;
