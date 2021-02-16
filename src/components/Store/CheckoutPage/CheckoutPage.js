import AddCategory from '../../Views/AddCategory/AddCategory';
import Grid from '@material-ui/core/Grid';
import PageToolbar from '../../Toolbar/PageToolbar/PageToolbar';
import CategoryTable from '../../Tables/CatergoryTable/CategoryTable';
import React from 'react';
import mapToField from '../../../utils/mapToField';
import formatDate from '../../../utils/formatDate';
import { useRouter } from 'next/router';
import { useProduct } from '../../../hooks/dataFetch';
import { useCookies } from 'react-cookie';
import { actions } from '../../../redux/AdminActionCreators';
import { storeActions } from '../../../redux/StoreActionCreators';
import { connect } from 'react-redux';
import { BoxLoading } from 'react-loadingg';
import Backdrop from '@material-ui/core/Backdrop';
import useStyles from './checkoutPage-jss';
import Stepper from '../../Stepper/Stepper';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import OrderSummary from '../../Views/OrderSummary/OrderSummary';
import Button from '@material-ui/core/Button';


// Action creators
const { loadProducts } = actions
const { loadCart } = storeActions

const mapStateToProps = (dataStore) =>({
  ...dataStore
});

const mapDispatchToProps = {
  loadProducts, loadCart
}


function CheckoutPage(props){
    const classes = useStyles();
    const [activeStep, setActiveStep] = React.useState(0);
    const [isDeleting, setIsDeleting] = React.useState(false)
    const [cookies, setCookie, removeCookie] = useCookies(["cart"]);
    const router = useRouter();
    
    const { products, isLoading } = useProduct();
    
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

    const steps = ["Delivery address", "Payment details"];

    const getStepContent = (step)=> {
        switch (step) {
          case 0:
            return <div>Hello</div>
          case 1:
            return <OrderSummary isLoading={isLoading} cart={props.cart} total={calculateTotal()} />

          default:
            return 'Unknown step';
        }
    }

    const handleBack = () => {
        activeStep === 0 ? router.push("/cart") :
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };
    
    const handleNext = () =>{
        activeStep === steps.length - 1 ? alert("Order on it's way") :
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
    }


    return(
        <div className={classes.container}>
            <Backdrop className={classes.backdrop} open={isDeleting} >
                <BoxLoading />
            </Backdrop>
            <Grid container justify="center" style={{backgroundColor: "red"}}>
                <Grid item xs={12} sm={8} md={6}>
                    <Card className={classes.card}>
                        <CardHeader 
                            title="Checkout" 
                            classes={{
                                title: classes.cardTitle,
                                root: classes.cardHeader
                            }}
                        />
                        <CardContent classes={{root: classes.cardContent}}>
                            <Stepper
                                steps={steps}
                                activeStep={activeStep}
                            />
                            {getStepContent(activeStep)}
                        </CardContent>
                        <CardActions className={classes.cardAction}>
                            { activeStep === 0 ?
                            <Button 
                                onClick={handleBack} 
                                className={classes.backButton}
                                variant="contained"
                            >
                                Back to cart
                            </Button> :
                            <Button 
                                onClick={handleBack} 
                                className={classes.backButton}
                                variant="contained"
                            >
                                Back
                            </Button>
                            }
                            <Button
                                variant="contained"
                                color="secondary"
                                onClick={handleNext}
                                className={classes.button}
                            >
                                {activeStep === steps.length - 1 ? 
                                `Pay ₦${calculateTotal().toLocaleString()}` : 'Next'}
                            </Button>
                        </CardActions>
                    </Card>
                </Grid>
            </Grid>
        </div>
    )
}

export default connect(mapStateToProps, mapDispatchToProps)(CheckoutPage);