import React from 'react';
import Pagination from '@material-ui/lab/Pagination';
import useStyles from './cartPage-jss';
import { useTheme } from '@material-ui/core/styles';
import { useRouter } from 'next/router';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import CartCard from '../../Cards/CartCard/CartCard';
import Button from '@material-ui/core/Button';
import Link from 'next/link';
import { BoxLoading } from 'react-loadingg';
import Backdrop from '@material-ui/core/Backdrop';
import { useProduct } from '../../../hooks/dataFetch';
import { connect } from 'react-redux';
import { actions } from '../../../redux/AdminActionCreators';
import { storeActions } from '../../../redux/StoreActionCreators';
import { useCookies } from 'react-cookie';
import axios from 'axios';

// Action creators
const { loadProducts } = actions
const { loadCart } = storeActions
const mapStateToProps = (dataStore) =>({
  ...dataStore
});
const mapDispatchToProps = {
  loadProducts, loadCart
}

function CartPage(props){
    const theme = useTheme();
    const classes = useStyles(theme);
    const router = useRouter();
    const { products, isLoading } = useProduct();
    const [cookies, setCookie, removeCookie] = useCookies(["cart"]);
    const [isRedirecting, setIsRedirecting] = React.useState(false);

    React.useEffect(()=>{
        let seen = [];
        let data = [];
        
        if (isLoading === false){
            props.loadProducts(products);

            if (cookies.cart){
                for (let i = 0; i < products.length; i++){
                    let product = products[i];
                    if (seen.includes(product.productName) === false){
                        seen.push(product.productName);
                        
                        if (cookies.cart.includes(product.productName)){
                            data.push({
                                ...product,
                                quantity: getCartQuantity(cookies.cart, product.productName),
                            })
                        }
                    }
                }
            }
        }

        props.loadCart(data)

        
    }, [isLoading, products, cookies.cart])

    const getCartQuantity = (cart, name) =>{
        let count = 0;

        for (let i = 0; i < cart.length; i++){
            let item = cart[i]
            if (item === name){
                count++;
            }
        }

        return count;
    }

    const calculateTotal = () =>{
        let total = 0;

        //console.log(props.cart)
        for (let i = 0; i < props.cart.length; i++){
            let product = props.cart[i];
            let price = product.productPrice * product.quantity
            total = price + total
        }

        return total;
    }

    const deleteCart = () =>{
        let willDeleteCart = new Promise( async(resolve, reject)=>{
            try{
                let response = await axios({
                    method: "delete",
                    url: process.env.CART_API,
                    headers: {'Authorization': `Bearer ${cookies['mercmart_customer']}`}
                })

                if (response){
                    resolve(response)
                }
            }catch(err){
                reject(err)
            }
        })

        return willDeleteCart;
    }

    const handleEmptyCart = () =>{
        removeCookie("cart")
        deleteCart().then((response)=> console.log("Cart empty"))
        .catch((err)=> console.log(err))
    }

    const handleCheckout = () =>{
        setIsRedirecting(true);
        router.push("/checkout")
    }
    
    return(
        <div className={classes.container} >
            <Backdrop className={classes.backdrop} open={isRedirecting} >
                <BoxLoading />
            </Backdrop>
            <Grid container spacing={3} justify="center" >
                <Grid item xs={12} md={10}>
                <Typography
                    variant="h4"
                    classes={{root: classes.title}}
                >
                    Your Shopping Cart
                </Typography>
                </Grid>

                <Grid item xs={12} md={10}>
                    <Grid container spacing={3} >
                        {
                            props.cart.map((product)=>(
                                <Grid item xs={6} sm={4} md={4} lg={3} >
                                    <CartCard
                                        id={product.productId}
                                        name={product.productName} 
                                        image={product.attachmentLink}
                                        quantity={product.quantity}
                                        price={product.productPrice}
                                        isLoading={isLoading}
                                    />
                                </Grid>
                            ))
                        }
                    </Grid>
                </Grid>
                {
                    props.cart.length === 0 && 
                    <Grid item xs={12} md={10}>
                        <div className={classes.emptyCartArea}>
                            <img 
                                src="/empty-cart.png" 
                                alt="empty cart logo"
                                className={classes.emptyCartImg}
                            />
                            <Typography
                                className={classes.imgCaption}
                                color="textSecondary"
                            >
                                Your cart is empty
                            </Typography>
                            <Typography
                                className={classes.emptyDescription}
                            >
                                Browse our categories and discover what you like!
                            </Typography>
                            <Link href="/" passHref>
                                <Button 
                                    variant="contained" 
                                    color="secondary" 
                                    component="a"
                                    classes={{root:classes.emptyDescription}}
                                >
                                    Start Shopping
                                </Button>
                            </Link>
                        </div>
                    </Grid>
                }
                {
                    props.cart.length > 0 &&
                    <Grid item xs={12} md={10}>
                        <div className={classes.cartInfo} >
                            <Typography
                                variant="h5"
                            >
                                {'Subtotal: ' + '₦' + calculateTotal().toLocaleString()}
                            </Typography>

                            <div className={classes.cartActionArea}>
                                <Button 
                                    color="secondary"
                                    variant="contained"
                                    onClick={handleEmptyCart}
                                    
                                >
                                    Empty Cart
                                </Button>
                                
                                <Button  
                                    classes={{root: classes.checkoutButton}}
                                    color="primary" 
                                    variant="contained"
                                    //component="a"
                                    onClick={handleCheckout}
                                >
                                    Checkout
                                </Button>
                                
                            </div>
                        </div>
                    </Grid>
                }
            </Grid>
        </div>
    )
}

export default connect(mapStateToProps, mapDispatchToProps)(CartPage);