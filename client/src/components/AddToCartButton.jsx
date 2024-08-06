import useCart from "../hooks/useCart";

const AddToCardButton = ({ id }) => {
  const { addToCart } = useCart();

  return (
    <button
      title='Añadir este producto al carrito.'
      className='bg-sky-200/60 w-full py-2 rounded-full font-semibold hover:bg-sky-400/60 transition-colors'
      onClick={() => addToCart({ id })}
    >
      Añadir al carrito
    </button>
  );
};

export default AddToCardButton;
