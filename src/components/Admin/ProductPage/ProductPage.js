import Grid from '@material-ui/core/Grid';
import ProductToolbar from '../../Toolbar/ProductToolbar/ProductToolbar';
import ProductTable from '../../Tables/ProductTable/ProductTable';
import React from 'react';
import mapToField from '../../../utils/mapToField';
import reorder from '../../../utils/reorder';
import formatDate from '../../../utils/formatDate';
import { useProduct, useCategories } from '../../../hooks/dataFetch';
import { actions } from '../../../redux/AdminActionCreators'
import { connect } from 'react-redux';
import { useState } from 'react';
import AddProduct from '../../Views/AddProduct/AddProduct';
import PageToolbar from '../../Toolbar/PageToolbar/PageToolbar';
import { BoxLoading } from 'react-loadingg';
import Backdrop from '@material-ui/core/Backdrop';
import useStyles from './productPage-jss';


// Action creators
const { 
    loadProducts, loadProductsFilter, loadProductsRaw,
    loadCategories
} = actions

const mapStateToProps = (dataStore) =>({
  ...dataStore
});

const mapDispatchToProps = {
  loadProducts, loadProductsFilter, loadProductsRaw,
  loadCategories,
}



function ProductPage(props){
    const classes = useStyles();
    const [activeStep, setActiveStep] = useState(0);
    const [isDeleting, setIsDeleting] = useState(false)
    const fields = ["name", "price", "cost", "category", "quantity"];
    const order = ["name", "cost", "price", "category", "date", "quantity"]
    const relevantKeys = [
        "productName", "productPrice", "productCost",
        "categoryId", "createdAt"
    ]
    const map = {
        "productName": "name",
        "productCost": "cost",
        "categoryId" : "category",
        "productPrice": "price",
        "createdAt" : "date"
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
    
    const { products, isLoading, isError } = useProduct();
    const categoryResult = useCategories();

    React.useEffect(()=>{
        
        if (isLoading === false){
            let seen = [];
            let data = [];

            for (let i = 0; i < products.length; i++){
                let product = products[i];
                if (seen.includes(product.productName) === false){
                    seen.push(product.productName);
                    let mapped = mapToField(map, product, relevantKeys);
                    data.push(reorder({
                        ...mapped, 
                        quantity: getQuantity(products, product.productName),
                        category: product.category.categoryName,
                        date:formatDate(product.createdAt)
                    }, order))
                }
            }
            
            props.loadProducts(data);
            props.loadProductsFilter(data);
            props.loadProductsRaw(products);
            //setTableData(data);
            //filteredData = data
        }

        if (categoryResult.isLoading === false){
            props.loadCategories(categoryResult.categories);
        }
    }, [isLoading, products, categoryResult.isLoading, categoryResult.categories])

    let filteredData = props.products;

    const formatFilter = (field, operator, inputValue)=>{
        let lowerField = field;

        if (typeof(field) !== "string"){
            lowerField = field.toString();
        }

        switch(operator){
            case "contains":
                return lowerField.toLowerCase().includes(inputValue.toLowerCase());
            
            case "equals":
                return lowerField.toLowerCase() === inputValue.toLowerCase()
            
            case "starts with":
                return lowerField.toLowerCase().startsWith(inputValue.toLowerCase());

            case "greater than":
                return lowerField.toLowerCase() > inputValue.toLowerCase();

            case "less than":
                return lowerField.toLowerCase() < inputValue.toLowerCase();
            
            default:
                return lowerField.toLowerCase().endsWith(inputValue.toLowerCase());
        }
    }


    const applyFilters = (filters) =>{
        //console.log(filters)

        for (let i = 0; i < filters.length; i++){
            filteredData = filteredData.filter((row)=>{
                //console.log(row[filters[i].field])
                return formatFilter(row[filters[i].field], filters[i].operator, filters[i].inputValue);
            })
        }

        props.loadProductsFilter(filteredData);
    }

    const resetFilters = () =>{
        props.loadProductsFilter(props.products)
    }

    const addProductCallback = () =>{
        setActiveStep(1);
    }

    const prevCallback = () =>{
        setActiveStep(0)
    }

    const loadingCallback = (status)=>{
        setIsDeleting(status)
    };


    return(
        <div style={{background: "#000"}} >
            <Backdrop className={classes.backdrop} open={isDeleting} >
                <BoxLoading />
            </Backdrop>
            {
                activeStep === 0 ?
                <div style={{flexGrow: 1, padding: 20}}>
                    <Grid container spacing={3}>
                        
                        <Grid xs={12} item>
                            <PageToolbar 
                                filterFields={fields} 
                                applyFilters={applyFilters} 
                                resetFilters={resetFilters}
                                actionCallback={addProductCallback}
                                actionTitle="ADD PRODUCT"
                                enableSecondAction
                            />
                        </Grid>

                        <Grid xs={12} item>
                            <ProductTable 
                            data={props.productsFilter} 
                            isLoading={isLoading}
                            products={props.productsRaw}
                            categories={props.categories}
                            loadingCallback={loadingCallback} 
                            />
                        </Grid>

                    </Grid>
                </div>
                :
                <AddProduct prevCallback={prevCallback} categories={props.categories} />
        
            }
        </div>
    )
}

export default connect(mapStateToProps, mapDispatchToProps)(ProductPage);