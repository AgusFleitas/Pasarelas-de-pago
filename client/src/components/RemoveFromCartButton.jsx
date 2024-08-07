import useCart from "../hooks/useCart";

const RemoveFromCartButton = ({ id }) => {
  const { removeFromCart } = useCart();

  return (
    <button
      title='Eliminar este producto del carrito.'
      className='bg-red-400/60 w-full py-2 rounded-full font-semibold hover:bg-red-400/80 transition-colors'
      onClick={() => removeFromCart({ id })}
    >
      Eliminar del carrito
    </button>
  );
};

export default RemoveFromCartButton;
