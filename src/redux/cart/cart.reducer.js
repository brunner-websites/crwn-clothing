import { CartActionTypes } from './cart.types'
import { addItemToCart } from './cart.utils'

const INITIAL_STATE = {
  hidden: true,
  cartItems: []
}

const cartReducer = (state = INITIAL_STATE, action) => {

  switch (action.type) {
    case CartActionTypes.TOGGLE_CART_HIDDEN:
      return {
        ...state,
        hidden: !state.hidden
      }

    case CartActionTypes.ADD_ITEM:
      const updatedItems = addItemToCart(state.cartItems, action.payload);

      return {
        ...state,
        cartItems: updatedItems
      }

    case CartActionTypes.REMOVE_ITEM:

      return {
        ...state,
        cartItems: state.cartItems.map(item =>
          (item.id === action.payload && item.quantity > 1) ? { ...item, quantity: item.quantity - 1 } : item
        )
      }

    case CartActionTypes.CLEAR_ITEM_FROM_CART:
      console.log("in here", action.payload)
      return {
        ...state,
        cartItems: state.cartItems.filter((item) => item.id !== action.payload)
      }


    default:
      return state;
  }
}

export default cartReducer;