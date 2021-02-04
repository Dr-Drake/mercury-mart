import React from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import Dialog from '@material-ui/core/Dialog';
import Grid from '@material-ui/core/Grid';
import MenuItem from '@material-ui/core/Menu'
import { useTheme } from '@material-ui/core/styles';
import useStyles from './productDialog-jss';
import TextField from '@material-ui/core/TextField';
import { BoxLoading } from 'react-loadingg';
import Backdrop from '@material-ui/core/Backdrop';
import Snackbar from '@material-ui/core/Snackbar';
import Alert from '@material-ui/lab/Alert';
import InputAdornment from '@material-ui/core/InputAdornment';
import TableCell from '@material-ui/core/TableCell';
import SerialTableBackbone from '../../Tables/TableBackbone/SerialTableBackbone';
import axios from 'axios';
import { mutate } from 'swr';

export default function ProductDialog(props) {
    const {
        data,
        serials,
        serialCallback,
        serialChangeCallback,
        open,
        closeCallback,
        categories,
        category,
        setCategoryCallback,
        successCallback,
    } = props
    //alert(JSON.stringify(categories))
    const theme = useTheme();
    const classes = useStyles(theme);
    const [isEditing, setIsEditing] = React.useState(false);
    const [valOpen, setValOpen] = React.useState(false);
    const [errOpen, setErrOpen] = React.useState(false);
    const [successOpen, setSuccessOpen] = React.useState(false);

    const [formInputs, setFormInputs] = React.useState({
        productName: null,
        categoryId: null,
        productSerialNumber: null,
        productPrice: null,
        productCost: null,
        productDescription: null,
        attachmentFileName: null,

    })
    const [errors, setErrors] = React.useState({
        productName: false,
        categoryId: false,
        productSerialNumber: false,
        productPrice: false,
        productCost: false,
        productDescription: false
    })

    // Refs
    const formRef = React.useRef(null);

    const validationClose = () =>{ setValOpen(false)}
    const handleErrClose = () =>{setErrOpen(false)}
    const handleSuccessClose = ()=>{ setSuccessOpen(false)}

    const priceAdornment = (
        <InputAdornment classes={{root:classes.adornment}}>
            <div style={{color: "white"}} >₦</div>
        </InputAdornment>
    )

    const handleClose = () =>{
        closeCallback();
    }

    const handleExited = () =>{
        setFormInputs({
            productName: null,
            categoryId: null,
            productSerialNumber: null,
            productPrice: null,
            productCost: null,
            productDescription: null,
            attachmentFileName: null,
        })
        setErrors({
            productName: false,
            categoryId: false,
            productSerialNumber: false,
            productPrice: false,
            productCost: false,
            productDescription: false
        })
    }

    const addSerialCallback = (value)=>{
        serialCallback(value);
    }

    const validateInputs = () =>{
        const form = formRef.current
        const fdata = new FormData(form);
        let count = 0;
        let clone = {}
        for (let [key, value] of fdata){
            if (/^\s*$/.test(value)){
                count ++;
                clone[key] = true
            } else{
                clone[key] = false
            }
        }
        setErrors(clone)

        if (count > 0){
            return false
        } else{
            return true
        }
        
    }

    const unhighlight = (e) =>{
        const { name } = e.target
        if (errors[name]){
            setErrors((prevState) => ({
                ...prevState,
                [name]: false
            }))
        }
    }

    const handleFieldChange = (e) =>{
        unhighlight(e);
        const { name } = e.target
        setFormInputs((prevState)=>({
            ...prevState,
            [name]: e.target.value
        }))
    }

    const handleChange = (e) =>{
        unhighlight(e);
        let clone = [...serials];
        clone[0] = {key: 1, serial: e.target.value}
        serialChangeCallback(clone);
        
        const { name } = e.target
        setFormInputs((prevState)=>({
            ...prevState,
            [name]: e.target.value
        }))
    }

    const handleCategoryChange = (e) =>{
        unhighlight(e);
        setCategoryCallback(e.target.value);
    }

    const editProducts = async (fdata)=>{

        let responses = [];
        let serNums = [];
        let prodSerNums = [];
        let url;

        try{

            for (let i = 0; i < props.products.length; i++){
                let product = props.products[i];
                prodSerNums.push(product.productSerialNumber)
            }
            for (let k = 0; k < serials.length; k++){
                let serial = serials[k];

                if (prodSerNums.includes(serial.serial)){
                    let product = props.products.find((prod)=>{
                        return prod.productSerialNumber === serial.serial
                    })
                    url = process.env.PRODUCTS_API + `/${product.productId}`
                    fdata.set('productSerialNumber', product.productSerialNumber);
                    fdata.set('productId', product.productId);
                    let response = await axios({
                        method: 'put',
                        url: url,
                        data: fdata,
                        headers: {'Content-Type': 'multipart/form-data'}
                    })

                    if (response){
                        responses.push(response.data)
                    }
                } else{
                    fdata.set('productSerialNumber', serial.serial);
                    let response = await axios({
                        method: 'post',
                        url: process.env.PRODUCTS_API,
                        data: fdata,
                        headers: {'Content-Type': 'multipart/form-data'}
                    })
                    if (response){
                        responses.push(response.data)
                    }
                }
            }

            let resolvedResponses = await Promise.all(responses);
            if (resolvedResponses){
                mutate(process.env.PRODUCTS_API);
                setIsEditing(false)
                closeCallback();
                setSuccessOpen(true);
            }

        }catch(err){
            console.log(err)
            setIsEditing(false)
            setErrOpen(true);
        }
    }

    const handleSubmit = (e) =>{
        e.preventDefault();
        setIsEditing(true);
        const val = validateInputs();

        if (val){
            const form = formRef.current
            const fdata = new FormData(form);

            editProducts(fdata);
        } else{
            setIsEditing(false)
            setValOpen(true)
        }
    
    }

    const headerColumns = [
        { id: 'number', numeric: false, disablePadding: false, label: 'n/o' },
        { id: 'serial', numeric: false, disablePadding: false, label: 'Serial numbers' },
    ]

    const generateCells = (row, label) =>{
        var cells = [];
        var count = 1;

        for (let cell in row){
            if (count === 1){
                cells.push(
                    <TableCell 
                        style={{width: "10%"}} 
                        classes={{root:classes.tablecell}}
                        key={label}
                    >
                        {row[cell]}
                    </TableCell>
                )
                
            } else {
                cells.push(
                    <TableCell classes={{root: classes.tablecell}}>
                        {row[cell]}
                    </TableCell>
                )
            }

            count++;
        }

        return cells;

    }

    return (
        <React.Fragment>
            <Backdrop className={classes.backdrop} open={isEditing} >
                <BoxLoading />
            </Backdrop>
            <Snackbar
                open={valOpen}
                anchorOrigin={{vertical: "top", horizontal: "right"}}
                onClose={handleClose}
            >
                <Alert severity="error" onClose={validationClose}>
                    Please fill in all the required fields
                </Alert>
            </Snackbar>
            <Snackbar
                open={errOpen}
                anchorOrigin={{vertical: "top", horizontal: "right"}}
                onClose={handleErrClose}
            >
                <Alert severity="error" onClose={handleErrClose}>
                   An error occured while editing the product
                </Alert>
            </Snackbar>
            <Snackbar
                open={successOpen}
                anchorOrigin={{vertical: "bottom", horizontal: "right"}}
                onClose={handleSuccessClose}
            >
                <Alert severity="success" onClose={handleSuccessClose}>
                   Product successfully edited
                </Alert>
            </Snackbar>
        
            <Dialog 
            //onClose={handleClose}
            fullWidth 
            aria-labelledby="product-dialog-title" 
            open={open}
            onExited={handleExited}
            classes={{paper:classes.paper}}
            >
                <DialogTitle 
                    id="product-dialog-title"
                    classes={{root: classes.dialogTitle}}
                >
                    Edit Product
                </DialogTitle>
                <DialogContent>
                <div className={classes.main}>
                    <div className={classes.grid1} >
                        <form ref={formRef} noValidate >
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <TextField
                                required
                                value={
                                    formInputs.productName || formInputs.productName === '' ? 
                                    formInputs.productName : data.productName
                                }
                                error={errors.productName}
                                classes={{root: classes.textField}}
                                id="product-name-edit"
                                variant="outlined"
                                label="Name"
                                fullWidth
                                margin="dense"
                                InputLabelProps={{
                                    shrink: true,
                                    classes:{root:classes.inputLabel}
                                }}
                                InputProps={{
                                    name: "productName",
                                    classes:{root:classes.inputField}
                                }}
                                onChange={handleFieldChange}
                                />
                            </Grid>
                            <Grid item xs={12} sm={12} md={6}>
                                <TextField
                                    required
                                    value={
                                        formInputs.productSerialNumber || formInputs.productSerialNumber === '' ? 
                                        formInputs.productSerialNumber : data.productSerialNumber
                                    }
                                    error={errors.productSerialNumber}
                                    classes={{root: classes.textField}}
                                    id="product-serial-number-edit"
                                    variant="outlined"
                                    label="Serial Number"
                                    fullWidth
                                    margin="dense"
                                    InputLabelProps={{
                                        shrink: true,
                                        classes:{root:classes.inputLabel}
                                    }}
                                    InputProps={{
                                        name: "productSerialNumber",
                                        classes:{root:classes.inputField}
                                    }}
                                    onChange={handleChange}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6} md={6}>
                                <TextField
                                    required
                                    error={errors.categoryId}
                                    classes={{root: classes.textField}}
                                    id="product-category-edit"
                                    select
                                    fullWidth
                                    margin="dense"
                                    label="Category"
                                    value={category}
                                    onChange={handleCategoryChange}
                                    helperText="Please select a category"
                                    variant="outlined"
                                    InputLabelProps={{
                                        shrink: true,
                                        classes:{root:classes.inputLabel}
                                    }}
                                    InputProps={{
                                        name: "categoryId",
                                        classes:{root:classes.inputField}
                                    }}
                                    FormHelperTextProps={{
                                        classes:{root: classes.helperText}
                                    }}
                                    SelectProps={{
                                        classes: {icon: classes.selectIcon},
                                        native: true
                                    }}
                                >
                                    { categories.length > 0 ? 
                                    categories.map((category) => (
                                        <option 
                                        key={category.categoryId} 
                                        value={category.categoryId}
                                        className={classes.options}
                                        >
                                            {category.categoryName}
                                        </option>
                                        
                                    )) :
                                    <option value={null}>
                                        {''}
                                    </option>
                                    }
                                </TextField>
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    required
                                    value={
                                        formInputs.productCost ? 
                                        formInputs.productCost : data.productCost
                                    }
                                    error={errors.productCost}
                                    classes={{root: classes.textField}}
                                    id="product-cost-edit"
                                    variant="outlined"
                                    label="Cost"
                                    type="number"
                                    fullWidth
                                    margin="dense"
                                    InputLabelProps={{
                                        shrink: true,
                                        classes:{root:classes.inputLabel}
                                    }}
                                    InputProps={{
                                        startAdornment: priceAdornment,
                                        name: "productCost",
                                        classes:{root:classes.inputField}
                                    }}
                                    onChange={handleFieldChange}
                                />  
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    required
                                    value={
                                        formInputs.productPrice ? 
                                        formInputs.productPrice : data.productPrice
                                    }
                                    error={errors.productPrice}
                                    classes={{root: classes.textField}}
                                    id="product-price-edit"
                                    variant="outlined"
                                    label="Price"
                                    type="number"
                                    fullWidth
                                    margin="dense"
                                    InputLabelProps={{
                                        shrink: true,
                                        classes:{root:classes.inputLabel}
                                    }}
                                    InputProps={{
                                        startAdornment: priceAdornment,
                                        name: "productPrice",
                                        classes:{root:classes.inputField}
                                    }}
                                    onChange={handleFieldChange}
                                />  
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    classes={{root: classes.textField}}
                                    id="product-image-edit"
                                    variant="outlined"
                                    label="Image"
                                    type="file"
                                    name="attachmentFile"
                                    fullWidth
                                    margin="dense"
                                    InputLabelProps={{
                                        shrink: true,
                                        classes:{root:classes.inputLabel}
                                    }}
                                    InputProps={{
                                        classes:{root:classes.inputField},
                                    }}
                                    onChange={unhighlight}
                                />  
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    required
                                    value={
                                        formInputs.productDescription || formInputs.productDescription === '' ? 
                                        formInputs.productDescription : data.productDescription
                                    }
                                    error={errors.productDescription}
                                    classes={{root: classes.textField}}
                                    id="product-description-edit"
                                    variant="outlined"
                                    label="Description"
                                    multiline
                                    rows={6}
                                    fullWidth
                                    margin="dense"
                                    InputLabelProps={{
                                        shrink: true,
                                        classes:{root:classes.inputLabel}
                                    }}
                                    InputProps={{
                                        name: "productDescription",
                                        classes:{root:classes.inputField},
                                    }}
                                    onChange={handleFieldChange}
                                />
                            </Grid>
                        </Grid>
                        </form>
                    </div>
                    <div className={classes.grid2}>
                        <SerialTableBackbone 
                            headRow={headerColumns}
                            bodyRows={serials}
                            generateCellsCallback={generateCells}
                            rowIndentifier="serial"
                            title="Serial number variants"
                            addSerialCallback={addSerialCallback}
                        />
                    </div>


                </div>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} classes={{root:classes.actionButtons}} >
                        Cancel
                    </Button>
                    <Button onClick={handleSubmit} classes={{root:classes.actionButtons}} >
                        Save
                    </Button>
                </DialogActions>
            
            </Dialog>
        </React.Fragment>
    );
}

ProductDialog.propTypes = {
    data: PropTypes.object,
    open: PropTypes.bool.isRequired,
    successCallback: PropTypes.func,
    closeCallback: PropTypes.func,
    serials: PropTypes.arrayOf(PropTypes.shape({
        key: PropTypes.number.isRequired,
        serial: PropTypes.string.isRequired
    })),
    serialCallback: PropTypes.func,
    serialChangeCallback: PropTypes.func,
    categories: PropTypes.arrayOf(PropTypes.object)
};

