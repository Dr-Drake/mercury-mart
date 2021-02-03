// Our object of action creators
import {AdminActionTypes} from "./Types";

export const actions = {
    loadUser: (userObject)=>({
        type: AdminActionTypes.LOAD_USER,
        payload:{
            fullname: fullname
        }
    }),

    loadOrders: (orderArray)=>({
        type: AdminActionTypes.LOAD_ORDERS,
        payload: {
            orders: orderArray
        }
    }),

    loadProducts: (productArray)=>({
        type: AdminActionTypes.LOAD_PRODUCTS,
        payload: {
            products: productArray
        }
    }),

    loadProductsFilter: (productArray)=>({
        type: AdminActionTypes.LOAD_PRODUCTS_FILTER,
        payload: {
            products: productArray
        }
    }),

    loadCategories: (categoryArray)=>({
        type: AdminActionTypes.LOAD_CATEGORIES,
        payload: {
            categories: categoryArray
        }
    }),

    loadCategoryFilter: (categoryArray)=>({
        type: AdminActionTypes.LOAD_CATEGORIES_FILTER,
        payload: {
            categories: categoryArray
        }
    }),

    deleteCategory: (ids)=>({
        type: AdminActionTypes.REMOVE_CATEGORY,
        payload: {
            ids: ids
        }
    }),

}
