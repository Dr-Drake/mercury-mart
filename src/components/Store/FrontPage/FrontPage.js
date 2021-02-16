import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography';
import useStyles from './frontPage-jss';
import { useTheme } from '@material-ui/core/styles'
import CategoryCard from '../../Cards/CategoryCard/CategoryCard';
import { useCategories, useProduct } from '../../../hooks/dataFetch';
import React from 'react';
import { connect } from 'react-redux';
import { actions } from '../../../redux/AdminActionCreators'

// Action creators
const { loadCategories, loadProducts } = actions
const mapStateToProps = (dataStore) =>({
  ...dataStore
});
const mapDispatchToProps = {
  loadCategories, loadProducts
}

function FrontPage(props){

    const theme = useTheme();
    const classes = useStyles(theme);
    const { categories, isLoading } = useCategories();
    const productResult = useProduct();

    React.useEffect(()=>{
        
        if (isLoading === false){
            props.loadCategories(categories);
        }

        if (productResult.isLoading === false){
            console.log(productResult.products)
            props.loadProducts(productResult.products)
        }
    }, [isLoading, categories, productResult.isLoading, productResult.products])

    const getImage = (id)=> {
        const productFind = props.products.find((product)=>{
            return product.category.categoryId === id
        })

       if (productFind){
           return productFind.attachmentLink
       } else{
           return '/default-store.jpg'
       }
    }

    return(
        <div style={{flexGrow: 1, padding: 20, backgroundColor: "#DBCECA"}}>
            <Grid container spacing={3} >
                <Grid item xs={12}>
                    <div className={classes.header}>
                        <Typography
                            variant="h2"
                            align="center"
                            //noWrap
                            classes={{root: classes.title}}
                        >
                            Our Tech is out of this world
                        </Typography>
                    </div>
                </Grid>

                <Grid item xs={12}>
                    <Grid container spacing={3} >
                        {
                            !isLoading ?
                            props.categories.map((category)=>(
                                <Grid item xs={6} sm={4} md={4} >
                                    <CategoryCard
                                        title={category.categoryName}
                                        image={getImage(category.categoryId)}
                                        isLoading={isLoading}
                                    />
                                </Grid>
                            ))
                            :
                            [0, 1, 2, 3, 4].map((item)=>(
                                <Grid item xs={6} sm={4} md={4} lg={3} >
                                    <CategoryCard
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

export default connect(mapStateToProps, mapDispatchToProps)(FrontPage);