import { CartActionTypes } from './cart.types'

export const toggleShowCart = () => {
  return {
    type: CartActionTypes.TOGGLE_CART_HIDDEN,
    payload: null
  }
}

export const addItem = item => {
  return {
    type: CartActionTypes.ADD_ITEM,
    payload: item
  }
}

export const removeItem = itemId => {
  return {
    type: CartActionTypes.REMOVE_ITEM,
    payload: itemId
  }
}

export const clearItemFromCart = itemId => {
  return {
    type: CartActionTypes.CLEAR_ITEM_FROM_CART,
    payload: itemId
  }
}

//
export const clearCart = () => {
  return {
    type: CartActionTypes.CLEAR_CART
  }
}