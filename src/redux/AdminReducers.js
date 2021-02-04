// Our reducers
import { AdminActionTypes} from "./Types";

export const productReducer = (prevStore, action)=>{
    switch(action.type){
        case AdminActionTypes.LOAD_PRODUCTS:
            return {
                ...prevStore,
                products: action.payload.products
            }

        case AdminActionTypes.LOAD_PRODUCTS_FILTER:
            return {
                ...prevStore,
                productsFilter: action.payload.products
            }
        
        case AdminActionTypes.LOAD_PRODUCTS_RAW:
            return {
                ...prevStore,
                productsRaw: action.payload.products
            }

        
        default:
            return prevStore || {}
    }
};


export const categoryReducer = (prevStore, action) =>{
    switch(action.type){
        case AdminActionTypes.LOAD_CATEGORIES:
            return {
                ...prevStore,
                categories: action.payload.categories
            }

        case AdminActionTypes.LOAD_CATEGORIES_FILTER:
            return {
                ...prevStore,
                categoriesFilter: action.payload.categories
            }

        case AdminActionTypes.REMOVE_CATEGORY:
            const newCategories = prevStore.categories.filter((item)=>{
                return !(action.payload.ids.includes(item.id))
            })
            return {
                ...prevStore,
                categories: [],
                categoriesFilter: []
            }
        
        default:
            return prevStore || {}
    }
}

