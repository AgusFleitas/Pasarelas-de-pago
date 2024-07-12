import { createContext, useReducer } from "react";

// 1. Crear contexto.
export const CartContext = createContext();

// REDUCER.

// Creamos el estado inicial para el reducer, en este caso, el carrito vacío.
const initialState = [];
// Creamos el reducer. Va a recibir el estado y la acción que debe ejecutar.
const reducer = (state, action) => {
  // De la acción que recibe el reducer, vamos a sacar el 'tipo' de acción y el 'payload', que en nuestro caso será la información del producto.
  const { type: actionType, payload: actionPayload } = action;

  // Utilizamos un switch para detallar la lógica a seguir en cada caso. Este switch va a recibir el tipo de acción y detallamos la lógica en cada tipo.
  switch (actionType) {

    case "ADD_TO_CART": {
      const { id } = actionPayload;

          // Buscamos si el producto ya se encuentra en el carrito.
      const productInCartIndex = state.findIndex((item) => item.id === id);

          // Si ya se encuentra en el carrito, creamos una copia profunda del carrito con structuredCLone, luego accedemos a la propiedad 'quantity' de ese producto y la incrementamos en 1. Finalmente, retornamos nuestra copia modificada.
      if (productInCartIndex >= 0) {
        const newState = structuredClone(state);
        newState[productInCartIndex].quantity += 1;
        return newState;
      }

          // Si no está en el carrito hacemos una copia del estado existente, hacemos una copia del payload (el producto) para conservar todas sus propiedades y dentro de la propiedad quantity ingresamos '1' ya que será la primera unidad de este producto.
      return [
        ...state,
        {
          ...actionPayload,
          quantity: 1,
        },
      ];
    }

    case "REMOVE_FROM_CART": {
      const { id } = actionPayload;
      return state.filter((item) => item.id != id);
    }
     
    case "CLEAR_CART" : {
      return initialState;
    }
  }

  return state;
};

// 2. Crear Provider (este archivo) y proveer el contexto (en donde sea necesario).
export function CartProvider({ children }) {
  // Estado para listar el carrito.
  const [state, dispatch] = useReducer(reducer, initialState);

  const addToCart = product => dispatch({
    type: 'ADD_TO_CART',
    payload: product
  })

  const removeFromCart = product => dispatch({
    type: 'REMOVE_FROM_CART',
    payload: product
  })

  const clearCart = () => dispatch({type: 'CLEAR_CART'})

  return (
    <CartContext.Provider
      value={{
        cart: state,
        addToCart,
        removeFromCart,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}
