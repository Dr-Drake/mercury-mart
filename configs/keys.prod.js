module.exports = {
    env:{
        HOST: `https://mercury-mart.herokuapp.com`,
        PRODUCTS_API: `${this.HOST}/api/products`,
        DELETE_PRODUCTS: `${this.HOST}/api/products/Delete`, 
        CATEGORY_API: `${this.HOST}/api/Categories`,
        DELETE_CATEGORY: `${this.HOST}/api/Categories/Delete`,
        ADMIN_AUTH: `${this.HOST}/api/Auth/Login`,
        CUSTOMER_REGISTER: `${this.HOST}/api/CustomerManagement`,
        CART_API: `${this.HOST}/api/CustomerCartItems`, 
    }
}