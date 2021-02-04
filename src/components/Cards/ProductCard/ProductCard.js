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
import useStyles from './productCard-jss';
import { useTheme } from '@material-ui/core/styles'
import { useRouter } from 'next/router';
import Link from 'next/link'
import PropTypes from 'prop-types';
import { Typography } from '@material-ui/core';
import Skeleton from '@material-ui/lab/Skeleton';
import Divider from '@material-ui/core/Divider';


export default function ProductCard(props) {
    const {
      name,
      image,
      price,
      description,
      isLoading
    } = props
    const theme = useTheme();
    const classes = useStyles(theme);
    const router = useRouter();

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
                
                {
                    !isLoading ?
                    <Typography 
                        variant="body2" 
                        color="textSecondary" 
                        component="p"
                        classes={{root:classes.description}}
                    >
                        {description} 
                        <span className={classes.hidden}>{description}</span>
                        <span className={classes.hidden}>{description}</span>
                    </Typography>
                    :
                    <Skeleton width="100%" height={20} >
                        <Typography variant="h5">.</Typography>
                    </Skeleton>
                }
                
            </CardContent>

        <CardActions classes={{root:classes.cardBottom}}>
            {
                !isLoading ?
                <Link href={`/category/${name.toLowerCase()}`}>
                    <IconButton 
                        size="small" 
                        classes={{root: classes.cardButton}} 
                        component="a"
                    >
                        <AddShoppingCartIcon />
                    </IconButton>
                </Link>
                :
                <Button 
                    size="small" 
                    classes={{root: classes.cardButton}} 
                    component="a"
                    disabled
                >
                    Shop now
                </Button>
            }
        </CardActions>
      </Card>
    );
}

ProductCard.propTypes = {
    name: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    description: PropTypes.string.isRequired,
    isLoading: PropTypes.bool,
}
