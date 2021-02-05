// Our reducers
import { StoreActionTypes} from "./Types";

export const cartReducer = (prevStore, action)=>{
    switch(action.type){
        case StoreActionTypes.CART_LOAD:
            return {
                ...prevStore,
                cart: action.payload.cart
            }
        
        default:
            return prevStore || {}
    }
};

