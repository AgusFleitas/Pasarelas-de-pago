import { catalogue } from "../js/catalogue";
import CatalogueCard from "./CatalogueCard";
import useCart from "../hooks/useCart";

const Catalogue = () => {
  const { cart, addToCart, removeFromCart } = useCart();

  const checkProductInCart = (product) => {
    return cart.some((item) => item.id === product.id);
  };

  return (
    <section className='mx-auto grid
    md:grid-cols-2 xl:grid-cols-4 2xl:grid-cols-6 
    gap-x-4 lg:gap-x-2 gap-y-4 lg:gap-y-8 pb-4
    md:max-w-[680px] lg:max-w-[850px] xl:max-w-[1200px] 2xl:max-w-[1400px]'>
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
