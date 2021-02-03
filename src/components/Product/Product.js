import useStyles from './product-jss';
import StarIcon from '../Star/Star';
import { useState } from 'react';
import Rating from '../Rating/FixedRating';

export default function Product(props){
    const classes = useStyles();

    const {
        title,
        category,
        price,
        rating,
    } = props;
    
    return(
        <div className={classes.wrapper}>
            <div className={classes.imageWrapper}>
                <img  
                    src="/default-store.jpg" 
                    alt="Default product image" 
                />
            </div>
            <div>
                <div className={classes.description}>
                    <h5>
                        {title ? title : "Macbook Pro"}
                    </h5>
                    <div style={{paddingLeft: "5px"}}>
                        <Rating rating={4} />
                    </div>
                </div>
                <div className={classes.category}>
                    <p>{category ? category : "Laptops"}</p>
                </div>

            </div>

            <div className={classes.price}>
               <h4>{'₦' + (price ? price : "650,000")}</h4>
            </div>
        </div>
    )
}