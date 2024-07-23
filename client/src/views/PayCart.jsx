import { Link } from "react-router-dom";

import CartItem from "../components/CartItem";
import useCart from "../hooks/useCart";

const PayCart = () => {
  const { cart, addToCart, removeFromCart } = useCart();

  let totalPrice = 0;

  // Bucle para obtener el precio total de todo el carrito.
  cart.forEach((product) => {
    totalPrice += product.precio * product.quantity;
  });

  return (
    <section className='flex flex-col'>
      <div className='flex justify-around px-24'>
        <ul className='flex flex-col gap-y-4  '>
          {cart.map((product) => (
            <CartItem
              key={product.id}
              addToCart={() => addToCart(product)}
              removeFromCart={() => removeFromCart(product)}
              {...product}
            />
          ))}
        </ul>
        <aside className='flex flex-col gap-y-2 border-2 border-black rounded-md py-4 px-6 w-96 h-[32rem]'>
          <h4 className='font-semibold text-2xl text-center'>Resumen</h4>
          <div className='w-full flex justify-between text-lg'>
            <p>Total por productos:</p>
            <span>${totalPrice.toFixed(2)}</span>
          </div>
          {cart.length > 0 && (
            <div className='mt-auto flex flex-col gap-y-2'>
              <h4 className='font-semibold text-center'>Quiero pagar con:</h4>
              <Link
                to='/confirm-and-pay'
                className='text-center font-semibold py-2 rounded-md text-white bg-[#00B1EA] hover:scale-105 transition-transform'
              >
                MercadoPago
              </Link>
              <Link
                to='/confirm-and-pay'
                className='text-center font-semibold py-2 rounded-md text-white bg-[#003087] hover:scale-105 transition-transform'
              >
                PayPal
              </Link>
              <Link
                to='/confirm-and-pay'
                className='text-center font-semibold py-2 rounded-md text-white bg-[#6772e5] hover:scale-105 transition-transform'
              >
                Stripe
              </Link>
            </div>
          )}
        </aside>
      </div>
    </section>
  );
};

export default PayCart;
