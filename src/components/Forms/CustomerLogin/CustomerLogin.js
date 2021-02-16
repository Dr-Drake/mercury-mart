import useStyles from './customerLogin-jss';
import Button from '@material-ui/core/Button';
import InputAdornment from '@material-ui/core/InputAdornment';
import React, { useContext } from 'react';
import Card from '@material-ui/core/Card';
import TextField from '@material-ui/core/TextField';
import { useTheme } from '@material-ui/core/styles';
import Snackbar from '@material-ui/core/Snackbar';
import Alert from '@material-ui/lab/Alert';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import IconButton from '@material-ui/core/IconButton';
import { BoxLoading } from 'react-loadingg';
import Backdrop from '@material-ui/core/Backdrop';
import { motion } from 'framer-motion';
import { useCookies } from "react-cookie";
import { useRouter } from "next/router";
import axios from 'axios';
import jwt from "jsonwebtoken";
import LoginRedirectContext from '../../../contexts/LoginRedirectContext';

export default function CustomerLogin(props){
    
    const context = useContext(LoginRedirectContext);
    const router = useRouter();
    const theme = useTheme();
    const classes = useStyles(theme);
    const [errOpen, setErrOpen] = React.useState(false);
    const [cookies, setCookie, removeCookie] = useCookies(["mercmart_admin"]);
    const [isLogging, setIsLogging] = React.useState(false);
    const [showPassword, setShowPassword] = React.useState(false);
    const [shake, setShake] = React.useState({
        emailAddress:{},
        password: {}
    });
    const [helperTexts, setHelperTexts] = React.useState({
        emailAddress: "",
        password: "",
    })
    const [errors, setErrors] = React.useState({
        emailAddress: false,
        password: false,
    })
    

    // Refs
    const formRef = React.useRef(null);
    const checkRef = React.useRef(null);

    const handleErrClose = () =>{setErrOpen(false)}

    const validateInputs = () =>{
        const form = formRef.current
        const fdata = new FormData(form);
        let count = 0;
        let clone = {}
        for (let [key, value] of fdata){
            if (/^\s*$/.test(value)){
                count ++;
                clone[key] = true
                setShake((prevState)=>({
                    ...prevState,
                    [key]:{
                        x:[0, -10, 10, 0, -10, 10, 0],
                        transition:{
                            duration: 0.25
                        }
                    }
                }))
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
            setHelperTexts((prevState)=>({
                ...prevState,
                [name]: ""
            }))
            setErrors((prevState) => ({
                ...prevState,
                [name]: false
            }))
        }
    }

    const processLogin = async (payload, isRemembered) =>{
        let cartData = [];

        try{
            let res1 = await axios({
                method: 'post',
                url: process.env.ADMIN_AUTH,
                data: payload,
            })

            if (res1){
                let res2 = await axios({
                    method: 'get',
                    url: process.env.CART_API,
                    headers: {'Authorization': `Bearer ${res1.data.objectValue.token}`}
                }) 

                if (res2){
                    const decoded = jwt.decode(res1.data.objectValue.token);
                    var cookieOptions = {
                        expires: new Date(decoded.exp * 1000) // in milliseconds
                    }
                    const cart = res2.data.objectValue;

                    if (cart.length > 0){
                        for (let i = 0; i < cart.length; i++){
                            cartData.push(cart[i].productName)
                        }
                        removeCookie("cart");
                        setCookie('cart', cartData)
                    }
                    setCookie("mercmart_customer", res1.data.objectValue.token, cookieOptions);
                    setCookie("mercmart_showRemember", isRemembered, cookieOptions);

                    router.push(
                        context.redirect_uri ? context.redirect_uri :
                        "/"
                    )
                }
            }
        }catch(err){
            setIsLogging(false);

            if (err.response){
                if (err.response.data.statusMessage){
                    setErrors({
                        emailAddress: true, password: true
                    })
                    setHelperTexts({
                        emailAddress: "Email address may be incorrect",
                        password: "Password may be incorrect"
                    })
                    return;
                }
            }
            
            setErrOpen(true);
        }
    }

    const handleSubmit = (e) =>{
        e.preventDefault();
        setIsLogging(true);
        const isRemembered = checkRef.current.checked
        const val = validateInputs();

        if (val){
            const form = formRef.current
            const fdata = new FormData(form);
            let payload = {
                emailAddress: fdata.get("emailAddress"),
                password: fdata.get("password")
            }

            processLogin(payload, isRemembered);
        } else{
            setIsLogging(false)
        }
    }

    const passwordAdornment = (
        <InputAdornment position="end">
            <IconButton ariaaria-label="toggle password visibility"
              onClick={()=> setShowPassword(!showPassword)}
              onMouseDown={(event)=> event.preventDefault()}>
                  { showPassword ? 
                  <Visibility classes={{root:classes.visibilityIcon}} /> : 
                  <VisibilityOff classes={{root:classes.visibilityIcon}} />
                  }
              </IconButton>
        </InputAdornment>
    )
    

    return(
        <React.Fragment>
            <Backdrop className={classes.backdrop} open={isLogging} >
                <BoxLoading />
            </Backdrop>
    
            <Snackbar
                open={errOpen}
                anchorOrigin={{vertical: "top", horizontal: "right"}}
                onClose={handleErrClose}
            >
                <Alert severity="error" onClose={handleErrClose}>
                   An error occured while signing you in
                </Alert>
            </Snackbar>
            
            <Card classes={{root: classes.card}} >
                <CardHeader
                    title="Sign-In"
                    classes={{root: classes.cardHeader}}
                />
                <CardContent>
                    <form ref={formRef} noValidate >
                        <motion.div 
                        className={classes.field} 
                        animate={
                            shake.emailAddress
                        }
                        > 
                        <TextField
                                required
                                error={errors.emailAddress}
                                classes={{root: classes.textField}}
                                helperText={helperTexts.emailAddress}
                                id="customer-email"
                                variant="outlined"
                                label="Email"
                                fullWidth
                                margin="dense"
                                InputLabelProps={{
                                    shrink: true,
                                    classes:{root:classes.inputLabel}
                                }}
                                InputProps={{
                                    name: "emailAddress",
                                    classes:{root:classes.inputField}
                                }}
                                onChange={unhighlight}
                            /> 
                        </motion.div>
                        <motion.div className={classes.field} animate={shake.password}>
                            <TextField 
                                required
                                error={errors.password}
                                classes={{root: classes.textField}}
                                helperText={helperTexts.password}
                                id="customer-password"
                                variant="outlined"
                                label="Password"
                                fullWidth
                                margin="dense" 
                                type={showPassword ? "text" : "password"} 
                                onChange={unhighlight}
                                InputLabelProps={{
                                    shrink: true,
                                    classes:{root:classes.inputLabel}
                                }}
                                InputProps={{
                                    name: "password",
                                    endAdornment: passwordAdornment,
                                    classes:{root:classes.inputField}
                                }}
                            />
                        </motion.div>
                        <div>
                            <FormControlLabel 
                                control={
                                    <Checkbox 
                                    inputRef={checkRef}
                                    classes={{
                                        root:classes.checkbox,
                                        checked:classes.checked
                                    }} 
                                    />
                                }
                                label="Stay signed in"
                            />
                        </div>                      
                        <div>
                            <Button 
                            variant="contained"
                            type="submit"  
                            onClick={handleSubmit}
                            classes={{root:classes.submitButton}} 
                            >
                                Continue
                            </Button>
                        </div>
                    </form>
                </CardContent>
            </Card>
        </React.Fragment>
    )
}