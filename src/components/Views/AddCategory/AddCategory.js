import useStyles from './addCategory-jss';
import Button from '@material-ui/core/Button';
import React from 'react';
import Card from '@material-ui/core/Card';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import { useTheme } from '@material-ui/core/styles';
import Snackbar from '@material-ui/core/Snackbar';
import Alert from '@material-ui/lab/Alert';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import { mutate } from 'swr';
import axios from 'axios';
import { BoxLoading } from 'react-loadingg';
import Backdrop from '@material-ui/core/Backdrop';

export default function AddCategory(props){
    const {
        prevCallback
    } = props
    const theme = useTheme();
    const classes = useStyles(theme);
    const [open, setOpen] = React.useState(false);
    const [errOpen, setErrOpen] = React.useState(false);
    const [successOpen, setSuccessOpen] = React.useState(false);
    const [isAdding, setIsAdding] = React.useState(false);
    const [errors, setErrors] = React.useState({
        name: false,
        description: false
    })

    // Refs
    const formRef = React.useRef(null);
    const nameRef = React.useRef(null);
   
    const handleClose = () =>{ setOpen(false)}
    const handleErrClose = () =>{setErrOpen(false)}
    const handleSuccessClose = ()=>{ setSuccessOpen(false)}
    const handleBack = () => {prevCallback()}
    

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

    const handleSubmit = (e) =>{
        e.preventDefault();
        setIsAdding(true);
        const val = validateInputs();

        if (val){
            const form = formRef.current
            const fdata = new FormData(form);
            let payload = {
                categoryName: fdata.get("name"),
                categoryDescription: fdata.get("description")
            }

            axios({
                method: 'post',
                url: process.env.CATEGORY_API,
                data: payload,
                })
            .then((response)=>{
                mutate(process.env.CATEGORY_API);
                setIsAdding(false)
                setSuccessOpen(true);
            })
            .catch((err)=>{
                setIsAdding(false);
                setErrOpen(true);
            })
        } else{
            setIsAdding(false)
            setOpen(true)
        }
    
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
                   An error occured while adding the category
                </Alert>
            </Snackbar>
            <Snackbar
                open={successOpen}
                anchorOrigin={{vertical: "bottom", horizontal: "right"}}
                onClose={handleSuccessClose}
            >
                <Alert severity="success" onClose={handleSuccessClose}>
                   Category successfully added
                </Alert>
            </Snackbar>
            
        <div className={classes.container} >
            <Button size="small" onClick={handleBack} classes={{root:classes.previousButton}}>
                <KeyboardArrowLeft style={{color:"white"}} />
                <h4>Categories</h4>
            </Button>
            <Grid container spacing={2} justify="center">
                
                <Grid xs={10} item>
                    <div style={{display: "flex", justifyContent: "space-between"}}>
                        <div className={classes.pageTitle}>
                            Add Category
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
                                <Card classes={{root: classes.catergoryCard}}> 
                                    <form ref={formRef} noValidate >

                                        <Grid container spacing={2}>
                                            <Grid item xs={12}>
                                                <TextField
                                                required
                                                error={errors.name}
                                                classes={{root: classes.textField}}
                                                id="category-name"
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
                                            
                                            <Grid item xs={12}>
                                                <TextField
                                                    required
                                                    error={errors.description}
                                                    classes={{root: classes.textField}}
                                                    id="category-description"
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


                        </div>
                </Grid>

            </Grid>
        </div>
        </React.Fragment>
    )
}