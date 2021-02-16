import useStyles from './customerRegister-jss';
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
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import IconButton from '@material-ui/core/IconButton';
import { BoxLoading } from 'react-loadingg';
import Backdrop from '@material-ui/core/Backdrop';
import MenuItem from '@material-ui/core/MenuItem';
import axios from 'axios';
import { mutate } from 'swr'

export default function CustomerRegister(props){
    const {
        prevCallback,
        categories
    } = props
    const theme = useTheme();
    const classes = useStyles(theme);
    const [open, setOpen] = React.useState(false);
    const [errOpen, setErrOpen] = React.useState(false);
    const [successOpen, setSuccessOpen] = React.useState(false);
    const [isAdding, setIsAdding] = React.useState(false);
    const [showPassword, setShowPassword] = React.useState(false);
    const [errors, setErrors] = React.useState({
        fullName: false,
        emailAddress: false,
        address: false,
        password: false,
        phoneNumber: false,
    })

    // Refs
    const formRef = React.useRef(null);
    const nameRef = React.useRef(null);
   
    const handleClose = () =>{ setOpen(false)}
    const handleErrClose = () =>{setErrOpen(false)}
    const handleSuccessClose = ()=>{ setSuccessOpen(false)}

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
            alert("Feature not built yet, sorry")
        } else{
            setOpen(true);
        }
        /*
        if (val){
            const form = formRef.current
            const fdata = new FormData(form);

            addProducts(fdata);
        } else{
            setIsAdding(false)
            setOpen(true)
        }*/
    
    }

    const passwordAdornment = (
        <InputAdornment position="end">
            <IconButton ariaaria-label="toggle password visibility"
              onClick={()=> setShowPassword(!showPassword)}
              onMouseDown={(event)=> event.preventDefault()}>
                  {showPassword ? <Visibility /> : <VisibilityOff />}
              </IconButton>
        </InputAdornment>
    )
    

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
            <Card classes={{root: classes.card}} >
                <CardHeader
                    title="Create account"
                />
                <CardContent>
                    <form ref={formRef} noValidate >
                        <div className={classes.field}>
                        <TextField
                                required
                                error={errors.fullName}
                                classes={{root: classes.textField}}
                                id="customer-name"
                                variant="outlined"
                                label="Full name"
                                fullWidth
                                margin="dense"
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                InputProps={{
                                    name: "fullName",
                                }}
                                inputRef={nameRef}
                                onChange={unhighlight}
                            /> 
                        </div>
                        <div className={classes.field}> 
                        <TextField
                                required
                                error={errors.emailAddress}
                                classes={{root: classes.textField}}
                                id="customer-email"
                                variant="outlined"
                                label="Email"
                                fullWidth
                                margin="dense"
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                InputProps={{
                                    name: "emailAddress",
                                }}
                                onChange={unhighlight}
                            /> 
                        </div>
                        <div className={classes.field}>
                            <TextField
                                required
                                error={errors.phoneNumber}
                                classes={{root: classes.textField}}
                                id="customer-phone-number"
                                variant="outlined"
                                label="Phone number"
                                fullWidth
                                margin="dense"
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                InputProps={{
                                    name: "phoneNumber",
                                }}
                                onChange={unhighlight}
                            /> 
                        </div>
                        <div className={classes.field}>
                            <TextField
                                required
                                error={errors.address}
                                classes={{root: classes.textField}}
                                id="customer-address"
                                variant="outlined"
                                label="Address"
                                multiline
                                rows={6}
                                fullWidth
                                margin="dense"
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                InputProps={{
                                    name: "address",
                                }}
                                onChange={unhighlight}
                            />
                        </div>
                        <div className={classes.field}>
                            <TextField 
                                required
                                error={errors.password}
                                id="customer-password"
                                variant="outlined"
                                label="Password"
                                fullWidth
                                margin="dense" 
                                type={showPassword ? "text" : "password"} 
                                onChange={unhighlight}
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                inputProps={{
                                    name: "password"
                                }}
                                InputProps={{
                                    endAdornment: passwordAdornment
                                }}
                            />
                        </div>
                        <div>
                            <Button 
                            variant="contained"
                            type="submit"  
                            onClick={handleSubmit}
                            classes={{root:classes.submitButton}} 
                            >
                                Create your mercury account
                            </Button>
                        </div>
                    </form>
                </CardContent>
            </Card>
        </React.Fragment>
    )
}