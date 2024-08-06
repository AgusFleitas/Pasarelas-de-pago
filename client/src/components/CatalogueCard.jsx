import AddToCartButton from './AddToCartButton'
import RemoveFromCartButton from './RemoveFromCartButton'

const CatalogueCard = ({id, titulo, imagen, descripcion, precio, isInCart}) => {
  
  return (
    <article className='w-full h-96 border-2 border-sky-300 rounded-md px-4 pt-6 pb-4 flex flex-col items-center gap-y-2 bg-white/80 shadow-md shadow-gray-400'>
      <div className='w-full h-32 bg-white p-2 rounded-md'>
        <img
          className='w-full h-full object-contain'
          src={imagen}
          alt={`Fotografía de ${titulo.toLowerCase()}`}
        />
      </div>
      <strong className='text'>{titulo}</strong>
      <p className="text-sm text-pretty">{descripcion}</p>
      <span className='mt-auto font-bold text-xl'>
        ${precio.toFixed(2)}
      </span>
    {isInCart ? 
    <RemoveFromCartButton id={id} /> :
    <AddToCartButton id={id} />  
  }
    </article>
  );
};

export default CatalogueCard;
