const CatalogueCard = ({id, titulo, imagen, descripcion, precio, isInCart, buttonFunc}) => {
  
  return (
    <article className='w-full h-96 border-2 border-emerald-600 rounded-md px-4 pt-6 pb-4 flex flex-col items-center gap-y-2 bg-white'>
      <div className=' w-full h-32 bg-white p-2 rounded-md'>
        <img
          className=' w-full h-full object-contain'
          src={imagen}
          alt={`Fotografía de ${titulo.toLowerCase()}`}
        />
      </div>
      <strong className='text'>{titulo}</strong>
      <p className="text-sm text-pretty">{descripcion}</p>
      <span className='mt-auto font-bold text-xl'>
        ${precio.toFixed(2)}
      </span>
      <button
      title="Añadir una unidad de este producto al carrito."
      onClick={() => buttonFunc({id})} 
      style={{ 
        borderColor: isInCart ? 'rgb(127 29 29)' : 'rgb(6 95 70)',
        color: isInCart ? 'rgb(185 28 28)' : 'rgb(5 150 105)'
      }}
      className="border-2 px-6 py-2 rounded-md font-semibold hover:scale-105 transition-transform">
        {isInCart ? 'Eliminar del carrito' : 'Agregar al carrito'}
      </button>
    </article>
  );
};

export default CatalogueCard;
