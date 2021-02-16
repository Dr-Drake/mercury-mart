import Typography from '@material-ui/core/Typography';
import useStyles from './orderSummary-jss';
import { useTheme } from '@material-ui/core/styles';
import Skeleton from '@material-ui/lab/Skeleton';
import Divider from '@material-ui/core/Divider';
import PropTypes from 'prop-types';

export default function OrderSummary(props){
    const {
        cart,
        isLoading,
        total
    } = props

    const theme = useTheme();
    const classes = useStyles(theme);

    return(
        <div>
            <div>
                <Typography variant="h6" className={classes.title}>
                    Order Summary
                </Typography>
            </div>
            <div>
                {
                    !isLoading ? cart.map((product)=>(

                        <div className={classes.productRow}>
                            <div>
                                <Typography variant="h4" className={classes.productName}>
                                    {product.productName}
                                </Typography>
                                <Typography color="textSecondary" className={classes.quantity}> 
                                    {`Quantity: ${product.quantity}`}
                                </Typography>
                            </div>

                            
                            <Typography variant="h4" className={classes.productName}>
                            {'₦' + product.productPrice.toLocaleString()}
                            </Typography>
                        </div>))
                        :

                        [0,1,2,3].map((item)=>(
                            <Skeleton width="100%" height="40px" >
                                <div className={classes.productRow}></div>
                            </Skeleton>
                        ))
                }
                <Divider />
                <div className={classes.totalRow}>
                    <div>
                        <Typography variant="h4" className={classes.total}>
                           Total
                        </Typography>
                    </div>

                
                    <Typography variant="h4" className={classes.totalPrice}>
                    {'₦' + total.toLocaleString()}
                    </Typography>
                </div>
                <Divider style={{marginBottom: 20}} />
            </div>
        </div>
    )
}

OrderSummary.propTypes = {
    cart: PropTypes.array,
    isLoading: PropTypes.bool,
    total: PropTypes.number,
}