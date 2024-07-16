import { useId } from "react";
import { Link, useLocation } from "react-router-dom";

import CartItem from "./CartItem";
import useCart from "../hooks/useCart";
import "./Cart.css";

const Cart = () => {
  const cartCheckboxId = useId();
  const location = useLocation();

  // Traemos el carrito y los métodos del Custom Hook.
  const { cart, clearCart, addToCart, removeFromCart } = useCart();

  // Creamos el 'CartItem' para renderizarlo por cada producto que tengamos en el carrito.

  return (
    <>
      <label
        title='Abrir carrito.'
        htmlFor={cartCheckboxId}
        className='cart-button items-center bg-emerald-800/60 rounded-md cursor-pointer flex h-8 justify-center py-1 px-3 absolute right-4 top-[0.35rem] transition-all z-20 hover:bg-emerald-700'
      >
        <svg
          xmlns='http://www.w3.org/2000/svg'
          width='24'
          height='24'
          viewBox='0 0 24 24'
          fill='currentColor'
          className='icon icon-tabler icons-tabler-filled icon-tabler-shopping-cart'
        >
          <path stroke='none' d='M0 0h24v24H0z' fill='none' />
          <path d='M6 2a1 1 0 0 1 .993 .883l.007 .117v1.068l13.071 .935a1 1 0 0 1 .929 1.024l-.01 .114l-1 7a1 1 0 0 1 -.877 .853l-.113 .006h-12v2h10a3 3 0 1 1 -2.995 3.176l-.005 -.176l.005 -.176c.017 -.288 .074 -.564 .166 -.824h-5.342a3 3 0 1 1 -5.824 1.176l-.005 -.176l.005 -.176a3.002 3.002 0 0 1 1.995 -2.654v-12.17h-1a1 1 0 0 1 -.993 -.883l-.007 -.117a1 1 0 0 1 .883 -.993l.117 -.007h2zm0 16a1 1 0 1 0 0 2a1 1 0 0 0 0 -2zm11 0a1 1 0 1 0 0 2a1 1 0 0 0 0 -2z' />
        </svg>
        <p className='font-semibold text-sm ml-1'>Mi carrito</p>
      </label>
      <input type='checkbox' id={cartCheckboxId} hidden />

      <aside className='cart bg-white shadow-lg shadow-black border-2 border-emerald-800 rounded-md p-8 hidden absolute right-0 top-16 w-96 h-[85vh] overflow-y-auto z-30'>
        <h3 className='font-semibold text-2xl text-center mb-8'>
          Productos en tu carrito:
        </h3>
        <ul className='flex flex-col gap-y-8'>
          {cart.length === 0 && (
            <span className='font-semibold text-black/40 text-4xl text-center text-balance mb-12'>
              ¡Oh no, tu carrito está vacío!
            </span>
          )}
          {cart.map((product) => (
            <CartItem
              key={product.id}
              addToCart={() => addToCart(product)}
              removeFromCart={() => removeFromCart(product)}
              {...product}
            />
          ))}
        </ul>
        {cart.length > 0 && (
          <button
            title='Vaciar completamente el carrito.'
            className='flex gap-x-2 border-2 font-semibold w-[10.4rem] text-emerald-700 border-emerald-700 py-2 px-3 rounded hover:bg-emerald-700 hover:text-white mt-4 mx-auto'
            onClick={() => clearCart()}
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
              className='icon icon-tabler icons-tabler-outline icon-tabler-shopping-cart-x '
            >
              <path stroke='none' d='M0 0h24v24H0z' fill='none' />
              <path d='M4 19a2 2 0 1 0 4 0a2 2 0 0 0 -4 0' />
              <path d='M13 17h-7v-14h-2' />
              <path d='M6 5l14 1l-1 7h-13' />
              <path d='M22 22l-5 -5' />
              <path d='M17 22l5 -5' />
            </svg>
            Limpiar carrito
          </button>
        )}
        {cart.length > 0 && location.pathname != '/pay-cart' && (
          <Link
            title="Ir a la sección de pago."
            to="/pay-cart"
            className='flex border-2 gap-x-1 font-semibold w-[10.4rem] text-white bg-emerald-700 border-emerald-700 py-2 px-3 rounded hover:scale-105 transition-transform hover:text-white mt-4 mx-auto justify-center cursor-pointer'
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
              className='icon icon-tabler icons-tabler-outline icon-tabler-receipt-2'
            >
              <path stroke='none' d='M0 0h24v24H0z' fill='none' />
              <path d='M5 21v-16a2 2 0 0 1 2 -2h10a2 2 0 0 1 2 2v16l-3 -2l-2 2l-2 -2l-2 2l-2 -2l-3 2' />
              <path d='M14 8h-2.5a1.5 1.5 0 0 0 0 3h1a1.5 1.5 0 0 1 0 3h-2.5m2 0v1.5m0 -9v1.5' />
            </svg>
            Pagar
          </Link>
        )}
      </aside>
    </>
  );
};

export default Cart;
