import React from 'react';
import Pagination from '@material-ui/lab/Pagination';
import useStyles from './cartPage-jss';
import { useTheme } from '@material-ui/core/styles';
import { useRouter } from 'next/router';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import ProductCard from '../../Cards/ProductCard/ProductCard';
import CartCard from '../../Cards/CartCard/CartCard';
import Button from '@material-ui/core/Button';
import Link from 'next/link';
import { useProduct } from '../../../hooks/dataFetch';
import { connect } from 'react-redux';
import { actions } from '../../../redux/AdminActionCreators';
import { storeActions } from '../../../redux/StoreActionCreators';
import { useCookies } from 'react-cookie';

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

    const getQuantity = (productList, name) =>{
        let count = 0;

        for (let i = 0; i < productList.length; i++){
            let product = productList[i];
            if (product.productName === name){
                count ++;
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

    const handleEmptyCart = () =>{
        removeCookie("cart")
    }


    const [order, setOrder] = React.useState('asc');
    const [orderBy, setOrderBy] = React.useState("");
    const [page, setPage] = React.useState(0);
    const [selected, setSelected] = React.useState([]);
    const [dense, setDense] = React.useState(false);
    const [rowsPerPage, setRowsPerPage] = React.useState(5);
    

    return(
        <div className={classes.container} >
            <Grid container spacing={3} justify="center" >
                <Grid item xs={12} md={10}>
                <Typography
                    variant="h4"
                    noWrap
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
                            <Link href={`/checkout`}>
                                <Button  
                                    classes={{root: classes.checkoutButton}}
                                    color="primary" 
                                    variant="contained"
                                    component="a"
                                >
                                    Checkout
                                </Button>
                            </Link>
                            

                        </div>
                    </div>
                </Grid>
            </Grid>
        </div>
    )
}

export default connect(mapStateToProps, mapDispatchToProps)(CartPage);