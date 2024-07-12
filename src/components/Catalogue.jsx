import { catalogue } from "../js/catalogue";
import CatalogueCard from "./CatalogueCard";
import useCart from "../hooks/useCart";

const Catalogue = () => {
  const { cart, addToCart, removeFromCart } = useCart();

  const checkProductInCart = (product) => {
    return cart.some((item) => item.id === product.id);
  };

  console.log(cart);

  return (
    <section className='mx-auto grid grid-cols-6 gap-x-2 gap-y-8 max-w-[1400px]'>
      {catalogue.map((product) => {
        const isProductInCar = checkProductInCart(product);

        return (
          <CatalogueCard
            key={product.id}
            id={product.id}
            titulo={product.titulo}
            imagen={product.imagen}
            descripcion={product.descripcion}
            precio={product.precio}
            isInCart={isProductInCar}
            buttonFunc={isProductInCar ? removeFromCart : addToCart}
          />
        );
      })}
    </section>
  );
};

export default Catalogue;
