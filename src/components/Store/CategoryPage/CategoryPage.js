import React from 'react';
import Pagination from '@material-ui/lab/Pagination';
import useStyles from './categoryPage-jss';
import { useTheme } from '@material-ui/core/styles';
import { useRouter } from 'next/router';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import CategoryCard from '../../Cards/CategoryCard/CategoryCard';
import ProductCard from '../../Cards/ProductCard/ProductCard';
import { useProduct } from '../../../hooks/dataFetch';
import { connect } from 'react-redux';
import { actions } from '../../../redux/AdminActionCreators'

// Action creators
const { loadProducts } = actions
const mapStateToProps = (dataStore) =>({
  ...dataStore
});
const mapDispatchToProps = {
  loadProducts
}

function CategoryPage(props){
    
    const theme = useTheme();
    const classes = useStyles(theme);
    const router = useRouter();
    const name = router.query.name
    const { products, isLoading } = useProduct();

    React.useEffect(()=>{
        if (isLoading === false && name){
            let seen = [];
            let data = [];

            for (let i = 0; i < products.length; i++){
                let product = products[i];
                if (seen.includes(product.productName) === false){
                    seen.push(product.productName);

                    if (product.category.categoryName.toLowerCase() === name.toLowerCase()){
                        data.push(product)
                    }
                }
            }
            props.loadProducts(data);
        }
    }, [isLoading, products, name])

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
                    {name}
                </Typography>
                </Grid>

                <Grid item xs={12} md={10}>
                    <Grid container spacing={3} >
                        {
                            !isLoading ?
                            props.products.map((product)=>(
                                <Grid item xs={6} sm={4} md={4} lg={3} >
                                    <ProductCard
                                        id={product.productId}
                                        name={product.productName} 
                                        image={product.attachmentLink}
                                        description={product.productDescription}
                                        price={product.productPrice}
                                        isLoading={isLoading}
                                    />
                                </Grid>
                            ))
                            :
                            [0, 1, 2, 3, 4, 5].map((item)=>(
                                <Grid item xs={6} sm={4} md={4} lg={3} >
                                    <ProductCard
                                        isLoading={isLoading}
                                    />
                                </Grid>
                            ))
                        }
                    </Grid>
                </Grid>
            </Grid>
        </div>
    )
}

export default connect(mapStateToProps, mapDispatchToProps)(CategoryPage);