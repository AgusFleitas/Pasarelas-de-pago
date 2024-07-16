import { Link } from "react-router-dom";

import CartItem from "../components/CartItem";
import useCart from "../hooks/useCart";

const PayCart = () => {
  const { cart, addToCart, removeFromCart, clearCart } = useCart();

  return (
    <section className="flex flex-col">
      <Link
        className='bg-emerald-600 rounded-md py-1 px-3 w-40 text-center'
        to={"/"}
      >
        Volver al catálogo
      </Link>
      <ul>
        {cart.map((product) => (
          <CartItem
            key={product.id}
            addToCart={addToCart}
            removeFromCart={removeFromCart}
            {...product}
          />
        ))}
      </ul>
    </section>
  );
};

export default PayCart;
