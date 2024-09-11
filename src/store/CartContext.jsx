import { createContext, useReducer } from "react";

const CartContext = createContext({
  items: [],
  addItem: (item) => {},
  removeItem: (id) => {},
  clearCart: (id) => {},
});

const cartReducer = (state, action) => {
  if (action.type === "ADD_ITEM") {
    const existingCartIndex = state.items.findIndex(
      (item) => item.id === action.item.id
    );

    const updatedItems = [...state.items];
    if (existingCartIndex > -1) {
      const existingCartItem = state.items[existingCartIndex];

      const updatedItem = {
        ...existingCartItem,
        quantity: state.items[existingCartIndex].quantity + 1,
      };
      updatedItems[existingCartIndex] = updatedItem;
    } else {
      updatedItems.push({ ...action.item, quantity: 1 });
    }

    return {
      ...state,
      items: updatedItems,
    };
  }
  if (action.type === "REMOVE_ITEM") {
    const existingCartIndex = state.items.findIndex(
      (item) => item.id === action.id
    );
    const existingCartItem = state.items[existingCartIndex];
    const updatedItems = [...state.items];
    if (existingCartItem.quantity === 1) {
      updatedItems.splice(existingCartIndex, 1);
    } else {
      const updatedItem = {
        ...existingCartItem,
        quantity: existingCartItem.quantity - 1,
      };
      updatedItems[existingCartIndex] = updatedItem;
    }
    return {
      ...state,
      items: updatedItems,
    };
  }
  if (action.type === "CLEAR_CART") {
    return { ...state, items: [] };
  }
  return state;
};

export const CartContextProvider = ({ children }) => {
  const [cart, dispatchCartAction] = useReducer(cartReducer, { items: [] });
  const addItem = (item) => {
    dispatchCartAction({ type: "ADD_ITEM", item });
  };
  const removeItem = (id) => {
    dispatchCartAction({ type: "REMOVE_ITEM", id });
  };
  const clearCart = () => {
    dispatchCartAction({ type: "CLEAR_CART" });
  };
  const cartContext = {
    items: cart.items,
    addItem,
    removeItem,
    clearCart,
  };
  return (
    <CartContext.Provider value={cartContext}>{children}</CartContext.Provider>
  );
};

export default CartContext;
