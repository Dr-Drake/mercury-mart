// Our object of action creators
import {StoreActionTypes} from "./Types";

export const storeActions = {
    loadCart: (cartArray)=>({
        type: StoreActionTypes.CART_LOAD,
        payload:{
            cart: cartArray
        }
    }),

}
