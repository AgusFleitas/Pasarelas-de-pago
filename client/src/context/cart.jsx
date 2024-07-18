import { createContext, useReducer } from "react";
import { catalogue } from "../js/catalogue";

import axios from 'axios'

// 1. Crear contexto.
export const CartContext = createContext();

// REDUCER.

// Creamos el estado inicial para el reducer, en este caso tendremos dos propiedades: 'cart' que será un array vacío para gestionar el carrito y 'preferenceId' para gestionar la preferencia una vez se confirme la compra.
const initialState = {
  cart: [],
  preferenceId: null,
};
// Creamos el reducer. Va a recibir el estado y la acción que debe ejecutar.
const reducer = (state, action) => {
  // De la acción que recibe el reducer, vamos a sacar el 'tipo' de acción y el 'payload', que en nuestro caso será la información del producto.
  const { type: actionType, payload: actionPayload } = action;

  // Utilizamos un switch para detallar la lógica a seguir en cada caso. Este switch va a recibir el tipo de acción y detallamos la lógica en cada tipo.
  switch (actionType) {
    case "ADD_TO_CART": {
      const { id } = actionPayload;

      // Buscamos si el producto ya se encuentra en el carrito.
      const productInCartIndex = state.cart.findIndex((item) => item.id === id);

      // Si ya se encuentra en el carrito, creamos una copia profunda del carrito con structuredCLone, luego accedemos a la propiedad 'quantity' de ese producto y la incrementamos en 1. Finalmente, retornamos nuestra copia modificada.
      if (productInCartIndex >= 0) {
        const newState = structuredClone(state.cart);
        newState[productInCartIndex].quantity += 1;
        return { ...state, cart: newState };
      }

      // Si no está en el carrito vamos a crear una constante llamada newItem para insertar el nuevo producto, este va a ser el retorno de encontrar en el catálogo el producto con el ID que recibimos en el Payload. Luego retornamos una copia del estado (para conservar los productos que ya tenemos), una copia de nuestro item y la cantidad en 1.

      const newItem = catalogue.find((item) => item.id === id);

      return {
        ...state,
        cart: [
          ...state.cart,
          {
            ...newItem,
            quantity: 1,
          },
        ],
      };
    }

    case "REMOVE_FROM_CART": {
      const { id } = actionPayload;
      const filteredCart = state.cart.filter((item) => item.id != id)

      return {
        ...state,
        cart: filteredCart
      }
    }

    case "CLEAR_CART": {
      return initialState;
    }

    case "SET_PREFERENCE_ID": {
      return { ...state, preferenceId: actionPayload };
    }

    default:
      return state;
  }
};

// 2. Crear Provider (este archivo) y proveer el contexto (en donde sea necesario).
export function CartProvider({ children }) {
  // Estado para listar el carrito.
  const [state, dispatch] = useReducer(reducer, initialState);

  const addToCart = (product) =>
    dispatch({
      type: "ADD_TO_CART",
      payload: product,
    });

  const removeFromCart = (product) =>
    dispatch({
      type: "REMOVE_FROM_CART",
      payload: product,
    });

  const clearCart = () => dispatch({ type: "CLEAR_CART" });

  // Funcion para crear la preferencia.
  const createPreference = async () => {
    const cartItems = state.cart.map((product) => {
      return {
        name: product.titulo,
        quantity: product.quantity,
        price: product.precio,
        currency: "ARS",
        description: product.descripcion,
        image: product.imagen,
      };
    });

    try {
      const response = await axios.post(
        "http://localhost:3000/create-preference",
        {
          products: cartItems,
        }
      );

      const { id } = response.data;
      dispatch({
        type: 'SET_PREFERENCE_ID',
        payload: id
      })
      return id;
    } catch (error) {
      console.error(error);
      return null;
    }
  };

  return (
    <CartContext.Provider
      value={{
        cart: state.cart,
        addToCart,
        removeFromCart,
        clearCart,
        createPreference,
        preferenceId: state.preferenceId
      }}
    >
      {children}
    </CartContext.Provider>
  );
}
