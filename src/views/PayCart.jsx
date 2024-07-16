import { Link } from "react-router-dom";

import CartItem from "../components/CartItem";
import useCart from "../hooks/useCart";

const PayCart = () => {
  const { cart, addToCart, removeFromCart, clearCart } = useCart();

  let totalPrice = 0;

  cart.forEach((product) => {
    totalPrice += product.precio * product.quantity;
  });

  return (
    <section className='flex flex-col'>
      <Link
        className='bg-emerald-600 rounded-md py-1 px-3 w-40 text-center'
        to={"/"}
      >
        Volver al catálogo
      </Link>
      <div>
        <ul>
          {cart.map((product) => (
            <CartItem
              key={product.id}
              addToCart={() => addToCart(product)}
              removeFromCart={() => removeFromCart(product)}
              {...product}
            />
          ))}
        </ul>
        <div className="flex flex-col gap-y-2 border-2 border-black rounded-md py-4 px-6 w-96">
          <h4 className="font-semibold text-2xl text-center">Resumen</h4>
          <div className="w-full flex justify-between text-lg">
            <p>Total por productos:</p>
            <span>${totalPrice.toFixed(2)}</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PayCart;
