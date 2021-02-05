import React from 'react';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardActions from '@material-ui/core/CardActions';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import AddShoppingCartIcon from '@material-ui/icons/AddShoppingCart';
import IconButton from '@material-ui/core/IconButton';
import useStyles from './cartCard-jss';
import { useTheme } from '@material-ui/core/styles'
import { useRouter } from 'next/router';
import Link from 'next/link'
import PropTypes from 'prop-types';
import { Typography } from '@material-ui/core';
import Skeleton from '@material-ui/lab/Skeleton';
import Divider from '@material-ui/core/Divider';
import RemoveIcon from '@material-ui/icons/Remove';
import AddIcon from '@material-ui/icons/Add';
import { useCookies } from 'react-cookie';


export default function CartCard(props) {
    const {
        id,
        name,
        image,
        price,
        quantity,
        isLoading
    } = props
    const theme = useTheme();
    const classes = useStyles(theme);
    const router = useRouter();

    const [cookies, setCookie, removeCookie] = useCookies(["cart"]);

    const handleAdd = () =>{
        var cookieOptions = {
            //expires: new Date(60 * 60 * 5 * 1000), // in milliseconds - 5hrs
            path: "/"
        }
        if (cookies.cart){
            let clone = [...cookies.cart]
            clone.push(name);
            setCookie("cart", clone, cookieOptions)
        } else {
            setCookie("cart", [name], cookieOptions);
        }   
    }

    const handleRemove = () =>{
        var cookieOptions = {
            //expires: new Date(60 * 60 * 5 * 1000), // in milliseconds - 5hrs
            path: "/"
        }
        if (cookies.cart){
            let clone = [...cookies.cart]
            let index = clone.indexOf(name);
            clone.splice(index, 1)
            setCookie("cart", clone, cookieOptions)
        }
    }

    const handleClick = () =>{
        var cookieOptions = {
            //expires: new Date(60 * 60 * 5 * 1000), // in milliseconds - 5hrs
            path: "/"
        }
        if (cookies.cart){
            let clone = cookies.cart.filter((item)=>{
                return item !== name
            })
            
            setCookie("cart", clone, cookieOptions)
        }
    }

    return (
      <Card className={classes.card} >
        {
          !isLoading ?
          <CardMedia
            className={classes.media}
            image={image}
            name={name}
            component="img"
          /> :
          <Skeleton variant="rect" width="100%">
            <CardMedia
              className={classes.media}
            />
          </Skeleton>
        }
        <Divider />

            <CardContent classes={{root:classes.cardMiddle}}>
                <div className={classes.infoArea}>
                    {
                        !isLoading ?
                        <Typography variant="h6" classes={{root:classes.productName}} >
                            {name}
                        </Typography>
                        :
                        <Skeleton width="100%">
                            <Typography variant="h6">.</Typography>
                        </Skeleton>
                    }
                    {
                        !isLoading ?
                        <Typography variant="h6" classes={{root:classes.productName}}>
                            {'₦' + price.toLocaleString()}
                        </Typography>
                        :
                        <Skeleton width="100%">
                            <Typography variant="h6">.</Typography>
                        </Skeleton>
                    }
                    
                </div>   
            </CardContent>

        <CardActions classes={{root:classes.cardBottom}}>
            {
                !isLoading ?
                <div style={{color: "white"}}>
                    <IconButton
                        onClick={handleRemove}
                        size="small"
                        classes={{root:classes.quantityIconButton}}
                    >
                        <RemoveIcon classes={{root:classes.quantityIcon}} />
                    </IconButton>
                    <span className={classes.quantity}>{quantity}</span>
                    <IconButton
                        onClick={handleAdd}
                        size="small"
                        classes={{root:classes.quantityIconButton}}
                    >
                        <AddIcon classes={{root:classes.quantityIcon}} />
                    </IconButton>
                </div>
                :
                <Skeleton variant="rect" width="20px" height="10px" />
            }
            <div>
                <Button 
                    size="small" 
                    classes={{root: classes.cardButton}}
                    color="secondary" 
                    variant="contained"
                    onClick={handleClick}
                    disabled={isLoading}
                >
                    Remove
                </Button>
            </div>
        </CardActions>
      </Card>
    );
}

CartCard.propTypes = {
    name: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    quantity: PropTypes.string.isRequired,
    isLoading: PropTypes.bool,
    id: PropTypes.number.isRequired
}
