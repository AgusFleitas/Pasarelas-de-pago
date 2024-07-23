import { Link, useLocation } from "react-router-dom";

import CartItem from "./CartItem";
import useCart from "../hooks/useCart";
import "./Cart.css";

const Cart = () => {
  const location = useLocation();

  // Traemos el carrito y los métodos del Custom Hook.
  const { cart, clearCart, addToCart, removeFromCart } = useCart();

  return (
    <>
      {location.pathname != "/confirm-and-pay" && (
        <Link
          title='Ir al carrito.'
          to={"/pay-cart"}
          className='cart-button relative items-center bg-emerald-800/60 rounded-md cursor-pointer flex h-8 justify-center py-1 px-3 transition-all z-20 hover:bg-emerald-700'
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

          <span className='cart-quantity'>{cart.length}</span>
        </Link>
      )}
    </>
  );
};

export default Cart;
