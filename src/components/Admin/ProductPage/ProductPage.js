import Grid from '@material-ui/core/Grid';
import ProductToolbar from '../../Toolbar/ProductToolbar/ProductToolbar';
import ProductTable from '../../Tables/ProductTable/ProductTable';
import React from 'react';
import mapToField from '../../../utils/mapToField';
import {useProduct} from '../../../hooks/dataFetch';
import { actions } from '../../../redux/AdminActionCreators'
import { connect } from 'react-redux';
import { useState } from 'react';
import AddProduct from '../../Views/AddProduct/AddProduct';
import CatergoryTable from '../../Tables/CatergoryTable/CategoryTable';
import PageToolbar from '../../Toolbar/PageToolbar/PageToolbar';


// Action creators
const { loadProducts, loadProductsFilter } = actions

const mapStateToProps = (dataStore) =>({
  ...dataStore
});

const mapDispatchToProps = {
  loadProducts, loadProductsFilter,
}



function ProductPage(props){
    const [activeStep, setActiveStep] = useState(0);
    const fields = ["name", "description", "price", "category", "quantity"];
    const relevantKeys = ["productName", "productDescription", "categoryId", "productPrice", "createdAt"]
    const map = {
        "productName": "name",
        "productDescription": "description",
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

    React.useEffect(()=>{
        
        if (isLoading === false){
            let seen = [];
            let data = [];

            for (let i = 0; i < products.length; i++){
                let product = products[i];
                if (seen.includes(product.productName) === false){
                    seen.push(product.productName);
                    let mapped = mapToField(map, product, relevantKeys);
                    data.push({...mapped, quantity: getQuantity(products, product.productName)})
                }
            }
            
            props.loadProducts(data);
            props.loadProductsFilter(data);
            //setTableData(data);
            //filteredData = data
        }
    }, [isLoading])

    let filteredData = props.products;

    const formatFilter = (field, operator, inputValue)=>{
        let lowerField = field;

        if (typeof(field) !== "string"){
            lowerField = field.toString();
        }

        switch(operator){
            case "contains":
                return lowerField.toLowerCase().includes(inputValue);
            
            case "equals":
                return lowerField.toLowerCase() === inputValue
            
            case "starts with":
                return lowerField.toLowerCase().startsWith(inputValue);

            case "greater than":
                return lowerField.toLowerCase() > inputValue;

            case "less than":
                return lowerField.toLowerCase() < inputValue;
            
            default:
                return lowerField.toLowerCase().endsWith(inputValue);
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


    return(
        <div style={{background: "#000"}} >
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
                            <ProductTable data={props.productsFilter} isLoading={isLoading} />
                        </Grid>

                    </Grid>
                </div>
                :
                <AddProduct prevCallback={prevCallback} />
        
            }
        </div>
    )
}

export default connect(mapStateToProps, mapDispatchToProps)(ProductPage);