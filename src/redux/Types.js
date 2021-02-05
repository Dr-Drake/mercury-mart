export const DataTypes = {
    PRODUCTS: "products",
    CATEGORIES: "categories"
}

export const AdminActionTypes = {
    LOAD_USER: "load_user",
    LOAD_CUSTOMERS: "load_customers",
    LOAD_ORDERS: "load_orders",

    LOAD_PRODUCTS: "load_products",
    LOAD_PRODUCTS_FILTER: "load_products_filter",
    LOAD_PRODUCTS_RAW: "load_products_raw",
    ADD_PRODUCT: "add_product",
    REMOVE_PRODUCT : "remove_product",
    UPDATE_PRODUCT: "update_product",

    LOAD_CATEGORIES : "load_categories",
    LOAD_CATEGORIES_FILTER: "load_categories_filter",
    ADD_CATEGORIES: "add_categories",
    REMOVE_CATEGORY : "remove_category",
    UPDATE_CATEGORY: "update_category",
}

export const StoreActionTypes = {
    DATA_LOAD: "data_load",
    CART_LOAD: "cart_load",
    CART_UPDATE: "cart_update",
    CART_REMOVE: "cart_remove",
    CART_CLEAR: "cart_clear"
}