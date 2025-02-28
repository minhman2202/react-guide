import {createContext, useReducer} from "react";

const CartContext = createContext({
  items: [],
  addItem: (item) => {
  },
  removeItem: (id) => {
  },
  clearCart: () => {
  }
});

function cartReducer(state, action) {
  if (action.type === "ADD_ITEM") {
    const existingCartItemIndex = state.items.findIndex(item => item.id === action.item.id);
    const updatedItems = [...state.items];

    if (existingCartItemIndex > -1) {
      let existingItem = state.items[existingCartItemIndex];
      updatedItems[existingCartItemIndex] = {
        ...existingItem,
        quantity: existingItem.quantity + 1
      };
    } else {
      updatedItems.push({...action.item, quantity: 1});
    }

    return {...state, items: updatedItems};
  }

  if (action.type === "REMOVE_ITEM") {
    const existingCartItemIndex = state.items.findIndex(item => item.id === action.item.id);
    const existingItem = state.items[existingCartItemIndex];

    const updatedItems = [...state.items];
    if (existingItem.quantity === 1) {
      updatedItems.splice(existingCartItemIndex, 1);
    } else {
      updatedItems[existingCartItemIndex] = {...existingItem, quantity: existingItem.quantity - 1};
    }

    return {...state, items: updatedItems};
  }

  if (action.type === "CLEAR_CART") {
    return {...state, items: []};
  }

  return state;
}

export function CartContextProvider({children}) {

  const [cart, dispatchCartAction] = useReducer(cartReducer, {items: []})

  const cartContext = {
    items: cart.items,
    addItem: (item) => dispatchCartAction({type: "ADD_ITEM", item: item}),
    removeItem: (id) => dispatchCartAction({type: "REMOVE_ITEM", item: {id: id}}),
    clearCart: () => dispatchCartAction({type: "CLEAR_CART"})
  };

  return (
    <CartContext value={cartContext}>
      {children}
    </CartContext>
  );
}

export default CartContext;