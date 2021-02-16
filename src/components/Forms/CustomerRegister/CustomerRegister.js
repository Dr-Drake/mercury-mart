import useStyles from './customerRegister-jss';
import Button from '@material-ui/core/Button';
import InputAdornment from '@material-ui/core/InputAdornment';
import React from 'react';
import Card from '@material-ui/core/Card';
import TextField from '@material-ui/core/TextField';
import { useTheme } from '@material-ui/core/styles';
import Snackbar from '@material-ui/core/Snackbar';
import Alert from '@material-ui/lab/Alert';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import IconButton from '@material-ui/core/IconButton';
import { BoxLoading } from 'react-loadingg';
import Backdrop from '@material-ui/core/Backdrop';
import { useRouter } from "next/router";
import { useCookies } from "react-cookie";
import axios from 'axios';
import jwt from "jsonwebtoken";
import RedirectContext from '../../../contexts/RedirectContext';

export default function CustomerRegister(props){
    const router = useRouter();
    const context = React.useContext(RedirectContext);

    const theme = useTheme();
    const classes = useStyles(theme);
    const [open, setOpen] = React.useState(false);
    const [errOpen, setErrOpen] = React.useState(false);
    const [warnOpen, setWarnOpen] = React.useState(false);
    const [cookies, setCookie] = useCookies(["mercmart_customer"]);
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
    const handleWarnClose = ()=>{ setWarnOpen(false)}

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

    const RegisterCustomer = async (registerPayload, loginPayload) =>{
        try{
            let response =  await axios.post(process.env.CUSTOMER_REGISTER, registerPayload);

            if (response){
                console.log("1 done")
                let response2 = await axios.post(process.env.ADMIN_AUTH, loginPayload);

                if (response2){
                    const decoded = jwt.decode(response2.data.objectValue.token);
                    var cookieOptions = {
                        expires: new Date(decoded.exp * 1000) // in milliseconds
                    }
                    setCookie("mercmart_customer", response2.data.objectValue.token, cookieOptions);
                    setCookie("mercmart_showRemember", context.isRemembered);
                    router.push(context.redirect_uri)
                }
            }
        }catch(err){

            if (err.response){
                if (err.response.data.statusCode === 7){
                    setIsAdding(false);
                    setWarnOpen(true);
                    return
                }
            }
            console.log(err)
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
            let payload = {
                fullName: fdata.get("fullName"),
                emailAddress: fdata.get("emailAddress"),
                address: fdata.get("address"),
                phoneNumber: fdata.get("phoneNumber"),
                password: fdata.get("password"),
            }

            let payload2 = {
                emailAddress: fdata.get("emailAddress"),
                password: fdata.get("password"),
            }

            RegisterCustomer(payload, payload2);

            
        } else{
            setIsAdding(false)
            setOpen(true)
        } 
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
                open={warnOpen}
                anchorOrigin={{vertical: "top", horizontal: "right"}}
                onClose={handleErrClose}
            >
                <Alert severity="warning" onClose={handleWarnClose}>
                   Looks like this account already exists
                </Alert>
            </Snackbar>
            <Snackbar
                open={errOpen}
                anchorOrigin={{vertical: "top", horizontal: "right"}}
                onClose={handleErrClose}
            >
                <Alert severity="error" onClose={handleErrClose}>
                   An error occured during the registration
                </Alert>
            </Snackbar>
            <Card classes={{root: classes.card}} >
                <CardHeader
                    title="Create account"
                    classes={{root:classes.cardHeader}}
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