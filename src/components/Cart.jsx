import { useId } from "react";
import useCart from "../hooks/useCart";

import './Cart.css'

const Cart = () => {
  const cartCheckboxId = useId();

  // Traemos el carrito y los métodos del Custom Hook.
  const { cart, clearCart, addToCart, removeFromCart } = useCart();

  // Creamos el 'CartItem' para renderizarlo por cada producto que tengamos en el carrito.
  function CartItem({ titulo, imagen, precio, quantity, addToCart, removeFromCart }) {
    return (
      <li className='border-b-2 pb-4 border-b-slate-600 flex flex-col gap-y-3 justify-center items-center'>
        <img className='w-40' src={imagen} alt={titulo} />
        <div></div>
        <footer className='flex flex-col gap-2 justify-center items-center'>
          <strong>{titulo}</strong>
          <span className='font-semibold text-emerald-700'>
            ${precio.toFixed(2)}
          </span>
          <small className='font-semibold'>Cantidad: {quantity}</small>
        </footer>
        <div className='flex gap-x-2'>
          <button
            title='Añadir otra unidad de este producto.'
            className='bg-emerald-700 py-1 px-5 rounded-md text-white font-bold text-hover:scale-105 transition-transform hover:bg-emerald-600'
            onClick={addToCart}
          >
            +
          </button>
          <button
            title='Quitar producto del carrito.'
            className='border-2 border-emerald-700 py-1 px-3 rounded-md text-emerald-700 font-bold hover:scale-105 transition-transform hover:bg-emerald-700 hover:text-white'
            onClick={removeFromCart}
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
              className='icon icon-tabler icons-tabler-outline icon-tabler-trash'
            >
              <path stroke='none' d='M0 0h24v24H0z' fill='none' />
              <path d='M4 7l16 0' />
              <path d='M10 11l0 6' />
              <path d='M14 11l0 6' />
              <path d='M5 7l1 12a2 2 0 0 0 2 2h8a2 2 0 0 0 2 -2l1 -12' />
              <path d='M9 7v-3a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v3' />
            </svg>
          </button>
        </div>
      </li>
    );
  }

  return (
    <>
      <label
      title="Abrir carrito."
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
        <p className="font-semibold text-sm ml-1">Mi carrito</p>
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
              addToCart={() =>  addToCart(product)}
              removeFromCart={() => removeFromCart(product)}
              {...product}
            />
          ))}
        </ul>
        {cart.length > 0 && (
          <button
          title="Vaciar completamente el carrito."
            className='flex gap-x-2 bg-emerald-800/60 py-2 px-3 rounded hover:bg-emerald-700 hover:text-white mt-4 mx-auto'
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
      </aside>
    </>
  );
};

export default Cart;
