import { CartActionTypes } from './cart.types'

export const toggleShowCart = () => {
  console.log("in function");
  return {
    type: CartActionTypes.TOGGLE_CART_HIDDEN,
    payload: null
  }
}