import useStyles from './addProduct-jss';
import Button from '@material-ui/core/Button';
import InputAdornment from '@material-ui/core/InputAdornment';
import React from 'react';
import Card from '@material-ui/core/Card';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import { useTheme } from '@material-ui/core/styles';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import CloseIcon from '@material-ui/icons/Close';
import Typography from '@material-ui/core/Typography';
import AddIcon from '@material-ui/icons/Add';
import Tooltip from '@material-ui/core/Tooltip';
import Chip from '@material-ui/core/Chip';
import Divider from '@material-ui/core/Divider';
import SerialTableBackbone from '../../Tables/TableBackbone/SerialTableBackbone';
import TableCell from '@material-ui/core/TableCell';
import Snackbar from '@material-ui/core/Snackbar';
import Alert from '@material-ui/lab/Alert';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';

export default function AddProduct(props){
    const {
        prevCallback
    } = props
    const theme = useTheme();
    const classes = useStyles(theme);
    const [serials, setSerials] = React.useState([]);
    const [open, setOpen] = React.useState(false);
    const [errors, setErrors] = React.useState({
        name: false,
        category: false,
        serial: false,
        price: false,
        description: false
    })

    // Refs
    const formRef = React.useRef(null);
    const nameRef = React.useRef(null);
   
    const handleClose = () =>{ setOpen(false)}
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
        setOpen(true)

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

    const handleSubmit = (e) =>{
        e.preventDefault();
        validateInputs();
        const form = formRef.current
        const fdata = new FormData(form);
        const name = fdata.get("name")
        
        //alert(JSON.stringify(...fdata));
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
            <Snackbar
                open={open}
                anchorOrigin={{vertical: "top", horizontal: "right"}}
                onClose={handleClose}
            >
                <Alert severity="error" onClose={handleClose}>
                    Please fill in all the required fields
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
                                                error={errors.name}
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
                                                    name: "name",
                                                    classes:{root:classes.inputField}
                                                }}
                                                inputRef={nameRef}
                                                onChange={unhighlight}
                                                />
                                            </Grid>
                                            <Grid item xs={12} sm={12} md={6}>
                                                <TextField
                                                    required
                                                    error={errors.category}
                                                    classes={{root: classes.textField}}
                                                    id="product-category"
                                                    variant="outlined"
                                                    label="Category"
                                                    fullWidth
                                                    margin="dense"
                                                    InputLabelProps={{
                                                        shrink: true,
                                                        classes:{root:classes.inputLabel}
                                                    }}
                                                    InputProps={{
                                                        name: "category",
                                                        classes:{root:classes.inputField}
                                                    }}
                                                    onChange={unhighlight}
                                                />
                                            </Grid>
                                            <Grid item xs={12} sm={12} md={6}>
                                                <TextField
                                                    required
                                                    error={errors.serial}
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
                                                        name: "serial",
                                                        classes:{root:classes.inputField}
                                                    }}
                                                    onChange={handleChange}
                                                />
                                            </Grid>
                                            <Grid item xs={12} sm={6}>
                                                <TextField
                                                    required
                                                    error={errors.price}
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
                                                        name: "price",
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
                                                    label="Price"
                                                    type="file"
                                                    fullWidth
                                                    margin="dense"
                                                    InputLabelProps={{
                                                        shrink: true,
                                                        classes:{root:classes.inputLabel}
                                                    }}
                                                    InputProps={{
                                                        name: "image",
                                                        classes:{root:classes.inputField},
                                                    }}
                                                    onChange={unhighlight}
                                                />  
                                            </Grid>
                                            <Grid item xs={12}>
                                                <TextField
                                                    required
                                                    error={errors.description}
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
                                                        name: "description",
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