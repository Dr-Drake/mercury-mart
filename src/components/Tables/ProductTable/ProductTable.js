import TableBackbone from '../TableBackbone/TableBacbone';
import SkeletonTableBackbone from '../TableBackbone/SkeletonTableBackbone';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import TableCell from '@material-ui/core/TableCell';
import useStyles from './productTable-jss';
import PropTypes from 'prop-types';
import React from 'react';
import ProductDialog from '../../Dialogs/ProductDialog/ProductDialog';
import axios from 'axios';
import { mutate } from 'swr'

export default function ProductTable(props){

    const {
        data,
        isLoading,
        loadingCallback,
    } = props;

    const classes = useStyles();

    const [editable, setEditable] = React.useState({});
    const [serials, setSerials] = React.useState([]);
    const [open, setOpen] = React.useState(false);
    const [category, setCategory] = React.useState(null);

    const headerColumns = [
        { id: 'name', numeric: false, disablePadding: false, label: 'Name' },
        { id: 'cost', numeric: false, disablePadding: false, label: 'Cost' },
        { id: 'price', numeric: false, disablePadding: false, label: 'Price' },
        { id: 'category', numeric: false, disablePadding: false, label: 'Category' },
        { id: 'date', numeric: false, disablePadding: false, label: 'Date' },
        { id: 'quantity', numeric: false, disablePadding: false, label: 'Quantity' },
    ]

    const editCallback = (rowId) =>{
        let serialNumbers = [];
        let selectedProduct = props.products.find((product)=>{
            return product.productName === rowId
        })

        for (let i = 0; i < props.products.length; i++){
            let product = props.products[i];
            if (product.productName === rowId){
                serialNumbers.push({key: i + 1, serial:product.productSerialNumber}) 
            }
        }
        setEditable(selectedProduct);
        setCategory(selectedProduct.category.categoryId)
        setSerials(serialNumbers)
        setOpen(true);
    }

    const setCategoryCallback = (value) =>{
        setCategory(value)
    }

    const closeCallback = () =>{
        setOpen(false)
    }

    const serialCallback = (value) =>{
        let key = serials.length + 1
        setSerials([...serials, {key, serial: value}])
    }

    const serialChangeCallback = (clone) =>{
       setSerials(clone);
    }

    const deleteItemsCallback = (selected) =>{
        loadingCallback(true);
        let payload = [];
        let selectedProducts = props.products.filter((product)=>{
            return selected.includes(product.productName)
        })

        for (let i = 0; i < selectedProducts.length; i++){
            payload.push(selectedProducts[i].productId)
        }

        axios.post(process.env.DELETE_PRODUCTS, payload)
        .then((response)=>{
            //props.deleteCategory(selected)
            mutate(process.env.PRODUCTS_API)
            loadingCallback(false);
        })
        .catch((error)=>{
            alert("There was an error")
            loadingCallback(false);
        })

    }

    const imageSource = (name) =>{
        let foundProduct = props.products.find((product)=>{
            return product.productName === name
        })

        if (!foundProduct.attachmentLink){
            return '/default-store.jpg'
        }

        return foundProduct.attachmentLink;
    }
    
    const generateCells = (row, labelId) =>{
        var cells = [];
        var count = 1;
        for (var cell in row){
            
            if (count === 1){
                cells.push(      
                    <TableCell 
                        //style={{width: "100%"}}
                        classes={{root: classes.tableCell}} 
                        component="th" 
                        id={labelId} 
                        scope="row"
                        key={row[cell]} 
                    >
                        <div className={classes.nameCellDiv}>
                            <div className={classes.imageDiv}>
                                {
                                    isLoading ?
                                    <Skeleton width={50} height={50} /> :
                                    <img
                                    src={imageSource(row.name)}
                                    alt={`${row[cell]}'s avatar`}
                                    />
                                }                                   
                            </div>
                            <div className={classes.nameCell}>
                                {
                                    isLoading ?
                                    <Skeleton count={1} /> :
                                    row[cell]
                                }   
                            </div>
                        </div>
                    </TableCell>          
                )
            } 
            else {
                cells.push(
                    <TableCell 
                    classes={{root: classes.tableCell}}  
                    align="left"
                    key={row[cell]} 
                    >
                        {
                            isLoading ?
                            <Skeleton count={1} /> :
                            row[cell]
                        }
                    </TableCell>          
                )
            }

            count++;
            
        }
        return cells
    }


    return(
       <SkeletonTheme color="#E0E0E0" highlightColor="#444">
           <ProductDialog
            data={editable}
            open={open}
            closeCallback={closeCallback}
            serials={serials}
            serialCallback={serialCallback}
            serialChangeCallback={serialChangeCallback}
            categories={props.categories}
            category={category}
            products={props.products}
            setCategoryCallback={setCategoryCallback}
           />
            <SkeletonTableBackbone
            enableCheckBoxPading
            enableEmptyRows
            enableEditing
            isLoading={isLoading}
            generateCellsCallback={generateCells}
            headRow={headerColumns}
            bodyRows={data}
            deleteItemsCallback={deleteItemsCallback}
            editCallback={editCallback}
            title="Products"
            /> 
       </SkeletonTheme>
    )
}

ProductTable.propTypes={
    data: PropTypes.arrayOf(PropTypes.shape({
        name: PropTypes.string,
        cost: PropTypes.number,
        price: PropTypes.number,
        category: PropTypes.string,
        date: PropTypes.string,
        quantity: PropTypes.number
    })),
}