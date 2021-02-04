import useStyles from './addProduct-jss';
import Button from '@material-ui/core/Button';
import InputAdornment from '@material-ui/core/InputAdornment';
import React from 'react';
import Card from '@material-ui/core/Card';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import { useTheme } from '@material-ui/core/styles';
import SerialTableBackbone from '../../Tables/TableBackbone/SerialTableBackbone';
import TableCell from '@material-ui/core/TableCell';
import Snackbar from '@material-ui/core/Snackbar';
import Alert from '@material-ui/lab/Alert';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import { BoxLoading } from 'react-loadingg';
import Backdrop from '@material-ui/core/Backdrop';
import MenuItem from '@material-ui/core/MenuItem';
import axios from 'axios';
import { mutate } from 'swr'

export default function AddProduct(props){
    const {
        prevCallback,
        categories
    } = props
    const theme = useTheme();
    const classes = useStyles(theme);
    const [serials, setSerials] = React.useState([]);
    const [open, setOpen] = React.useState(false);
    const [errOpen, setErrOpen] = React.useState(false);
    const [successOpen, setSuccessOpen] = React.useState(false);
    const [isAdding, setIsAdding] = React.useState(false);
    const [category, setCategory] = React.useState(categories.length > 0 ? categories[0].categoryId : null)
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
    const nameRef = React.useRef(null);
   
    const handleClose = () =>{ setOpen(false)}
    const handleErrClose = () =>{setErrOpen(false)}
    const handleSuccessClose = ()=>{ setSuccessOpen(false)}
    const handleBack = () => {prevCallback()}
    
    const addSerialCallback = (value)=>{
        let key = serials.length + 1
        setSerials([...serials, {key, serial: value}])
    }

    const deleteItemsCallback = (selected) =>{
        const filtered = serials.filter((serial)=>{
            return !(selected.includes(serial.serial))
        })

        const formatted = filtered.map((item, index)=>{
            return {key: index+1, serial:item.serial}
        })

        setSerials(formatted);
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

    const handleChange = (e) =>{
        unhighlight(e);
        let clone = [...serials];
        clone[0] = {key: 1, serial: e.target.value}
        setSerials(clone)
    }

    const handleCategoryChange = (e) =>{
        unhighlight(e);
        setCategory(e.target.value);
    }

    const addProducts = async (fdata)=>{
        let responses = [];
        try{
            for (let i = 0; i < serials.length; i++){
                let serial = serials[i];
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

            let resolvedResponses = await Promise.all(responses);
            if (resolvedResponses){
                mutate(process.env.PRODUCTS_API);
                setIsAdding(false)
                setSuccessOpen(true);
            }

        }catch(err){
            setIsAdding(false);
            setErrOpen(true);
        }
    }

    const handleSubmit = (e) =>{
        e.preventDefault();
        setIsAdding(true);
        const val = validateInputs();

        if (val){
            const form = formRef.current
            const fdata = new FormData(form);

            addProducts(fdata);
        } else{
            setIsAdding(false)
            setOpen(true)
        }
    
    }

    const priceAdornment = (
        <InputAdornment classes={{root:classes.adornment}}>
            <div style={{color: "white"}} >₦</div>
        </InputAdornment>
    )


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
                    <TableCell style={{width: "10%"}} classes={{root:classes.tablecell}}>
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
    

    return(
        <React.Fragment>
            <Backdrop className={classes.backdrop} open={isAdding} >
                <BoxLoading />
            </Backdrop>
            <Snackbar
                open={open}
                anchorOrigin={{vertical: "top", horizontal: "right"}}
                onClose={handleClose}
            >
                <Alert severity="error" onClose={handleClose}>
                    Please fill in all the required fields
                </Alert>
            </Snackbar>
            <Snackbar
                open={errOpen}
                anchorOrigin={{vertical: "top", horizontal: "right"}}
                onClose={handleErrClose}
            >
                <Alert severity="error" onClose={handleErrClose}>
                   An error occured while adding the product
                </Alert>
            </Snackbar>
            <Snackbar
                open={successOpen}
                anchorOrigin={{vertical: "bottom", horizontal: "right"}}
                onClose={handleSuccessClose}
            >
                <Alert severity="success" onClose={handleSuccessClose}>
                   Product successfully added
                </Alert>
            </Snackbar>
            
        <div className={classes.container} >
            <Button size="small" onClick={handleBack} classes={{root:classes.previousButton}}>
                <KeyboardArrowLeft style={{color:"white"}} />
                <h4>Products</h4>
            </Button>
            <Grid container spacing={2} justify="center">
                
                <Grid xs={10} item>
                    <div style={{display: "flex", justifyContent: "space-between"}}>
                        <div className={classes.pageTitle}>
                            Add product
                        </div>
                        <div>
                            <Button variant="contained" color="primary" onClick={handleSubmit}>
                                save
                            </Button>
                        </div>
                    </div>
                </Grid>

                <Grid xs={10} item>
                    <div className={classes.main}>
                            <div className={classes.grid1} >
                                <Card classes={{root: classes.card}}> 
                                    <form ref={formRef} noValidate >

                                        <Grid container spacing={2}>
                                            <Grid item xs={12}>
                                                <TextField
                                                required
                                                error={errors.productName}
                                                classes={{root: classes.textField}}
                                                id="product-name"
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
                                                inputRef={nameRef}
                                                onChange={unhighlight}
                                                />
                                            </Grid>
                                            <Grid item xs={12} sm={12} md={6}>
                                                <TextField
                                                    required
                                                    error={errors.productSerialNumber}
                                                    classes={{root: classes.textField}}
                                                    id="product-serial-number"
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
                                                    error={errors.category}
                                                    classes={{root: classes.textField}}
                                                    id="product-category"
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
                                                        classes: {icon: classes.selectIcon}
                                                    }}
                                                >
                                                    { categories.length > 0 ? 
                                                    categories.map((category) => (
                                                        <MenuItem key={category.categoryId} value={category.categoryId}>
                                                            {category.categoryName}
                                                        </MenuItem>
                                                    )) :
                                                    <MenuItem value={null}>
                                                        {''}
                                                    </MenuItem>
                                                    }
                                                </TextField>
                                            </Grid>
                                            <Grid item xs={12} sm={6}>
                                                <TextField
                                                    required
                                                    error={errors.productCost}
                                                    classes={{root: classes.textField}}
                                                    id="product-cost"
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
                                                    onChange={unhighlight}
                                                />  
                                            </Grid>
                                            <Grid item xs={12} sm={6}>
                                                <TextField
                                                    required
                                                    error={errors.productPrice}
                                                    classes={{root: classes.textField}}
                                                    id="product-price"
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
                                                    onChange={unhighlight}
                                                />  
                                            </Grid>
                                            <Grid item xs={12} sm={6}>
                                                <TextField
                                                    classes={{root: classes.textField}}
                                                    id="product-image"
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
                                                    error={errors.productDescription}
                                                    classes={{root: classes.textField}}
                                                    id="product-description"
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
                                                    onChange={unhighlight}
                                                />
                                            </Grid>
                                        </Grid>
                                    </form>
                                </Card>

                            </div>
                            <div className={classes.grid2}>
                                <SerialTableBackbone 
                                    headRow={headerColumns}
                                    bodyRows={serials}
                                    generateCellsCallback={generateCells}
                                    enableCheckBoxPading
                                    rowIndentifier="serial"
                                    title="Serial number variants"
                                    addSerialCallback={addSerialCallback}
                                    deleteItemsCallback={deleteItemsCallback}
                                />
                            </div>


                        </div>
                </Grid>

            </Grid>
        </div>
        </React.Fragment>
    )
}